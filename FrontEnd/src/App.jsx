import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FreeBooks from './components/FreeBooks'
import Navbar from './components/Navbar'
import Banner from './components/banner'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Banner/>
      <FreeBooks/>
      <Footer/>

    </>
  )
}

export default App
