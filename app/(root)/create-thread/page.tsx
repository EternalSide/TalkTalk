import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';
import { fetchUser } from '@/lib/actions/user.action';
import PostThreadForm from '@/components/forms/PostThreadForm';
import { getCurrentUser } from '@/lib/actions/getCurrentUser';

const createThreadPage = async () => {
	const { userInfo } = await getCurrentUser();

	return (
		<section>
			<h1 className='head-text'>Добавить пост</h1>
			<PostThreadForm
				userImg={userInfo.image}
				userId={userInfo._id.toString()}
			/>
		</section>
	);
};
export default createThreadPage;
