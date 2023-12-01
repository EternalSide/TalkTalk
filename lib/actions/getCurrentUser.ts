import { currentUser } from '@clerk/nextjs';
import { fetchUser } from './user.action';
import { redirect } from 'next/navigation';

export const getCurrentUser = async () => {
	const user = await currentUser();

	if (!user) {
		return { user: null, userInfo: null };
	}

	const userInfo = await fetchUser(user.id);

	if (!userInfo?.onboarded) {
		redirect('/onboarding');
	}

	return { user, userInfo };
};
