import React from 'react'
import HeroText from '../components/HeroText'
import MotionBackground from '../components/MotionBackground'

const Hero = () => {
  return (
    <section className='flex items-start justify-center md:items-start md:justify-start min-h-screen overflow-hidden c-space'>
      <HeroText />
      <MotionBackground/>
        </section>
  )
}

export default Hero