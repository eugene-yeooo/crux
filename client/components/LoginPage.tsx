export default function LoginPage() {
  return (
    <div className="h-screen bg-brandBlack flex items-center justify-center">
      <div className="flex flex-col items-center space-y-8 -translate-y-14">
        <h1 className="text-9xl font-bold tracking-wide bg-gradient-to-l from-[#65a3a1] to-[#95a3a1] bg-clip-text text-transparent inline-block">
          crux
        </h1>
        <button className="px-6 py-3 rounded-xl bg-gradient-to-l from-[#65a3a1] to-[#95a3a1] text-brandBlack font-semibold shadow-md hover:brightness-125 transition">
          Login
        </button>
      </div>
    </div>
  )
}
