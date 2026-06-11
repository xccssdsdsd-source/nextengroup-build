---
name: framer-motion
description: "Framer Motion / motion library guide for React animations, AnimatePresence page transitions, scroll reveal with useInView, spring animations, and Next.js App Router integration. Covers declarative component animations, exit animations, layout animations, and performance best practices."
---

# Framer Motion (motion) — Project Skill

## Package & Setup

This project uses `framer-motion` with `LazyMotion` + `domAnimation` via `MotionProvider`.
Always use `m` components (not `motion`) for tree-shaking.

```tsx
import { m, AnimatePresence, useInView } from 'framer-motion'
```

## When to Use motion vs GSAP

| motion (framer-motion)               | GSAP + Lenis                          |
|---------------------------------------|---------------------------------------|
| Declarative React component animations | Complex multi-element timelines       |
| Enter/exit/layout transitions         | Scroll-linked parallax sequences      |
| Hover, tap, drag interactions         | SVG morphing, path drawing            |
| Spring physics on UI elements         | Pinned scroll sections                |
| AnimatePresence for mounting/unmounting| Coordinated scroll + WebGL sync       |

**Rule: Never animate the same element with both libraries.**

## Core Patterns

### 1. Variants (define outside JSX)

```tsx
const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 24 }
  }
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

// Usage
<m.ul variants={staggerContainer} initial="hidden" animate="visible">
  <m.li variants={cardVariants}>...</m.li>
</m.ul>
```

### 2. AnimatePresence — Exit Animations & Conditional Rendering

```tsx
<AnimatePresence mode="wait" initial={false}>
  {isOpen && (
    <m.div
      key="panel"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  )}
</AnimatePresence>
```

For App Router page transitions, wrap `{children}` in layout.tsx:
```tsx
<AnimatePresence mode="wait">
  <m.div key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    {children}
  </m.div>
</AnimatePresence>
```

### 3. Scroll Reveal with useInView

```tsx
const ref = useRef(null)
const inView = useInView(ref, { once: true, margin: '-80px' })

<m.div
  ref={ref}
  initial="hidden"
  animate={inView ? 'visible' : 'hidden'}
  variants={cardVariants}
/>
```

Prefer `useInView` over raw IntersectionObserver for React integration.

### 4. Spring Physics Presets

```tsx
// Premium feel — smooth but responsive
const premiumSpring = { type: 'spring', stiffness: 120, damping: 24 }

// Snappy UI feedback
const snappySpring = { type: 'spring', stiffness: 200, damping: 28 }

// Gentle entrance
const gentleSpring = { type: 'spring', stiffness: 100, damping: 20 }

// Bouncy (use sparingly)
const bouncySpring = { type: 'spring', stiffness: 180, damping: 14 }
```

Guidelines:
- **stiffness 100–200**: lower = softer, higher = snappier
- **damping 20–30**: lower = more bounce, higher = more controlled
- Use springs for interactive elements (hover, tap, drag)
- Use easing curves for scroll-triggered reveals: `ease: [0.22, 1, 0.36, 1]`

### 5. Layout Animations

```tsx
<m.div layout layoutId="card-highlight" transition={premiumSpring}>
  {content}
</m.div>
```

- `layout` — animates size/position changes automatically
- `layoutId` — shared layout animations between components
- Use `layout="position"` to only animate position (not size)

### 6. Hover & Tap

```tsx
<m.div
  whileHover={{ y: -4, scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={snappySpring}
/>
```

### 7. whileInView (alternative to useInView)

```tsx
<m.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-80px' }}
  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
/>
```

Simpler than useInView for one-off reveals without conditional logic.

## Performance Rules

1. **Only animate transform & opacity** — never animate `width`, `height`, `top`, `left`, `margin`, `padding`
2. **Use `willChange: 'transform'`** on frequently animated elements
3. **Respect prefers-reduced-motion:**
   ```tsx
   const prefersReduced = useReducedMotion()
   const variants = prefersReduced
     ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
     : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }
   ```
4. **Use `once: true`** on useInView / viewport to avoid re-triggering
5. **height: 'auto'** in AnimatePresence is fine — framer-motion handles it with FLIP
6. **Avoid animating 20+ elements simultaneously** — use staggerChildren instead
7. **LazyMotion + domAnimation** is already configured — never import full `motion`

## Project Conventions

- Easing: `[0.22, 1, 0.36, 1]` for entrance animations
- Stagger: `0.08–0.14s` between siblings
- Entrance distance: `y: 20–30` for cards, `y: 16–20` for smaller elements
- Always `once: true` for scroll reveals
- Cards: combine opacity + y + subtle scale (0.96–0.98)
- Use `m.div`, `m.article`, `m.li` — never bare `motion.div`
