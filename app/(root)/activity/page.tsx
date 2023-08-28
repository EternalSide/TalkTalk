import { fetchUser, getActivity } from '@/lib/actions/user.action';
import { currentUser } from '@clerk/nextjs';

import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const ActivityPage = async () => {
	const user = await currentUser();

	if (!user) return null;

	const userInfo = await fetchUser(user.id);

	if (!userInfo?.onboarded) redirect('/onboarding');

	const activity = await getActivity(userInfo._id.toString());

	return (
		<section>
			<h1 className='head-text mb-10'>Ответы</h1>

			<section className='mt-10 flex flex-col gap-5'>
				{activity?.length! > 0 ? (
					<>
						{activity?.map((activity) => (
							<Link
								key={activity._id}
								href={`/thread/${activity.parentId}`}
							>
								<article className='activity-card'>
									<Image
										alt='Фото профиля'
										width={20}
										height={20}
										className='rounded-full object-cover'
										src={activity.author.image}
									/>
									<p className='!test-small-regular text-light-1'>
										<span className='mr-1 text-primary-500'>{activity.author.name}</span>
										{''}оставил вам комментарий
									</p>
								</article>
							</Link>
						))}
					</>
				) : (
					<p className='!text-base-regular text-light-3'>Уведомления отсутствуют.</p>
				)}
			</section>
		</section>
	);
};
export default ActivityPage;
