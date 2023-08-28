import ConfirmAccountForm from '@/components/forms/AccountProfile';
import { fetchUser } from '@/lib/actions/user.action';
import { currentUser } from '@clerk/nextjs';

async function Page() {
	const user = await currentUser();

	if (!user) return null;

	const userInfo = await fetchUser(user.id);

	const userData = {
		id: user?.id,
		username: userInfo.username || '',
		name: userInfo.name || user.firstName!,
		bio: userInfo.bio || '',
		image: userInfo.image || user.imageUrl,
	};

	return (
		<main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
			<h1 className='head-text'>Подтверждение аккаунта</h1>
			<p className='mt-3 text-base-regular text-light-2'>
				Подтвердите ваш аккаунт, чтобы продолжить, или измените данные для регистрация аккаунта.
			</p>

			<section className='mt-9 bg-dark-2 p-10'>
				<ConfirmAccountForm user={userData} />
			</section>
		</main>
	);
}

export default Page;
