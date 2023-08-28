import ThreadCard from '@/components/cards/ThreadCard';
import CommentForm from '@/components/forms/CommentForm';

import { fetchThreadById } from '@/lib/actions/thread.action';
import { fetchUser } from '@/lib/actions/user.action';

import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const ThreadPage = async ({ params }: { params: { id: string } }) => {
	if (!params.id) return null;

	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(user.id);
	if (!userInfo?.onboarded) redirect('/onboarding');

	const thread = await fetchThreadById(params.id);
	console.log(thread.author);
	return (
		<section className='relative'>
			<ThreadCard
				key={thread._id}
				id={thread._id}
				currentUserId={user?.id || ''}
				parentId={thread.parentId}
				content={thread.text}
				author={thread.author}
				community={thread.community}
				createdAt={thread.createdAt}
				comments={thread.children}
			/>

			<div className='mt-7'>
				<CommentForm
					threadId={thread.id}
					currentUserImg={userInfo.image}
					currentUserId={userInfo._id.toString()}
				/>
			</div>

			<div className='mt-10'>
				{thread.children.map((comment: any) => (
					<ThreadCard
						key={comment._id}
						id={comment._id}
						currentUserId={comment?.id || ''}
						parentId={comment.parentId}
						content={comment.text}
						author={comment.author}
						community={comment.community}
						createdAt={comment.createdAt}
						comments={comment.children}
						isComment={true}
					/>
				))}
			</div>
		</section>
	);
};
export default ThreadPage;
