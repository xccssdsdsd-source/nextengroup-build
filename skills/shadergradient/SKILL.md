---
name: shadergradient
description: "ShaderGradient library guide for Next.js and React. Integrates customizable, interactive 3D WebGL gradients into UI backgrounds. Covers installation, dynamic client-side loading (SSR bypass), prop customization, styling, and WebGL performance best practices."
---

# ShaderGradient — Project Skill

## Package & Setup

To use `shadergradient` in Next.js, you must install the React component package and its required peer dependencies (Three.js and React Three Fiber stack):

```bash
npm i @shadergradient/react @react-three/fiber three three-stdlib camera-controls
npm i -D @types/three
```

> [!WARNING]
> **Next.js 15 / React 19 Compatibility**
> If your project uses React 19 (default in Next.js 15), you must ensure that `@react-three/fiber` is version 9 or higher to maintain compatibility. For React 18, `@react-three/fiber` v8 is recommended.

## Next.js Integration (Bypassing SSR)

Because `ShaderGradient` and `@react-three/fiber` rely heavily on browser-specific globals (like `window`, `document`, and WebGL context), they will crash during server-side pre-rendering (SSR). 

You **must** import the component dynamically with `ssr: false` in Next.js:

```tsx
'use client'

import dynamic from 'next/dynamic'

// Dynamically import ShaderGradient with SSR disabled
const ShaderGradient = dynamic(
  () => import('@shadergradient/react').then((mod) => mod.ShaderGradient),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#05080d]" /> // matching fallback background
  }
)

export default function BackgroundGradient() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <ShaderGradient 
        control="query"
        urlString="https://www.shadergradient.co/api?animate=on&bgColor=transparent&brightness=1.2&color1=%2322D3EE&color2=%230E7490&color3=%23060A10&contrast=1.0&embedMode=off&pixelDensity=1&positionX=0&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=0&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.5&uFrequency=0&uSpeed=0.15&uStrength=2&wireframe=false"
      />
    </div>
  )
}
```

## Styling & Visual Customization

To design the gradients, use the visual playground at [shadergradient.co](https://www.shadergradient.co) and copy either:
1. **URL String** (Recommended for simplicity): Set `control="query"` and pass the generated `urlString` prop.
2. **Prop Configuration**: Set `control="props"` and pass individual props like `color1`, `color2`, `color3`, `type` (`"waterPlane"` or `"sphere"`), `uSpeed`, `uStrength`, etc.

### Recommended Color Props for Getbuild (Dark/Cyan Theme)
- `color1`: `#5EEAFF` (Cyan/Light Accent)
- `color2`: `#22D3EE` (Theme Cyan)
- `color3`: `#0A1120` (Dark background blend)
- `uSpeed`: `0.15` (Slow, organic motion)
- `brightness`: `1.0` or `1.1`
- `contrast`: `1.0`

## Performance Best Practices

1. **Layering & Pointer Events**: Always wrap the component in a parent div with `pointer-events-none` so it doesn't block clicks or drag gestures on interactive elements above it.
2. **Reduce Resolution**: If you experience framerate drops, lower the `pixelDensity` prop (e.g., set to `1` instead of default `1.25` or `1.5` on retina screens).
3. **Visibility Optimization**: Disable rendering when the section is not visible to the user:
   - Wrap the background with a component that unmounts or pauses animation when off-screen (using Framer Motion `useInView` or IntersectionObserver).
4. **CSS Overlay**: Add a subtle noise overlay or grid background on top of the shader gradient using Tailwind or custom CSS to give it texture and hide minor color-banding artifacts.
