import { useTranslation } from 'react-i18next'

export default function AuthBadge() {
  const { t } = useTranslation()
  return (
    <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-primary">
      {t('authBadge')}
    </span>
  )
}