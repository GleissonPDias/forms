import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import BackgroundEffects from '../components/layout/BackgroundEffects'
import AuthBadge from '../components/ui/AuthBadge'
import SignInForm from '../components/auth/SignInForm'
import SignUpForm from '../components/auth/SignUpForm'

export default function AuthPage() {
  const { t } = useTranslation()
  const [active, setActive] = useState('signin')

  const isSignIn = active === 'signin'

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <BackgroundEffects />

      <header className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 py-6 sm:px-14 sm:py-12">
        <AuthBadge />
        <button
          type="button"
          onClick={() => setActive(isSignIn ? 'signup' : 'signin')}
          className="text-sm font-semibold tracking-[0.15em] text-text-secondary transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          aria-label={isSignIn ? t('signUp.title') : t('signIn.title')}
        >
          {isSignIn ? t('nav.signUp') : t('nav.signIn')}
        </button>
      </header>

      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-24">
        <div className="w-full max-w-[480px] rounded-3xl border border-border bg-surface px-[30px] pt-[34px] pb-[30px] shadow-2xl shadow-black/40">
          {isSignIn ? (
            <SignInForm onSwitch={() => setActive('signup')} />
          ) : (
            <SignUpForm onSwitch={() => setActive('signin')} />
          )}
        </div>
      </main>
    </div>
  )
}