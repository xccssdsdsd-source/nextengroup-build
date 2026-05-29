# CLAUDE.md — Frontend Rules



## Response Style

No explanations unless asked. Code only. Action → what's next.



## Session Start

Invoke `frontend-design` skill before any frontend code.

Commit to ONE aesthetic direction before first line. Execute without compromise.



## Project Type

Set at project level: `HTML` | `NEXTJS`

- HTML: single `index.html`, Tailwind CDN, all styles inline, mobile-first

- NEXTJS: component files, Tailwind via config, CSS vars in `globals.css`



## Code Rules

- No comments, no `console.log`, no dead code, no unused classes

- No wrapper divs unless structurally needed

- Tailwind: no duplicate classes, no empty `class=""`

- JS: arrow functions, no `var`, no semicolons, single quotes



## Design Direction

Pick an extreme and commit: editorial, brutalist, luxury, organic, cinematic, retro-futuristic.

Ask: what is the ONE thing someone remembers? Build around that answer.



## Typography

- Google Fonts only. Never Inter, Roboto, Arial, system fonts.

- Pair: display/serif (headings) + humanist sans or mono (body)

- Headings: `letter-spacing:-0.03em` `line-height:1.1` `font-weight:700+`

- Body: `line-height:1.75` max `68ch`

- Key headings: `clamp()` fluid sizing

- Scale ratio: 1.25 or 1.333 — no arbitrary sizes



## Color System

CSS custom properties in `:root` using HSL. Required tokens:

`--bg` `--surface` `--primary` `--accent` `--text` `--muted`

Dominant color + one sharp accent. No default Tailwind blue/indigo.



## Depth

- Backgrounds: layered gradient or noise — never flat

- Shadows: color-tinted, minimum 2 levels, low opacity

- Cards: `1px solid hsl(var(--text)/0.08)` + inner highlight

- Images: `from-black/60` gradient overlay + optional `mix-blend-multiply`



## Spatial

- Asymmetry over centered-everything

- Hero: one element breaks the grid (oversized type, offset image, diagonal)

- Vary section rhythm: full-bleed alternates with contained

- Negative space: generous OR dense — never average



## Motion

- Only `transform` and `opacity` — never `transition-all`

- Load: stagger with `animation-delay` 0 / 120 / 240ms

- Scroll: `IntersectionObserver` → translateY 24px→0 + opacity, 600ms ease-out

- Hover: `translateY(-2px)` + shadow deepen, 180ms

- Wrap all in `@media (prefers-reduced-motion: no-preference)`



## Components

 Buttons: `0.65em 1.5em` padding, hover lifts + shadow deepens

- Inputs: CSS var borders, accent focus ring, no browser defaults

- Cards: hover state required (lift / glow / border reveal)

- Nav sticky: `backdrop-filter:blur` on scroll



## Reference Images

Match exactly — layout, spacing, colors, typography. No improvements.

Screenshot → compare → fix. Min 2 rounds until no visible diff.



## Server \& Screenshots

Serve: `node serve.mjs` port 3000. Never `file:///`.

Screenshot: `node screenshot.mjs http://localhost:3000` → `./temporary screenshots/screenshot-N.png`



## Brand Assets

Check `brand\_assets/` first. Real assets override all placeholders.



## Hard Rules

- No content not in reference

- Never `transition-all`

- Never: purple gradients on white, Space Grotesk as default, cookie-cutter layouts

