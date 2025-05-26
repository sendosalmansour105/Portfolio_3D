import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import React from 'react'

const MotionBackground = () => {
    const { scrollYProgress } = useScroll();
    const x1= useSpring(scrollYProgress, {damping:50})
    const mountain3y = useTransform(x1, [0, 0.5], ["0%", "70%"]);
    const planetsx = useTransform(x1, [0, 0.5], ["0%", "-20%"]);
    const mountain2y = useTransform(x1, [0, 0.5], ["0%", "30%"]);
    const mountain1y = useTransform(x1, [0, 0.5], ["0%", "0%"]);
    return (
        <section className='absolute inset-0 bg-black/40'>
            <div className='relative h-screen overflow-y-hidden'>
                {/* Sky  */}
                <div className='absolute inset-0 w-full h-screen -z-50'
                    style={{
                        backgroundImage: "url(images/sky.jpg)",
                        backgroundPosition: "bottom",
                        backgroundSize: "cover"

                    }} />
                {/* mountains  */}
                <motion.div className='absolute inset-0 -z-40'
                    style={{
                        backgroundImage: "url(images/mountain-3.png)",
                        backgroundPosition: "bottom",
                        backgroundSize: "cover",
                        y: mountain3y,

                    }} />
                {/* planets  */}
                <motion.div className='absolute inset-0 -z-30'
                    style={{
                        backgroundImage: "url(images/planets.png)",
                        backgroundPosition: "bottom",
                        backgroundSize: "cover",
                        x: planetsx,

                    }} />
                {/* mountains 2  */}
                <motion.div className='absolute inset-0 -z-20'
                    style={{
                        backgroundImage: "url(images/mountain-2.png)",
                        backgroundPosition: "bottom",
                        backgroundSize: "cover",
                        y: mountain2y,

                    }} />
                {/* mountains 3  */}
                <motion.div className='absolute inset-0 -z-10'
                    style={{
                        backgroundImage: "url(images/mountain-1.png)",
                        backgroundPosition: "bottom",
                        backgroundSize: "cover",
                        y: mountain1y,

                    }} />
            </div>
        </section>
    )
}

export default MotionBackground