import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { currentUser } from '@clerk/nextjs';
const f = createUploadthing();

const getUser = async () => await currentUser();

const handleAuth = async () => {
	const user = await getUser();

	if (!user) throw new Error('Unauthorized');

	return { userId: user.id };
};

export const ourFileRouter = {
	media: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
		.middleware(handleAuth)
		.onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
