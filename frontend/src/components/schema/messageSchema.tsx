import { z } from 'zod';

export const messageSchema = z.object({
  author: z
    .enum(['Alice', 'Bob'] as const)
    .refine((value) => ['Alice', 'Bob'].includes(value), {
      message: 'Author must be either Alice or Bob',
    }),
  
  content: z
    .string()
    .min(1, 'Message content is required')
    .max(500, 'Message must be less than 500 characters'),
});

export type MessageFormData = z.infer<typeof messageSchema>;