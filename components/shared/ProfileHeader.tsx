import Image from 'next/image';

interface Props {
	name: string;
	username: string;
	imgUrl: string;
	bio: string;
	type?: 'User' | 'Community';
}

const ProfileHeader = ({ name, username, imgUrl, bio }: Props) => {
	return (
		<div className='flex w-full flex-col justify-start'>
			<div className='flex items-center  justify-between'>
				<div className='flex items-center gap-3'>
					<div className='relative h-20 w-20'>
						<Image
							alt='Фото профиля'
							src={imgUrl}
							fill
							className='rounded-full object-cover object-center'
						/>
					</div>
					<div className='flex-1'>
						<h2 className='text-left text-heading3-bold text-light-1'>{name}</h2>
						<p className='text-base-medium text-gray-1'>@{username}</p>
					</div>
				</div>
			</div>
			<p className='mt-6 max-w-lg text-base-regular'>{bio}</p>
			<div className='mt-12 h-0.5 w-full bg-dark-3' />
		</div>
	);
};
export default ProfileHeader;
