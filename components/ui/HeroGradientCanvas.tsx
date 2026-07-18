'use client'

import { useEffect, useRef } from 'react'

const vertexShader = `
  attribute vec2 aPosition;
  varying vec2 vUv;

  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uTime;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
      mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.52;
    mat2 rotation = mat2(0.82, -0.57, 0.57, 0.82);

    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p = rotation * p * 2.03 + vec2(17.1, 9.2);
      amplitude *= 0.5;
    }

    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv - 0.5;
    p.x *= uResolution.x / max(uResolution.y, 1.0);
    p *= 1.22;

    vec2 pointer = uPointer - 0.5;
    pointer.x *= uResolution.x / max(uResolution.y, 1.0);
    pointer *= 1.22;
    vec2 awayFromPointer = p - pointer;
    float pointerField = exp(-4.6 * length(awayFromPointer));
    vec2 localDistortion = normalize(awayFromPointer + vec2(0.0001)) * pointerField * 0.115;
    vec2 flowPosition = p + localDistortion;

    float time = uTime * 0.055;
    vec2 drift = vec2(time * 0.38, -time * 0.24);
    vec2 warp = vec2(
      fbm(flowPosition * 1.08 + drift),
      fbm(flowPosition * 1.16 - drift * 0.72 + vec2(4.7, 1.9))
    );

    float body = fbm(flowPosition * 1.42 + warp * 1.64 + vec2(time * 0.16, -time * 0.12));
    float detail = fbm(flowPosition * 2.35 - warp * 0.72 - vec2(time * 0.22, time * 0.08));
    float current = 0.5 + 0.5 * sin((flowPosition.x * 0.62 - flowPosition.y * 0.9 + body * 1.75) * 5.2 - time * 1.15);

    vec3 abyss = vec3(0.001, 0.008, 0.035);
    vec3 navy = vec3(0.018, 0.105, 0.42);
    vec3 cobalt = vec3(0.05, 0.29, 0.8);
    vec3 electric = vec3(0.15, 0.58, 0.9);

    float shape = smoothstep(0.08, 0.8, body * 0.78 + current * 0.27);
    float crest = smoothstep(0.46, 0.86, detail * 0.68 + current * 0.38);
    float glint = pow(smoothstep(0.58, 0.96, body * 0.6 + detail * 0.42), 2.2);

    vec3 color = mix(abyss, navy, shape);
    color = mix(color, cobalt, crest * 0.74);
    color = mix(color, electric, glint * 0.44);

    float bloom = exp(-5.2 * length(p - vec2(0.45, -0.02)));
    float rightGlow = exp(-2.1 * length(p - vec2(0.58, 0.2)));
    float pointerLight = exp(-8.0 * length(awayFromPointer));
    color += electric * bloom * 0.22;
    color += cobalt * rightGlow * 0.1;
    color += electric * pointerLight * 0.045;

    float vignette = 1.0 - smoothstep(0.38, 1.18, length(p * vec2(0.82, 1.0)));
    color *= 0.62 + vignette * 0.76;

    float grain = hash21(gl_FragCoord.xy + floor(uTime * 12.0)) - 0.5;
    float fineGrain = hash21(gl_FragCoord.yx * 1.73 + floor(uTime * 9.0) + 31.7) - 0.5;
    float blueSurface = smoothstep(0.08, 0.48, color.b);
    color += (grain * 0.78 + fineGrain * 0.32) * vec3(0.075, 0.1, 0.14) * blueSurface;

    gl_FragColor = vec4(color, 1.0);
  }
`

const compileShader = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type)
  if (!shader) throw new Error('Nie udało się utworzyć shadera Hero')
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || 'Nieznany błąd kompilacji shadera Hero'
    gl.deleteShader(shader)
    throw new Error(message)
  }

  return shader
}

export default function HeroGradientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
    })

    if (!gl) {
      canvas.style.display = 'none'
      return
    }

    let vertex: WebGLShader | null = null
    let fragment: WebGLShader | null = null
    let program: WebGLProgram | null = null
    let buffer: WebGLBuffer | null = null
    let frame = 0
    let lastFrame = -Infinity
    let disposed = false

    try {
      vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader)
      fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader)
      program = gl.createProgram()
      if (!program) throw new Error('Nie udało się utworzyć programu WebGL Hero')

      gl.attachShader(program, vertex)
      gl.attachShader(program, fragment)
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || 'Nie udało się połączyć programu WebGL Hero')
      }

      buffer = gl.createBuffer()
      if (!buffer) throw new Error('Nie udało się utworzyć bufora WebGL Hero')
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW,
      )
    } catch (error) {
      console.warn('Hero WebGL fallback:', error)
      canvas.style.display = 'none'
      return
    }

    gl.useProgram(program)
    const positionLocation = gl.getAttribLocation(program, 'aPosition')
    const resolutionLocation = gl.getUniformLocation(program, 'uResolution')
    const pointerLocation = gl.getUniformLocation(program, 'uPointer')
    const timeLocation = gl.getUniformLocation(program, 'uTime')
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const resize = () => {
      const parent = canvas.parentElement
      const rect = parent?.getBoundingClientRect() ?? canvas.getBoundingClientRect()
      const density = rect.width <= 768 ? 0.72 : 0.78
      const width = Math.max(2, Math.round(rect.width * density))
      const height = Math.max(2, Math.round(rect.height * density))

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
        gl.viewport(0, 0, width, height)
      }
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    let pointerX = 0.62
    let pointerY = 0.36
    let pointerVelocityX = 0
    let pointerVelocityY = 0
    let targetPointerX = pointerX
    let targetPointerY = pointerY

    const onPointerMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const inside = event.clientX >= rect.left
        && event.clientX <= rect.right
        && event.clientY >= rect.top
        && event.clientY <= rect.bottom

      if (!inside) {
        targetPointerX = 0.62
        targetPointerY = 0.36
        return
      }

      targetPointerX = (event.clientX - rect.left) / Math.max(rect.width, 1)
      targetPointerY = 1 - (event.clientY - rect.top) / Math.max(rect.height, 1)
    }

    const render = (now: number) => {
      if (disposed) return

      if (now - lastFrame >= 1000 / 30) {
        lastFrame = now
        resize()
        pointerVelocityX = (pointerVelocityX + (targetPointerX - pointerX) * 0.055) * 0.76
        pointerVelocityY = (pointerVelocityY + (targetPointerY - pointerY) * 0.055) * 0.76
        pointerX += pointerVelocityX
        pointerY += pointerVelocityY
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
        gl.uniform2f(pointerLocation, pointerX, pointerY)
        gl.uniform1f(timeLocation, 8 + now / 1000)
        gl.drawArrays(gl.TRIANGLES, 0, 6)
      }

      if (!reducedMotion) frame = window.requestAnimationFrame(render)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas.parentElement ?? canvas)
    if (finePointer && !reducedMotion) {
      window.addEventListener('mousemove', onPointerMove, { passive: true })
    }
    resize()
    frame = window.requestAnimationFrame(render)

    return () => {
      disposed = true
      observer.disconnect()
      window.removeEventListener('mousemove', onPointerMove)
      if (frame) window.cancelAnimationFrame(frame)
      if (buffer) gl.deleteBuffer(buffer)
      if (program) gl.deleteProgram(program)
      if (vertex) gl.deleteShader(vertex)
      if (fragment) gl.deleteShader(fragment)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden='true' />
}
