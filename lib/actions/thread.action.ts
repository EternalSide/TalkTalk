'use server';
import { connectTODB } from '../mongoose';
import Thread from '../models/thread.model';
import User from '../models/user.model';
import { revalidatePath } from 'next/cache';

interface Props {
	text: string;
	author: string;
	communityId: string | null;
	path: string;
}

export async function createThread({ text, author, communityId, path }: Props) {
	try {
		connectTODB();
		const createdThread = await Thread.create({
			text,
			author,
		});

		await User.findByIdAndUpdate(author, {
			$push: { threads: createdThread._id },
		});

		revalidatePath(path);
	} catch (e: any) {
		console.log(e.message);
		throw new Error(`Failed to create thread`);
	}
}

export async function fetchThreads(pageNumber = 1, pageSize = 20) {
	try {
		connectTODB();

		const skipAmount = (pageNumber - 1) * pageSize;

		// top level threads
		// Ключевые посты без комментариев
		const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
			.sort({ createdAt: 'desc' })
			.skip(skipAmount)
			.limit(pageSize)
			.populate({ path: 'author', model: User })
			.populate({
				path: 'children',
				populate: {
					path: 'author',
					model: User,
					select: '_id name parentId image',
				},
			});

		const totalPostsCount = await Thread.countDocuments({ parentId: { $in: [null, undefined] } });

		const posts = await postsQuery.exec();
		const isNext = totalPostsCount > skipAmount + posts.length;

		return { posts, isNext };
	} catch (e: any) {
		console.log(e.message);
		throw new Error(`Failed to fetch threads`);
	}
}

export async function fetchThreadById(id: string) {
	try {
		connectTODB();
		// Здесь мы забираем пост и все комментарии к нему + комментарии к коменнтариям

		const post = await Thread.findById(id)
			.populate({ path: 'author', model: User, select: '_id id name image' })
			.populate({
				path: 'children',
				populate: [
					{
						path: 'author',
						model: User,
						select: '_id id name parentId image',
					},
					{
						path: 'children',
						model: Thread,
						populate: {
							path: 'author',
							model: User,
							select: '_id id name parentId image',
						},
					},
				],
			})
			.exec();

		if (!post) return null;

		return post;
	} catch (e: any) {
		console.log(e.message);
		throw new Error(`Failed to fetch post`);
	}
}
export async function addCommentToThread(id: string, commentText: string, userId: string, path: string) {
	try {
		connectTODB();

		const originalThread = await Thread.findById(id);

		if (!originalThread) {
			throw new Error(`Thread not found`);
		}

		const commentThread = new Thread({
			text: commentText,
			author: userId,
			parentId: id,
		});

		const savedCommentThread = await commentThread.save();

		originalThread.children.push(savedCommentThread._id);

		await originalThread.save();

		revalidatePath(path);
	} catch (e: any) {
		console.log(e.message);
		throw new Error(`Failed to add comment`);
	}
}
