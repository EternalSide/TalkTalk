'use client';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface Props {
	id: string;
	name: string;
	username: string;
	imgUrl: string;
	personType?: 'User' | 'Community';
}

const UserCard = ({ id, name, username, imgUrl, personType }: Props) => {
	const router = useRouter();
	return (
		<article className='user-card'>
			<div className='user-card_avatar'>
				<div className=' relative w-[48px] h-[48px]'>
					<Image
						alt='Фото профиля'
						src={imgUrl}
						fill
						className='rounded-full object-cover object-center'
					/>
				</div>
				<div className='text-ellipsis flex-1'>
					<h4 className='text-base-semibold text-light-1'>{name}</h4>
					<p className='text-small-medium text-gray-1'>@{username}</p>
				</div>
			</div>
			<Button
				onClick={() => {
					personType === 'Community' ? router.push(`/communities/${id}`) : router.push(`/profile/${username}`);
				}}
				className='user-card_btn'
			>
				{personType === 'Community' ? 'Перейти' : 'Профиль'}
			</Button>
		</article>
	);
};
export default UserCard;
