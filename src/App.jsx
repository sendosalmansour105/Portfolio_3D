import React from 'react'
import NavBar from './sections/NavBar'
import Hero from './sections/Hero'
import About from './sections/About'
const App = () => {
  return (
    <div className='container mx-auto max-w-7xl'>
      <NavBar />
      <Hero />
      <About />
      <section className='min-h-screen'></section>
      <section className='min-h-screen'></section>
      <section className='min-h-screen'></section>
    </div>
  )
}

export default App