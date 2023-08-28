import * as z from 'zod';

export const threadValidation = z.object({
	thread: z.string().nonempty().min(1).max(1000),
	accountId: z.string(),
});

export const CommentValidation = z.object({
	thread: z.string().nonempty().min(1).max(1000),
});
