import fs from 'fs'
import path from 'path'

// The hero shader is a `dynamic(..., { ssr: false })` import, so Next emits no
// preload links for it and the browser only discovers its chunks once React has
// hydrated — roughly a second of dead time on a cold load. The chunk names are
// hashed, so we read them out of webpack's loadable manifest at prerender time
// and preload them by hand. Best-effort: no manifest, no preload.
export const shaderChunks = (): string[] => {
  try {
    const manifest = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), '.next', 'react-loadable-manifest.json'), 'utf8'),
    ) as Record<string, { files?: string[] }>
    const entry = Object.entries(manifest).find(([key]) => key.includes('HeroGradientCanvas'))
    return entry?.[1]?.files?.map((file) => `/_next/${file}`) ?? []
  } catch {
    return []
  }
}
