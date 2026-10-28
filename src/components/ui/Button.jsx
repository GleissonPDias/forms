export default function Button({
  children,
  type = 'button',
  onClick,
  loading = false,
  disabled = false,
  className = '',
}) {
  const isDisabled = disabled || loading
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading}
      className={[
        'flex h-14 w-full items-center justify-center rounded-xl px-4 text-sm font-semibold transition-all',
        'bg-primary text-text-on-primary',
        'hover:brightness-95 active:scale-[0.99]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60',
        'disabled:cursor-not-allowed disabled:opacity-60',
        className,
      ].join(' ')}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-text-on-primary/30 border-t-text-on-primary" />
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  )
}