import Image from "next/image";
import Link from "next/link";
import {BadgeCheck} from "lucide-react";
import LikeCard from "./LikeCard";
import {formatDateString} from "@/lib/utils";
interface ThreadCardProps {
	id: string;
	isAdmin?: boolean;
	likes?: string[];
	currentUserId: string | null | undefined;
	parentId: string | null;
	content: string;
	author: {
		name: string;
		image: string;
		id: string;
		username: string;
	};
	community: {
		name: string;
		image: string;
		id: string;
	} | null;
	createdAt: string;

	comments: {
		author: {
			image: string;
		};
	}[];
	isComment?: boolean;
}

const ThreadCard = async ({
	id,
	currentUserId,
	parentId,
	content,
	author,
	community,
	createdAt,
	comments,
	isComment,
	isAdmin,
	likes,
}: ThreadCardProps) => {
	return (
		<article
			className={`flex w-full flex-col rounded-xl ${
				isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
			}`}
		>
			<div className='flex items-start justify-between'>
				<div className='flex w-full flex-1 flex-row gap-4'>
					<div className='flex flex-col items-center'>
						<Link
							className='relative h-11 w-11'
							href={`/profile/${author.username}`}
						>
							<Image
								src={author.image}
								alt='Author image'
								fill
								className='cursor-pointer rounded-full'
							/>
						</Link>
						<div className='thread-card_bar' />
					</div>

					<div className='flex w-full flex-col'>
						<Link
							className='w-fit'
							href={`/profile/${author.username}`}
						>
							<div className='flex items-center '>
								<h4 className='cursor-pointer text-base-semibold text-light-1'>
									{author.name}
								</h4>
								{isAdmin && (
									<BadgeCheck className='h-4 w-4 text-indigo-600 ml-[6px] ' />
								)}
							</div>
						</Link>
						<p className='text-sm-regular text-light-2 mt-2'>{content}</p>
						<div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
							<div className='flex gap-3.5'>
								<LikeCard
									id={id.toString()}
									userId={currentUserId}
								/>
								<Link href={`/thread/${id}`}>
									<Image
										src='/assets/reply.svg'
										alt='reply'
										width={24}
										height={24}
										className='cursor-pointer object-contain'
									/>
								</Link>
								<Image
									src='/assets/repost.svg'
									alt='repost'
									width={24}
									height={24}
									className='cursor-pointer object-contain'
								/>
								<Image
									src='/assets/share.svg'
									alt='share'
									width={24}
									height={24}
									className='cursor-pointer object-contain'
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Блок показывается только на главных постах */}
			{!isComment && comments.length > 0 && (
				<Link
					href={`/thread/${id}`}
					className='mt-3 ml-[10px] flex items-center gap-x-2'
				>
					<div className='relative h-[24px] w-[24px]'>
						<Image
							src={comments[comments.length - 1]?.author?.image}
							alt='share'
							fill
							className='cursor-pointer object-cover rounded-full'
						/>
					</div>

					<p className='mt-1 text-subtle-medium text-gray-1'>
						Комментариев: {comments.length}
					</p>
				</Link>
				// <div className='flex gap-x-3 items-center'>
				// 	<p className='mt-1 text-subtle-medium text-gray-1'>Поставили лайк: {likes?.length || '66'}</p>

				// </div>
			)}
			{!isComment && !community && (
				<Link
					href={`/profile/${author.username}`}
					className='mt-5 flex items-center'
				>
					<p className='text-subtle-medium text-gray-1'>
						{formatDateString(createdAt)}
					</p>
				</Link>
			)}

			{!isComment && community && (
				<Link
					href={`/communities/${community.id}`}
					className='mt-5 flex items-center'
				>
					<p className='text-subtle-medium text-gray-1'>
						{formatDateString(createdAt)} - опубликовано в сообществе:{" "}
						{community.name}
					</p>
					<Image
						alt='Фото сообщества'
						src={community.image}
						width={14}
						height={14}
						className='ml-1 rounded-full object-cover'
					/>
				</Link>
			)}
		</article>
	);
};
export default ThreadCard;
