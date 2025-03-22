import React from 'react'
import FreeBooks from '../components/FreeBooks'
import Banner from '../components/banner'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
     <Navbar/>
      <Banner/>
      <FreeBooks/>
      <Footer/>
    </>
  )
}

export default Home
