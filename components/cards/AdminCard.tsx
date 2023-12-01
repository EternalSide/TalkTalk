"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
interface Props {
	id: string;
	name: string;
	username: string;
	imgUrl: string;
}

const AdminCard = ({ id, name, username, imgUrl }: Props) => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

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
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Button className='user-card_btn'>Опции</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='bg-primary-500 text-white border-neutral-500'>
					<DropdownMenuItem>Удалить аккаунт</DropdownMenuItem>

					<DropdownMenuItem>Удалить все посты</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</article>
	);
};
export default AdminCard;
