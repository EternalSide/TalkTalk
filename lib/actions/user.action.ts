'use server';

import { connectTODB } from '@/lib/mongoose';
import User from '../models/user.model';
import { revalidatePath } from 'next/cache';
import Thread from '../models/thread.model';

interface updateUserProps {
	userId: string;
	path: string;
	username: string;
	bio: string;
	image: string;
	name: string;
}

export const updateUser = async ({ userId, path, username, bio, image, name }: updateUserProps): Promise<void> => {
	connectTODB();

	try {
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