// Zod definition of courses DTO
import { z } from 'zod';
import { Pagination } from './queries';

// Reference DTOs (lightweight relation embeds)
export const CourseRef = z.object({
  id: z.string().cuid(),
  code: z.string(),
  title: z.string(),
});
export type CourseRef = z.infer<typeof CourseRef>;

// Output DTOs (API responses)
export const CourseOut = z.object({
  id: z.string().cuid(),
  code: z.string(),
  title: z.string(),
  description: z.string().nullable().optional(),
});
export type CourseOut = z.infer<typeof CourseOut>;

// Creation DTOs (API request bodies)
export const CourseCreateIn = z.object({
  code: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional().nullable(),
});
export type CourseCreateIn = z.infer<typeof CourseCreateIn>;

// Update DTOs (API request bodies)
export const CourseUpdateIn = z.object({
  code: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  description: z.string().optional().nullable(),
});
export type CourseUpdateIn = z.infer<typeof CourseUpdateIn>;

// Query DTOs (API query parameters) DOUBLE CHECK IF THIS IS NEEDED
export const CoursesListFilter = Pagination.extend({
  ownerId: z.string().uuid().optional(),
  nameLike: z.string().optional(),
});