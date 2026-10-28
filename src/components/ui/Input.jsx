import { useId } from 'react'

export default function Input({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  autoComplete,
  disabled = false,
}) {
  const generatedId = useId()
  const inputId = id || name || generatedId
  const errorId = `${inputId}-error`

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-[13px] font-medium text-text-primary"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={[
          'h-14 w-full rounded-xl border px-4 text-sm text-text-primary placeholder:text-text-secondary/70 transition-colors',
          'bg-surface-input',
          error ? 'border-error focus:border-error' : 'border-border focus:border-primary',
          'focus:ring-2 focus:ring-primary/40',
          disabled ? 'opacity-60 cursor-not-allowed' : '',
        ].join(' ')}
      />
      <span
        id={errorId}
        role="alert"
        aria-live="polite"
        className="min-h-[18px] text-xs text-error"
      >
        {error || ''}
      </span>
    </div>
  )
}