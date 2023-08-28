'use client';

import { addLikeToThread } from '@/lib/actions/thread.action';

import { Heart, HeartOff } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LikeCard = ({ id, userId }: { id: string; userId: string }) => {
	const router = useRouter();
	const [isLiked, setIsLiked] = useState(false);
	const handleLike = async () => {
		try {
			const likes = await addLikeToThread(id, userId);

			setIsLiked(!isLiked);
			router.refresh();
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			{isLiked ? (
				<HeartOff
					// Добавить для комментов + клиент
					onClick={() => {}}
					width={20}
					height={20}
					className='cursor-pointer object-contain text-indigo-500 mt-[2px]'
				/>
			) : (
				<Heart
					onClick={() => {}}
					width={20}
					height={20}
					className='cursor-pointer object-contain text-indigo-500 mt-[2px]'
				/>
			)}
		</>
	);
};
export default LikeCard;
