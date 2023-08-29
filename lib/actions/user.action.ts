'use server';

import { connectTODB } from '@/lib/mongoose';
import User from '../models/user.model';
import { revalidatePath } from 'next/cache';
import Thread from '../models/thread.model';
import { FilterQuery, SortOrder } from 'mongoose';
import Community from '../models/community.model';

interface updateUserProps {
	userId: string;
	path: string;
	username: string;
	bio: string;
	image: string;
	name: string;
}

export const updateUser = async ({ userId, path, username, bio, image, name }: updateUserProps): Promise<void> => {
	try {
		connectTODB();
		await User.findOneAndUpdate(
			{
				id: userId,
			},
			{
				username: username.toLowerCase(),
				name,
				bio,
				image,
				onboarded: true,
			},
			{ upsert: true }
		);

		if (path === '/profile/edit') revalidatePath(path);
	} catch (e: any) {
		console.log(e.message);
		throw new Error(`Failed to create or update user`);
	}
};

export async function fetchUser(userId: string) {
	try {
		connectTODB();

		return await User.findOne({ id: userId });
	} catch (e) {
		console.log(e);
		throw new Error('Failed to fetch user :( ');
	}
}
export async function fetchUserByUsername(username: string) {
	try {
		connectTODB();

		return await User.findOne({ username: username });
	} catch (e) {
		console.log(e);
		throw new Error('Failed to fetch user :( ');
	}
}
export async function fetchUserPosts(userId: string) {
	try {
		connectTODB();

		const threads = await User.findOne({ id: userId }).populate({
			path: 'threads',
			options: {
				sort: {
					createdAt: 'desc',
				},
			},
			model: Thread,

			populate: {
				path: 'children',
				model: Thread,
				populate: {
					path: 'author',
					model: User,
					select: 'name image id',
				},
			},
		});

		return threads;
	} catch (e) {
		console.log(e);
		throw new Error('Failed to fetch user posts :( ');
	}
}

export async function fetchUsers({
	userId,
	searchString = '',
	pageNumber = 1,
	pageSize = 10,
	sortBy = 'desc',
}: {
	userId: string;
	searchString?: string;
	pageNumber?: number;
	pageSize?: number;
	sortBy?: SortOrder;
}) {
	try {
		connectTODB();

		const skipAmount = (pageNumber - 1) * pageSize;

		const regex = new RegExp(searchString, 'i');

		const query: FilterQuery<typeof User> = {
			id: { $ne: userId },
		};

		if (searchString.trim() !== '') {
			query.$or = [
				{
					username: { $regex: regex },
				},
				{ name: { $regex: regex } },
			];
		}

		const usersQuery = User.find(query).sort({ createdAt: sortBy }).skip(skipAmount).limit(pageSize);

		const totalUserCount = await User.countDocuments(query);

		const users = await usersQuery.exec();

		const isNext = totalUserCount > skipAmount + users.length;

		return { users, isNext };
	} catch (e) {
		console.log(e);
		throw new Error('Failed to fetch users ');
	}
}

export async function getRecomendedUsers() {
	try {
		connectTODB();

		const usersQuery = User.find().sort({ createdAt: 'desc' }).limit(3);

		const users = await usersQuery.exec();

		return users;
	} catch (e) {
		console.log(e);
		throw new Error('Failed to fetch users ');
	}
}

export async function getActivity(userId: string) {
	try {
		connectTODB();
		// Все посты пользователя
		const userThreads = await Thread.find({ author: userId });

		// Все комментарии к посту
		const childThreadIds = userThreads.reduce((acc, userThread) => {
			return acc.concat(userThread.children);
		}, []);

		// мы находим комментарии поста по айдишнику
		const replies = await Thread.find({
			_id: { $in: childThreadIds },
			author: { $ne: userId },
		}).populate({
			path: 'author',
			model: User,
			select: 'name image _id',
		});

		return replies;
	} catch (e) {
		console.log(e);
		// throw new Error('Failed to fetch activity ');
	}
}
