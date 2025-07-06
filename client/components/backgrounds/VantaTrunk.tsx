import { useEffect, useRef } from 'react'
import TRUNK from 'vanta/dist/vanta.trunk.min'
import p5 from 'p5'

export default function VantaTrunk() {
  const vantaRef = useRef<HTMLDivElement | null>(null)
  const effectRef = useRef<any>(null)

  useEffect(() => {
    const TRUNK_EFFECT = (TRUNK as any).default || TRUNK

    if (!effectRef.current && vantaRef.current) {
      try {
        effectRef.current = TRUNK_EFFECT({
          el: vantaRef.current,
          p5: p5,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x55b3b2,
          backgroundColor: 0xe8e8e8,
          spacing: 10.0,
          chaos: 7.0,
        })
      } catch (err) {
        console.error('[VANTA.TRUNK] Init error:', err)
      }
    }

    return () => {
      try {
        effectRef.current?.destroy()
        effectRef.current = null
      } catch (err) {
        console.warn('[VANTA.TRUNK] Cleanup error:', err)
      }
    }
  }, [])

 return (
    <div
      ref={vantaRef}
      className="fixed inset-0 -z-10 w-screen h-screen"
    />
  )
}
