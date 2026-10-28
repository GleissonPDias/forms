import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Input from '../ui/Input'
import Button from '../ui/Button'
import AuthDivider from './AuthDivider'
import SocialLogin from './SocialLogin'
import { createSignUpSchema } from '../../schemas/signUpSchema'

export default function SignUpForm({ onSwitch }) {
  const { t } = useTranslation()
  const schema = useMemo(() => createSignUpSchema(t), [t])

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  })
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
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    const next = { ...values, [field]: value }
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
    setTouched({ name: true, email: true, password: true, confirmPassword: true, terms: true })
    if (!validateAll()) return
    setSubmitting(true)
    console.info('Sign up validated', { name: values.name, email: values.email })
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
          {t('signUp.title')}
        </h1>
        <p className="text-sm text-text-secondary">{t('signUp.subtitle')}</p>
      </div>

      <Input
        name="name"
        type="text"
        label={t('signUp.nameLabel')}
        placeholder={t('signUp.namePlaceholder')}
        value={values.name}
        onChange={handleChange('name')}
        onBlur={handleBlur('name')}
        error={touched.name ? errors.name : ''}
        autoComplete="name"
      />

      <Input
        name="email"
        type="email"
        label={t('signUp.emailLabel')}
        placeholder={t('signUp.emailPlaceholder')}
        value={values.email}
        onChange={handleChange('email')}
        onBlur={handleBlur('email')}
        error={touched.email ? errors.email : ''}
        autoComplete="email"
      />

      <Input
        name="password"
        type="password"
        label={t('signUp.passwordLabel')}
        placeholder={t('signUp.passwordPlaceholder')}
        value={values.password}
        onChange={handleChange('password')}
        onBlur={handleBlur('password')}
        error={touched.password ? errors.password : ''}
        autoComplete="new-password"
      />

      <Input
        name="confirmPassword"
        type="password"
        label={t('signUp.confirmPasswordLabel')}
        placeholder={t('signUp.confirmPasswordPlaceholder')}
        value={values.confirmPassword}
        onChange={handleChange('confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        error={touched.confirmPassword ? errors.confirmPassword : ''}
        autoComplete="new-password"
      />

      <label className="flex items-start gap-2 text-sm text-text-secondary">
        <input
          type="checkbox"
          checked={values.terms}
          onChange={handleChange('terms')}
          onBlur={handleBlur('terms')}
          className="mt-0.5 h-4 w-4 rounded border-border bg-surface-input accent-primary"
          aria-invalid={Boolean(touched.terms && errors.terms)}
        />
        <span>
          {t('signUp.terms')}
          {touched.terms && errors.terms && (
            <span className="ml-2 text-xs text-error">{errors.terms}</span>
          )}
        </span>
      </label>

      <Button type="submit" loading={submitting}>
        {submitting ? t('signUp.submitting') : t('signUp.submit')}
      </Button>

      <AuthDivider />
      <SocialLogin onSocial={handleSocial} />

      <p className="text-center text-sm text-text-secondary">
        {t('signUp.switchPrompt')}{' '}
        <button
          type="button"
          onClick={onSwitch}
          className="font-semibold text-primary hover:underline"
        >
          {t('signUp.switchAction')}
        </button>
      </p>
    </form>
  )
}