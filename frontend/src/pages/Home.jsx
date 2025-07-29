import React from 'react';
import Staggertext from '../staggertext';
import Animation from "../components/Animation";
import Information from '../components/information';
import Features from '../components/Features';
import Examples from '../components/examples/Examples';
import { motion } from 'framer-motion';
import Slider from '../components/carousel/slider';
// import App from "../components/carousel/Appli"

const animation = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

function Home() {
  return (
    <section className='w-screen'>
      {/* Background video */}
      <video autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover z-[-1]">
        <source src="/pahaad.mp4" type="video/mp4" />
      </video>

      <br />
      <br />
      <br />

      <Staggertext />

      <div className='bg-[#f5f0e1]'>
        <div className='h-3 w-full bg-[#808000] mt-55 mb-10'></div>

        <div className='flex flex-col justify-center items-center'>
          <motion.div
            className='text-5xl font-bold text-center'
            variants={animation}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            What is PicStack?
          </motion.div>

          <Information />
        </div>

        <br />
        <br />
        <br />

        <motion.div
          className='text-5xl font-bold text-center'
          variants={animation}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          Why Choose Us?
        </motion.div>

        <br />
        <br />
        <br />

        <Features />

        <br />
        <br />
        <br />

        <Examples />

        <br />
        <br />
        <br />
      </div>
      <div className='bg-[#f5f0e1]'>
      <motion.div
          className='text-5xl font-bold text-center'
          variants={animation}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
        Trusted by Users Worldwide
        </motion.div>
        <Slider></Slider>
      </div>
    </section>
  );
}

export default Home;
