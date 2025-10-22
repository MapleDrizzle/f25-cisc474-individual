import { z } from 'zod';

// Common query helpers
export const IdParam = z.object({ id: z.string().uuid() });
export const Pagination = z.object({
  cursor: z.string().uuid().optional(), // cursor-based pagination (id or opaque cursor)
  limit: z.number().int().positive().max(250).default(20),
});
export type Pagination = z.infer<typeof Pagination>;