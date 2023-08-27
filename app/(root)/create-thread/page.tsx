import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';
import { fetchUser } from '@/lib/actions/user.action';
import PostThread from '@/components/forms/PostThread';

const createThreadPage = async () => {
	const user = await currentUser();

	if (!user) return null;

	const userInfo = await fetchUser(user.id);

	if (!userInfo?.onboarded) redirect('/onboarding');

	return (
		<>
			<h1 className='head-text'>Добавить пост</h1>
			<PostThread userId={userInfo._id} />
		</>
	);
};
export default createThreadPage;
