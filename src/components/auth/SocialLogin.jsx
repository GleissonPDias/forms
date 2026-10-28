import { useTranslation } from 'react-i18next'
import SocialButton from '../ui/SocialButton'

const providers = ['google', 'github', 'facebook']

export default function SocialLogin({ onSocial }) {
  const { t } = useTranslation()
  return (
    <div className="flex items-center justify-center gap-[14px]">
      {providers.map((provider) => (
        <SocialButton
          key={provider}
          provider={provider}
          ariaLabel={t(`social.${provider}`)}
          onClick={() => onSocial?.(provider)}
        />
      ))}
    </div>
  )
}