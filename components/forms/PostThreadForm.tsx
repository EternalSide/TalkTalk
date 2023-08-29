'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '../ui/textarea';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { threadValidation } from '@/lib/validations/thread';
import { createThread } from '@/lib/actions/thread.action';
import Image from 'next/image';
import { useOrganization } from '@clerk/nextjs';

const PostThreadForm = ({ userId, userImg }: { userId: string; userImg: string }) => {
	const router = useRouter();
	const pathname = usePathname();
	const { organization } = useOrganization();
	const form = useForm({
		resolver: zodResolver(threadValidation),
		defaultValues: {
			thread: '',
			accountId: userId,
		},
	});

	const onSubmit = async (values: z.infer<typeof threadValidation>) => {
		await createThread({
			text: values.thread,
			author: userId,
			communityId: organization ? organization?.id : null,
			path: pathname,
		});

		router.push('/');
	};

	return (
		<Form {...form}>
			<div className='flex justify-between mt-10 gap-x-3'>
				<div className='relative h-14 w-14'>
					<Image
						alt='Фото профиля'
						src={userImg}
						fill
						className='rounded-full object-cover object-center'
					/>
				</div>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col justify-start gap-10 w-full'
				>
					<FormField
						control={form.control}
						name='thread'
						render={({ field }) => (
							<FormItem className='flex flex-col  gap-3 w-full'>
								<FormLabel className='text-base-semibold text-light-2'>Сообщение</FormLabel>
								<FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
									<Textarea
										rows={15}
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<div className='ml-auto'>
						<Button
							className='bg-primary-500 w-40 mr-3'
							type='submit'
						>
							Опубликовать
						</Button>
						<Button
							type='button'
							onClick={() => form.reset()}
							variant='outline'
						>
							Очистить
						</Button>
					</div>
				</form>
			</div>
		</Form>
	);
};
export default PostThreadForm;
