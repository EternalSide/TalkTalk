import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';
import { fetchUser } from '@/lib/actions/user.action';
import PostThreadForm from '@/components/forms/PostThreadForm';

const createThreadPage = async () => {
	const user = await currentUser();

	if (!user) return null;

	const userInfo = await fetchUser(user.id);

	if (!userInfo?.onboarded) redirect('/onboarding');

	return (
		<>
			<h1 className='head-text'>Добавить пост</h1>
			<PostThreadForm
				userImg={userInfo.image}
				userId={userInfo._id.toString()}
			/>
		</>
	);
};
export default createThreadPage;
