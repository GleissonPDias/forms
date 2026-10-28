import { useTranslation } from 'react-i18next'

export default function AuthDivider() {
  const { t } = useTranslation()
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-border" />
      <span className="text-xs font-medium tracking-wide text-text-secondary">
        {t('divider')}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  )
}