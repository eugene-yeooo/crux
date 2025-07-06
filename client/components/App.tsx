import '../styles/main.css'
import { Outlet } from 'react-router'
import NavMain from './NavMain.tsx'
import Header from './header/Header.tsx'
import Footer from './Footer.tsx'
import VantaFogBackground from './backgrounds/VantaTopo.tsx'

function App() {
  return (
    <div className="app min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="relative flex flex-row flex-grow justify-center gap-8 py-6 px-4 z-10">
        <VantaFogBackground />
         <div className="w-64 shrink-0">
          <NavMain />
        </div>
       <div className="w-full max-w-4xl">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
