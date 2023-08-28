import ThreadCard from '@/components/cards/ThreadCard';
import CommentForm from '@/components/forms/Comment';
import { fetchUser } from '@/lib/actions/user.action';
import Thread from '@/lib/models/thread.model';
import User from '@/lib/models/user.model';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const postNumber = async ({ params }: { params: { postNumber: string } }) => {
	if (!params.postNumber) return null;

	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(user.id);
	if (!userInfo?.onboarded) redirect('/onboarding');
	const data = await Thread.find({}).populate({ path: 'author', model: User });
	const postNumber = Number(params.postNumber);
	const post = data[postNumber - 1];

	return (
		<section className='relative '>
			<ThreadCard
				key={post._id}
				id={post._id}
				currentUserId={user?.id || ''}
				parentId={post.parentId}
				content={post.text}
				author={post.author}
				community={post.community}
				createdAt={post.createdAt}
				comments={post.children}
			/>

			<div className='mt-7'>
				<CommentForm
					threadId={post.id}
					currentUserImg={userInfo.image}
					currentUserId={JSON.stringify(userInfo._id)}
				/>
			</div>

			<div className='mt-10'>
				{post?.children?.map((childItem: any) => (
					<ThreadCard
						key={childItem._id}
						id={childItem._id}
						currentUserId={childItem?.id || ''}
						parentId={childItem.parentId}
						content={childItem.text}
						author={childItem.author}
						community={childItem.community}
						createdAt={childItem.createdAt}
						comments={childItem.children}
						isComment
					/>
				))}
			</div>
		</section>
	);
};
export default postNumber;
