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
		// top level threads
		const postsQuery = Thread.find({});
	} catch (e: any) {
		console.log(e.message);
		throw new Error(`Failed to fetch threads`);
	}
}
