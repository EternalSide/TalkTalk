import UserCard from "@/components/cards/UserCard";
import {getCurrentUser} from "@/lib/actions/getCurrentUser";
import {fetchUsers} from "@/lib/actions/user.action";

const SearchPage = async () => {
	const {user} = await getCurrentUser();

	const results = await fetchUsers({
		userId: user?.id!,
		searchString: "",
		pageNumber: 1,
		pageSize: 25,
	});

	return (
		<section>
			<h1 className='head-text mb-10'>Поиск</h1>
			<div className='mt-14 flex flex-col gap-9'>
				{results.users.length === 0 ? (
					<p className='no-result'>Пользователи не найдены</p>
				) : (
					<>
						{results.users.map((person) => (
							<UserCard
								key={person.id}
								id={person.id}
								name={person.name}
								username={person.username}
								imgUrl={person.image}
								personType='User'
							/>
						))}
					</>
				)}
			</div>
		</section>
	);
};
export default SearchPage;
