import { useEffect, useRef } from 'react'
import TOPOLOGY from 'vanta/dist/vanta.topology.min'
import p5 from 'p5'

export default function VantaTopology() {
  const vantaRef = useRef<HTMLDivElement | null>(null)
  const effectRef = useRef<unknown>(null)

  useEffect(() => {
    const TOPO_EFFECT = (TOPOLOGY).default || TOPOLOGY

    if (!effectRef.current && vantaRef.current) {
      try {
        effectRef.current = TOPO_EFFECT({
          el: vantaRef.current,
          p5: p5,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          // color: 0x63b8a7, // teal
          color: 0x0, // black
          backgroundColor: 0xffffff, // white
          // backgroundColor: 0xd9d9d9, // grey
          // backgroundColor: 0x1b1d1d, // black
        })
      } catch (err) {
        console.error('[VANTA.TOPOLOGY] Init error:', err)
      }
    }

    return () => {
      // effectRef.current?.destroy()
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
