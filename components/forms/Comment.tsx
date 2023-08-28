'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '../ui/input';
import { CommentValidation } from '@/lib/validations/thread';
import Image from 'next/image';
import { addCommentToThread } from '@/lib/actions/thread.action';
interface Props {
	threadId: string;
	currentUserImg: string;
	currentUserId: string;
}

const CommentForm = ({ threadId, currentUserImg, currentUserId }: Props) => {
	const router = useRouter();
	const pathname = usePathname();
	const form = useForm({
		resolver: zodResolver(CommentValidation),
		defaultValues: {
			thread: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
		await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname);

		form.reset();
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='comment-form'
			>
				<FormField
					control={form.control}
					name='thread'
					render={({ field }) => (
						<FormItem className='flex items-center  gap-3 w-full'>
							<FormLabel>
								<Image
									alt='Фото пользователя'
									src={currentUserImg}
									width={48}
									height={48}
									className='rounded-full object-cover'
								/>
							</FormLabel>
							<FormControl className='border-none bg-transparent'>
								<Input
									className='no-focus text-light-1 outline-none'
									placeholder='Comment...'
									type='text'
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button
					className='comment-form_btn'
					type='submit'
				>
					Отправить
				</Button>
			</form>
		</Form>
	);
};
export default CommentForm;
