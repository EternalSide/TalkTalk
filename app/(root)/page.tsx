import ThreadCard from '@/components/cards/ThreadCard';
import { fetchThreads } from '@/lib/actions/thread.action';
import { currentUser } from '@clerk/nextjs';

export default async function Home() {
	const data = await fetchThreads(1, 30);
	const user = await currentUser();

	return (
		<>
			<h1 className='text-left head-text'>Главная</h1>
			<section className='mt-9 flex flex-col gap-10'>
				{data.posts.length === 0 ? (
					<p>Посты не найдены</p>
				) : (
					<>
						{data.posts.map((post) => (
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
							></ThreadCard>
						))}
					</>
				)}
			</section>
		</>
	);
}
