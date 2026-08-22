// One five-star row, drawn once and shared by the hero's social proof and the
// review cards, so the two can never drift apart. It is a picture of a rating
// the site states elsewhere in words, so it carries a label for screen readers
// and nothing else — no half stars, because there is no half rating to draw.
export default function Stars({ className, label, size = 14 }: { className?: string; label: string; size?: number }) {
  return (
    <span className={className ? `stars ${className}` : 'stars'} role="img" aria-label={label}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M10 1.5l2.47 5.19 5.53.78-4 4.03.95 5.7L10 14.5l-4.95 2.7.95-5.7-4-4.03 5.53-.78z" />
        </svg>
      ))}
    </span>
  )
}
