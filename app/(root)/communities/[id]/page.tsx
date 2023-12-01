import {currentUser} from "@clerk/nextjs";
import Image from "next/image";
import {communityTabs} from "@/constants";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {fetchCommunityDetails} from "@/lib/actions/community.actions";
import UserCard from "@/components/cards/UserCard";

const ProfilePage = async ({params}: {params: {id: string}}) => {
	const user = await currentUser();

	const communityDetails = await fetchCommunityDetails(params.id);

	return (
		<section>
			<ProfileHeader
				name={communityDetails.name}
				username={communityDetails.username}
				imgUrl={communityDetails.image}
				bio={communityDetails.bio}
				type='Community'
			/>

			<div className='mt-9'>
				<Tabs
					defaultValue='talk'
					className='w-full'
				>
					<TabsList className='tab'>
						{communityTabs.map((tab) => (
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
								{tab.value === "talk" && (
									<p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
										{communityDetails?.threads?.length}
									</p>
								)}
								{tab.value === "members" && (
									<p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
										{communityDetails?.members?.length}
									</p>
								)}
							</TabsTrigger>
						))}
					</TabsList>
					<TabsContent
						value='talk'
						className='w-full text-light-1'
					>
						<ThreadsTab
							currentUserId={user?.id}
							accountId={communityDetails._id}
							accountType='Community'
						/>
					</TabsContent>
					<TabsContent
						value='members'
						className='w-full text-light-1'
					>
						<section className='mt-9 flex flex-col gap-10'>
							{communityDetails?.members.map((member: any) => (
								<UserCard
									key={member.id}
									id={member.id}
									name={member.name}
									username={member.username}
									imgUrl={member.image}
									personType='User'
								/>
							))}
						</section>
					</TabsContent>
					<TabsContent
						value='request'
						className='w-full text-light-1'
					>
						<ThreadsTab
							currentUserId={user?.id}
							accountId={communityDetails._id}
							accountType='Community'
						/>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
};
export default ProfilePage;
