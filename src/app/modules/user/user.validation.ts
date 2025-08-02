import { z } from 'zod';
const availabilitySchema = z.object({
  from: z.string().transform((str) => new Date(str)), // Convert the string to a Date object
  to: z.string().transform((str) => new Date(str)), // Convert the string to a Date object
});
const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['Student', 'Tutor']),
    bio: z.string().optional(),
    subjects: z.string().optional(),
    gradeLevel: z.string().optional(),
    availability: availabilitySchema.optional().optional(),
    price: z.number().optional(),
    ratings: z
      .array(
        z.object({
          studentId: z.string(),
          rating: z.number().min(1).max(5),
          comment: z.string().optional(),
          timestamp: z.coerce.date().optional(),
        }),
      )
      .optional(),
      phone:z.string().optional(),
      address:z.string().optional(),
    averageRating: z.number().min(0).max(5).optional(),
    isBlocked: z.boolean().default(false),
    isDeleted: z.boolean().default(false),
  }),
});
export const UserValidation = {
  createUserValidationSchema,
};
