import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import 'p5'
import FOG from 'vanta/dist/vanta.fog.min'

export default function VantaFogTest() {
  const ref = useRef<HTMLDivElement>(null)
  const effectRef = useRef<any>(null)

  useEffect(() => {
    const FOG_EFFECT = (FOG as any).default || FOG
    if (ref.current && !effectRef.current) {
      effectRef.current = FOG_EFFECT({
        el: ref.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        highlightColor: 0xf3ebe0,
        midtoneColor: 0xe9ded2,
        lowlightColor: 0xdcd1c2,
        baseColor: 0xfaf7f2,
        speed: 4.5,
      })
    }

    return () => {
      try {
        effectRef.current?.destroy()
      } catch (e) {
        console.warn('Vanta destroy error:', e)
      }
    }
  }, [])

  return (
    <div
  ref={ref}
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: -20,           // visible layer
  }}
/>
  )
}
