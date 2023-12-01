import {fetchUserPosts} from "@/lib/actions/user.action";
import {redirect} from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import {fetchCommunityPosts} from "@/lib/actions/community.actions";

interface Props {
	currentUserId: string | undefined | null;
	accountId: string;
	accountType: string;
}

const ThreadsTab = async ({currentUserId, accountId, accountType}: Props) => {
	// Если мы зашли в сообщество, то посты будут из сообщества.
	// Если к юзеру, то посты юзера
	let data: any;

	if (accountType === "Community") {
		data = await fetchCommunityPosts(accountId);
	} else {
		data = await fetchUserPosts(accountId);
	}

	return (
		<section className='mt-9 gap-10 flex flex-col'>
			{data.threads.map((thread: any) => {
				return (
					<ThreadCard
						key={thread._id}
						id={thread._id}
						currentUserId={currentUserId}
						parentId={thread.parentId}
						content={thread.text}
						author={
							accountType === "User"
								? {
										name: data.name,
										image: data.image,
										id: data.id,
										username: data.username,
								  }
								: {
										name: thread.author.name,
										image: thread.author.image,
										id: thread.author.id,
										username: thread.author.username,
								  }
						}
						community={thread.community}
						createdAt={thread.createdAt}
						comments={thread.children}
					/>
				);
			})}
			{data.threads.length === 0 && (
				<h2 className='font-bold text-heading4-medium text-neutral-500 text-center mt-16'>
					Посты отсутствуют.
				</h2>
			)}
		</section>
	);
};
export default ThreadsTab;
