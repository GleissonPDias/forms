export default function BackgroundEffects() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <div
        className="absolute rounded-full blur-[100px] opacity-70"
        style={{
          width: 520,
          height: 520,
          left: -120,
          top: -130,
          background: 'radial-gradient(circle, #B8A900 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute rounded-full blur-[120px] opacity-70"
        style={{
          width: 600,
          height: 600,
          right: -180,
          bottom: -200,
          background: 'radial-gradient(circle, #006BCB 0%, transparent 70%)',
        }}
      />
    </div>
  )
}