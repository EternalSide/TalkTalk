'use client';

import { ChangeEvent, useState } from 'react';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

import { userValidation } from '@/lib/validations/user';
import { isBase64Image } from '@/lib/utils';
import { useUploadThing } from '@/lib/uploadthing';
import { updateUser } from '@/lib/actions/user.action';

interface Props {
	user: {
		id: string;
		username: string;
		name: string;
		bio?: string;
		image: string;
	};
}

const ConfirmAccountForm = ({ user }: Props) => {
	const [files, setFiles] = useState<File[]>();
	const { startUpload } = useUploadThing('media');
	const router = useRouter();
	const pathname = usePathname();
	const form = useForm({
		resolver: zodResolver(userValidation),
		defaultValues: {
			profile_photo: user?.image || '',
			name: user?.name || 'asdsadas',
			username: user?.username || 'dasdada',
			bio: user?.bio || '',
		},
	});

	const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
		e.preventDefault();

		const fileReader = new FileReader();

		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];

			if (!file.type.includes('image')) {
				return;
			}

			fileReader.readAsDataURL(file);

			// Обработчик для события load (en-US).
			// Это событие срабатывает при каждом успешном завершении операции чтения.
			fileReader.onload = async (event) => {
				const imageDataUrl = event.target?.result?.toString() || '';
				return fieldChange(imageDataUrl);
			};
		}
	};

	const onSubmit = async (values: z.infer<typeof userValidation>) => {
		const image = values.profile_photo;

		const hasImageChanged = isBase64Image(image);
		if (hasImageChanged) {
			const imgRes = await startUpload(files!);

			if (imgRes && imgRes[0].url) {
				values.profile_photo = imgRes[0].url;
			}
		}

		await updateUser({
			userId: user.id,
			username: values.username,
			name: values.name,
			bio: values.bio,
			image: values.profile_photo,
			path: pathname,
		});

		if (pathname === '/profile/edit') {
			router.back();
		} else {
			router.push('/');
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col justify-start gap-10'
			>
				{/* Поле формы */}
				<FormField
					control={form.control}
					name='profile_photo'
					render={({ field }) => (
						<FormItem className='flex items-center gap-4'>
							<FormLabel className='relative account-form_image-label'>
								{field.value ? (
									<Image
										src={field.value}
										alt='profile photo'
										fill
										priority
										className='rounded-full object-cover'
									/>
								) : (
									<Image
										src='/assets/profile.svg'
										alt='logo'
										width={24}
										height={24}
										className='object-cover'
									/>
								)}
							</FormLabel>
							<FormControl className='flex-1 text-base-semibold text-gray-200'>
								<Input
									type='file'
									accept='image/*'
									placeholder='Загрузите изображение'
									className='account-form_image-input'
									onChange={(e) => handleImage(e, field.onChange)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Имя */}
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem className='flex flex-col  gap-3 w-full'>
							<FormLabel className='text-base-semibold text-light-2'>Имя</FormLabel>
							<FormControl>
								<Input
									type='text'
									className='account-form_input no-focus'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Username */}
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem className='flex flex-col  gap-3 w-full'>
							<FormLabel className='text-base-semibold text-light-2'>Юзернейм</FormLabel>
							<FormControl>
								<Input
									type='text'
									className='account-form_input no-focus'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='bio'
					render={({ field }) => (
						<FormItem className='flex flex-col  gap-3 w-full'>
							<FormLabel className='text-base-semibold text-light-2'>О себе</FormLabel>
							<FormControl>
								<Textarea
									rows={5}
									className='account-form_input no-focus'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					className='bg-primary-500 text-white'
				>
					Сохранить
				</Button>
			</form>
		</Form>
	);
};
export default ConfirmAccountForm;
