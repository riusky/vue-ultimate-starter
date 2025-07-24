import { z } from 'zod'

export const accountValidator = z.object({
  name: z
    .string({
      required_error: 'Required.',
    })
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  dob: z
    .string()
    .datetime()
    .optional()
    .refine(date => date !== undefined, 'Please select a valid date.'),
  language: z
    .string()
    .min(1, 'Please select a language.'),
})
