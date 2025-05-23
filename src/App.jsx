import React from 'react'
import NavBar from './sections/NavBar'
import Hero from './sections/Hero'
import About from './sections/About'
import Footer from './components/Footer'
import Projects from './sections/Projects'
import Experiences from './sections/Experiences'
const App = () => {
  return (
    <div className='container mx-auto max-w-7xl'>
      <NavBar />
      <Hero />
      <About />
      <Projects/>
      <Experiences/>
      <Footer/>
    </div>
  )
}

export default App