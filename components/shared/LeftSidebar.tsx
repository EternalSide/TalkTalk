"use client";
import {sidebarLinks} from "@/constants";
import {SignOutButton, SignedIn} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";

const LeftSidebar = ({username}: {username: string}) => {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<section className='custom-scrollbar leftsidebar'>
			<div className='flex w-full flex-1 flex-col gap-6 pl-6 '>
				{sidebarLinks.map((link) => {
					const isActive = pathname === link.route;
					if (link.route === "/profile") {
						if (username) {
							link.route = `${link.route}/${username}`;
						} else {
							link.route = `/sign-in`;
						}
					}
					return (
						<Link
							key={link.label}
							href={link.route}
							className={`group leftsidebar_link rounded-2xl ${
								isActive && "bg-purple-600"
							} ${!isActive && "hover:bg-purple-600 transition"}`}
						>
							<Image
								src={link.imgURL}
								alt={link.label}
								width={24}
								height={24}
								className={`${!isActive && "group-hover:text-primary-500"}`}
							/>
							<p className={`text-light-1 max-lg:hidden `}>{link.label}</p>
						</Link>
					);
				})}
			</div>
			<div className='mt-10 px-6'>
				<SignedIn>
					<SignOutButton signOutCallback={() => router.push("/sign-in")}>
						<div className='flex cursor-pointer gap-4 p-4 hover:bg-purple-600 transition'>
							<Image
								src='/assets/logout.svg'
								alt='logout'
								width={24}
								height={24}
							/>

							<p className='text-light-2 max-lg:hidden'>Выйти</p>
						</div>
					</SignOutButton>
				</SignedIn>
			</div>
		</section>
	);
};
export default LeftSidebar;
