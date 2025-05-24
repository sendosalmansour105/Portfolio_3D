import React from 'react'
import { FlipWords } from './FlipWords'
import { motion } from 'motion/react'

const HeroText = () => {
    const words = ["Speed", "Mastery", "Patience", "Challenge"]
    const variants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
    }
    return (
        <div className='z-10 mt-20 text-center md:mt-40 md:text-left rounted-3xl bg-clip-text'>
            {/* DesktopView  */}
            <div className='flex-col hidden md:flex c-space'>
                <motion.h1
                    variants={variants}
                    initial='hidden'
                    animate="visible"
                    transition={{ delay: 1 }}
                    className='text-4xl font-medium'>Hi I'm Sendos</motion.h1>
                <div className='flex flex-col items-start'>
                    <motion.p
                        variants={variants}
                        initial='hidden'
                        animate="visible"
                        transition={{ delay: 1.2 }}
                        className='text-5xl font-medium text-neutral-300'>
                        A Frontend Developer
                    </motion.p>

                    <motion.p
                        variants={variants}
                        initial='hidden'
                        animate="visible"
                        transition={{ delay: 1.4 }}
                        className='text-4xl font-medium text-neutral-300'>  React and Vue </motion.p>
                    <motion.div
                        variants={variants}
                        initial='hidden'
                        animate="visible"
                        transition={{ delay: 1.5 }}>
                        <FlipWords words={words}
                            className='font-black text-white text-6xl' />
                    </motion.div>
                </div>
            </div>
            {/* MobileView */}
            <div className='flex flex-col space-y-6 md:hidden'>
                <motion.p
                    variants={variants}
                    initial='hidden'
                    animate="visible"
                    transition={{ delay: 1 }}
                    className='text-4xl font-medium'>Hi I'm Sendos</motion.p>
                <div>
                    <motion.p
                        variants={variants}
                        initial='hidden'
                        animate="visible"
                        transition={{ delay: 1.2 }}
                        className='text-5xl font-black text-neutral-300'> A Frontend Developer </motion.p>
                    <motion.div
                        variants={variants}
                        initial='hidden'
                        animate="visible"
                        transition={{ delay: 1.4 }}><FlipWords words={words} className='font-bold text-white text-6xl' /></motion.div>
                    <motion.p
                        variants={variants}
                        initial='hidden'
                        animate="visible"
                        transition={{ delay: 1.5 }}
                        className='text-3xl font-black text-neutral-300'>React and Vue</motion.p>

                </div>
            </div>
        </div>
    )
}

export default HeroText