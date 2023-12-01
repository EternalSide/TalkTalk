"use client";
import {Heart, HeartOff} from "lucide-react";
import {useState} from "react";

const LikeCard = ({
	id,
	userId,
}: {
	id: string;
	userId: string | undefined | null;
}) => {
	const [isLiked, setIsLiked] = useState(false);

	return (
		<>
			{isLiked ? (
				<HeartOff
					// Добавить для комментов + клиент
					onClick={() => {}}
					width={20}
					height={20}
					className='cursor-pointer object-contain mt-[2px]'
				/>
			) : (
				<Heart
					onClick={() => {}}
					width={20}
					height={20}
					className='cursor-pointer object-contain text-neutral-600 mt-[2px]'
				/>
			)}
		</>
	);
};
export default LikeCard;
