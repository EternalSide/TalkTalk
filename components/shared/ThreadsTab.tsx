import { fetchUserPosts } from '@/lib/actions/user.action';
import { redirect } from 'next/navigation';
import ThreadCard from '../cards/ThreadCard';

interface Props {
	currentUserId: string;
	accountId: string;
	accountType: string;
}

const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
	// fetch profile threads
	const data = await fetchUserPosts(accountId);

	if (!data) redirect('/');

	return (
		<section className='mt-9 gap-10 flex flex-col'>
			{data.threads.map((thread: any) => (
				<ThreadCard
					key={thread._id}
					id={thread._id}
					currentUserId={currentUserId}
					parentId={thread.parentId}
					content={thread.text}
					author={
						accountType === 'User'
							? { name: data.name, image: data.image, id: data.id, username: data.username }
							: { name: thread.author.name, image: thread.author.image, id: thread.author.id, username: data.username }
					}
					community={thread.community}
					createdAt={thread.createdAt}
					comments={thread.children}
				/>
			))}
		</section>
	);
};
export default ThreadsTab;
