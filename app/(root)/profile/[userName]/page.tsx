import {redirect} from "next/navigation";
import {currentUser} from "@clerk/nextjs";
import {fetchUserByUsername} from "@/lib/actions/user.action";

import ProfileHeader from "@/components/shared/ProfileHeader";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {profileTabs} from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";

const ProfilePage = async ({params}: {params: {userName: string}}) => {
	const user = await currentUser();

	const userInfo = await fetchUserByUsername(params.userName);

	if (!userInfo) {
		return (
			<section>
				<h2 className='head-text'>Пользователь не найден.</h2>
			</section>
		);
	}
	if (!userInfo?.onboarded) redirect("/onboarding");

	return (
		<section>
			<ProfileHeader
				name={userInfo.name}
				username={userInfo.username}
				imgUrl={userInfo.image}
				bio={userInfo.bio}
			/>
			<div className='mt-9'>
				<Tabs
					defaultValue='Threads'
					className='w-full'
				>
					<TabsList className='tab'>
						{profileTabs.map((tab) => (
							<TabsTrigger
								className='tab'
								key={tab.label}
								value={tab.value}
							>
								<Image
									src={tab.icon}
									alt={tab.label}
									width={24}
									height={24}
									className='object-contain'
								/>
								<p className='max-sm:hidden'>{tab.label}</p>
								{tab.value === "Threads" && (
									<p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
										{userInfo?.threads?.length}
									</p>
								)}
							</TabsTrigger>
						))}
					</TabsList>
					{profileTabs.map((tab) => (
						<TabsContent
							key={`content-${tab.label}`}
							value={tab.value}
							className='w-full text-light-1'
						>
							<ThreadsTab
								currentUserId={user?.id}
								accountId={userInfo.id}
								accountType='User'
							/>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</section>
	);
};
export default ProfilePage;
