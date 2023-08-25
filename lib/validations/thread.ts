import * as z from 'zod';

export const threadValidation = z.object({
	thread: z.string().nonempty().min(3).max(30),
	accountId: z.string(),
});

export const CommentValidation = z.object({
	thread: z.string().nonempty().min(3).max(1110),
});
