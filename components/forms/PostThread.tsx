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

interface Props {
	user: {
		id: string;
		username: string;
		name: string;
		bio?: string;
		image: string;
	};
	btnTitle: string;
}

const PostThread = ({ userId }: { userId: string }) => {
	const router = useRouter();
	const pathname = usePathname();
	const form = useForm({
		resolver: zodResolver(threadValidation),
		defaultValues: {
			thread: '',
			accountId: userId,
		},
	});

	const onSubmit = async (values: z.infer<typeof threadValidation>) => {
		await createThread({ text: values.thread, author: userId, communityId: 'asd', path: pathname });

		router.push('/');
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mt-10 flex flex-col justify-start gap-10'
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
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					className='bg-primary-500'
					type='submit'
				>
					Отправить Thread
				</Button>
			</form>
		</Form>
	);
};
export default PostThread;
