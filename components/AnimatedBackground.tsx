export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(37,99,235,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 90% 90%, rgba(37,99,235,0.05) 0%, transparent 60%),
            #FFFFFF
          `,
        }}
      />

      <div
        className="absolute w-[600px] h-[600px] blur-[120px] opacity-[0.08]"
        style={{
          top: '-100px',
          left: '50px',
          background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)',
          animation: 'orb1 20s ease-in-out infinite alternate',
        }}
      />

      <div
        className="absolute w-[600px] h-[600px] blur-[120px] opacity-[0.06]"
        style={{
          bottom: '-150px',
          right: '100px',
          background: 'radial-gradient(circle, #1d4ed8 0%, transparent 70%)',
          animation: 'orb2 25s ease-in-out infinite alternate',
        }}
      />

      <div
        className="absolute w-[600px] h-[600px] blur-[120px] opacity-[0.07]"
        style={{
          top: '50%',
          right: '10%',
          background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
          animation: 'orb3 30s ease-in-out infinite alternate',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.4,
        }}
      />

      <style>{`
        @keyframes orb1 {
          0% { transform: translate(0, 0) }
          100% { transform: translate(80px, -60px) }
        }
        @keyframes orb2 {
          0% { transform: translate(0, 0) }
          100% { transform: translate(-100px, 80px) }
        }
        @keyframes orb3 {
          0% { transform: translate(0, 0) }
          100% { transform: translate(120px, -100px) }
        }
      `}</style>
    </div>
  )
}
