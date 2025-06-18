import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"

gsap.registerPlugin(ScrambleTextPlugin)

export default function LoginPage() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 2.5,
        ease: "power3.out",
        scrambleText: {
          text: "crux",
          chars: "lowerCase",
          revealDelay: 0.3,
          speed: 1,
        },
      }
    ).fromTo(
      buttonRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 2, ease: "power3.out" },
      "-=2"
    )
  }, [])

  const scramble = () => {
    gsap.to(titleRef.current, {
      duration: 1.3,
      scrambleText: {
        text: "crux",
        chars: "lowerCase",
        revealDelay: 0.3,
        speed: 1,
      },
      ease: "power3.out",
    })
  }

  return (
    <div className="h-screen bg-brandBlack flex items-center justify-center">
      <div className="flex flex-col items-center space-y-8 -translate-y-14 text-left">
        <h1
          ref={titleRef}
          onMouseEnter={scramble}
          className="text-9xl font-bold tracking-wider bg-gradient-to-l from-[#55a3a1] to-[#95a3a1] bg-clip-text text-transparent inline-block font-mono min-w-[12ch] text-center"
        >
          crux
        </h1>
        <button
          ref={buttonRef}
          className="opacity-0 translate-y-5 px-6 py-3 rounded-xl bg-gradient-to-l from-[#45a3a1] to-[#95a3a1] text-brandBlack font-semibold shadow-md hover:brightness-125 transition"
        >
          Login
        </button>
      </div>
    </div>
  )
}
