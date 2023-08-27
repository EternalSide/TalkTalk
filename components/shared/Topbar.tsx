import { SignedIn, SignOutButton, UserButton, useUser } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

const Topbar = async () => {
	const user = await currentUser();

	return (
		<nav className='topbar'>
			<Link
				href='/'
				className='flex items-center gap-4'
			>
				<Image
					src='/assets/logo.svg'
					alt='logo'
					width={28}
					height={28}
				/>
				<p className='text-heading3-bold text-light-1 max-xs:hidden'>TalkTalk</p>
			</Link>

			<div className='flex items-center gap-1'>
				<div className='block md:hidden'>
					<SignedIn>
						<SignOutButton>
							<div className='flex cursor-pointer'>
								<Image
									src='/assets/logout.svg'
									alt='logout'
									width={24}
									height={24}
								/>
							</div>
						</SignOutButton>
					</SignedIn>
				</div>
				<p className='text-white font-semibold text-lg mr-2 '>{user?.firstName}</p>
				<UserButton />
			</div>
		</nav>
	);
};
export default Topbar;
