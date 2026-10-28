import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Input from '../ui/Input'
import Button from '../ui/Button'
import AuthDivider from './AuthDivider'
import SocialLogin from './SocialLogin'
import { createSignInSchema } from '../../schemas/signInSchema'

export default function SignInForm({ onSwitch }) {
  const { t } = useTranslation()
  const schema = useMemo(() => createSignInSchema(t), [t])

  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const validateField = (field, nextValues = values) => {
    const result = schema.safeParse(nextValues)
    if (result.success) return ''
    const issue = result.error.issues.find((i) => i.path[0] === field)
    return issue ? issue.message : ''
  }

  const validateAll = () => {
    const result = schema.safeParse(values)
    if (result.success) {
      setErrors({})
      return true
    }
    const nextErrors = {}
    for (const issue of result.error.issues) {
      const field = issue.path[0]
      if (!nextErrors[field]) nextErrors[field] = issue.message
    }
    setErrors(nextErrors)
    return false
  }

  const handleChange = (field) => (e) => {
    const next = { ...values, [field]: e.target.value }
    setValues(next)
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, next) }))
    }
  }

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors((prev) => ({ ...prev, [field]: validateField(field) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ email: true, password: true })
    if (!validateAll()) return
    setSubmitting(true)
    // Never log passwords; only non-sensitive confirmation data.
    console.info('Sign in validated', { email: values.email })
    await new Promise((resolve) => setTimeout(resolve, 600))
    setSubmitting(false)
  }

  const handleSocial = (provider) => {
    console.info('Social login (demo)', { provider })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[18px]">
      <div className="flex flex-col gap-1">
        <h1 className="text-[30px] font-bold leading-tight text-primary">
          {t('signIn.title')}
        </h1>
        <p className="text-sm text-text-secondary">{t('signIn.subtitle')}</p>
      </div>

      <Input
        name="email"
        type="email"
        label={t('signIn.emailLabel')}
        placeholder={t('signIn.emailPlaceholder')}
        value={values.email}
        onChange={handleChange('email')}
        onBlur={handleBlur('email')}
        error={touched.email ? errors.email : ''}
        autoComplete="email"
      />

      <Input
        name="password"
        type="password"
        label={t('signIn.passwordLabel')}
        placeholder={t('signIn.passwordPlaceholder')}
        value={values.password}
        onChange={handleChange('password')}
        onBlur={handleBlur('password')}
        error={touched.password ? errors.password : ''}
        autoComplete="current-password"
      />

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-text-secondary">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-border bg-surface-input accent-primary"
          />
          {t('signIn.rememberMe')}
        </label>
        <button
          type="button"
          className="font-medium text-primary hover:underline"
        >
          {t('signIn.forgotPassword')}
        </button>
      </div>

      <Button type="submit" loading={submitting}>
        {submitting ? t('signIn.submitting') : t('signIn.submit')}
      </Button>

      <AuthDivider />
      <SocialLogin onSocial={handleSocial} />

      <p className="text-center text-sm text-text-secondary">
        {t('signIn.switchPrompt')}{' '}
        <button
          type="button"
          onClick={onSwitch}
          className="font-semibold text-primary hover:underline"
        >
          {t('signIn.switchAction')}
        </button>
      </p>
    </form>
  )
}