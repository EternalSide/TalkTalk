import CommunityCard from '@/components/cards/CommunityCard';
import UserCard from '@/components/cards/UserCard';
import { fetchCommunities } from '@/lib/actions/community.actions';
import { getCurrentUser } from '@/lib/actions/getCurrentUser';
import { fetchUser, fetchUsers } from '@/lib/actions/user.action';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const SearchPage = async () => {
	await getCurrentUser();

	const results = await fetchCommunities({
		searchString: '',
		pageNumber: 1,
		pageSize: 25,
	});

	return (
		<section>
			<h1 className='head-text mb-10'>Сообщества</h1>
			<div className='mt-14 flex flex-wrap justify-center  gap-3 max-lg:flex-col max-lg:items-center'>
				{results.communities.length === 0 ? (
					<p className='no-result'>Пользователи не найдены</p>
				) : (
					<>
						{results.communities.map((community) => (
							<CommunityCard
								key={community.id}
								id={community.id}
								name={community.name}
								username={community.username}
								imgUrl={community.image}
								bio={community.bio}
								members={community.members}
							/>
						))}
					</>
				)}
			</div>
		</section>
	);
};
export default SearchPage;
