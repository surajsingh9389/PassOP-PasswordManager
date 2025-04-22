import { useState } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import Main from './components/Main'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar/>
      <div className='min-h-[66vh]'>
      <Main/>
      </div>
      <Footer/>
    </>
  )
}

export default App
