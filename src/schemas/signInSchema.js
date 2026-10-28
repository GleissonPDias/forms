import { z } from 'zod'

export function createSignInSchema(t) {
  const required = t('validation.required')
  const invalidEmail = t('validation.invalidEmail')
  const passwordMin = t('validation.passwordMin')

  return z.object({
    email: z.string().min(1, required).email(invalidEmail),
    password: z.string().min(8, passwordMin),
  })
}

export const signInSchema = createSignInSchema((key) => {
  // fallback when no t provided
  const map = {
    'validation.required': 'This field is required',
    'validation.invalidEmail': 'Please enter a valid email address',
    'validation.passwordMin': 'Password must be at least 8 characters',
  }
  return map[key] || key
})