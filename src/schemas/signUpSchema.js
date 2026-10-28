import { z } from 'zod'

export function createSignUpSchema(t) {
  const required = t('validation.required')
  const invalidEmail = t('validation.invalidEmail')
  const passwordMin = t('validation.passwordMin')
  const passwordsMismatch = t('validation.passwordsMismatch')
  const termsRequired = t('validation.termsRequired')

  return z
    .object({
      name: z.string().min(1, required),
      email: z.string().min(1, required).email(invalidEmail),
      password: z.string().min(8, passwordMin),
      confirmPassword: z.string().min(1, required),
      terms: z.boolean().refine((v) => v === true, termsRequired),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: passwordsMismatch,
      path: ['confirmPassword'],
    })
}

const fallback = (key) => {
  const map = {
    'validation.required': 'This field is required',
    'validation.invalidEmail': 'Please enter a valid email address',
    'validation.passwordMin': 'Password must be at least 8 characters',
    'validation.passwordsMismatch': 'Passwords do not match',
    'validation.termsRequired': 'You must accept the terms',
  }
  return map[key] || key
}

export const signUpSchema = createSignUpSchema(fallback)