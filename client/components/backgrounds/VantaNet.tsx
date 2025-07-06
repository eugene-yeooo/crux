import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import NET from 'vanta/dist/vanta.net.min'
import 'p5' // Required for Vanta.NET

export default function VantaNet() {
  const vantaRef = useRef<HTMLDivElement | null>(null)
  const effectRef = useRef<any>(null)

  useEffect(() => {
    const NET_EFFECT = (NET as any).default || NET

    if (!effectRef.current && vantaRef.current) {
      try {
        effectRef.current = NET_EFFECT({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          color: 0x63b8a7,
          backgroundColor: 0x1b1d1d,
          scale: 1.0,
          scaleMobile: 1.0,
          points: 11.0,
          maxDistance: 15.0,
          spacing: 10.0,
        })
      } catch (err) {
        console.error('[VANTA.NET] Init error:', err)
      }
    }

    return () => {
      effectRef.current?.destroy()
      effectRef.current = null
    }
  }, [])

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 -z-10 w-screen h-screen"
    />
  )
}
