import { getRecomendedUsers } from '@/lib/actions/user.action';
import UserCard from '../cards/UserCard';
import { getRecomendedCommunites } from '@/lib/actions/community.actions';

const RightSidebar = async () => {
	const users = await getRecomendedUsers();
	const communites = await getRecomendedCommunites();

	return (
		<section className='custom-scrollbar rightsidebar max-w-[380px] w-full'>
			<div className='flex flex-1 flex-col justify-start'>
				<h3 className='text-heading4-medium text-light-1'>Может понравится:</h3>
				<div className='flex flex-col gap-y-6 mt-5'>
					{users.map((person) => (
						<UserCard
							key={person.id}
							id={person.id}
							name={person.name}
							username={person.username}
							imgUrl={person.image}
							personType='User'
						/>
					))}
				</div>
			</div>

			<div className='flex flex-1 flex-col justify-start'>
				<h3 className='text-heading4-medium text-light-1'>Сообщества:</h3>
				<div className='flex flex-col gap-y-6 mt-5'>
					{communites.map((person) => (
						<UserCard
							key={person.id}
							id={person.id}
							name={person.name}
							username={person.username}
							imgUrl={person.image}
							personType='Community'
						/>
					))}
				</div>
			</div>
		</section>
	);
};
export default RightSidebar;
