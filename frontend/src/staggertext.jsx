import React, {useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {motion, useAnimation, useInView} from "framer-motion"

const Staggertext = () => {
  return (
    <div className='h-80 w-screen flex flex-col items-center'>
        <Link to="/upload"><button className='h-15 w-100 border border-white/20 text-3xl rounded-2xl shadow-2xl bg-white/20 backdrop-blur-md font-medium'> Upload Your Pictures</button></Link>
        <br/>
        <br/>
        <AnimatedText text={["Welcome To PicStack"]}
        className="text-7xl font-bold text-white" repeat={10000} el = "p"></AnimatedText>
        <br/>
        <AnimatedText text={["viewing memories with a touch of magic"]} className='text-3xl text-white' repeat={10000} el="p"></AnimatedText>
        <AnimatedText text={["Secure. Instant. Chill."]} className='italic text-lg text-white' repeat={10000} el="p"></AnimatedText>
    </div>
  )
}
function AnimatedText({text, className="", repeat, el="p"}){
    const controls = useAnimation();
    const textArray = Array.isArray(text) ? text : [text];
    const ref = useRef(null);
    const isInView = useInView(ref, {amount: 0.5});

    const animation = {
        hidden:{
            opacity:0,
            y:20
        },
        visible:{
            opacity:1,
            y:0,
            transition:{
                duration:0.1
            }
        }
    };
    useEffect(()=>{
        let timeout;

        const show = ()=>{
            controls.start("visible");
            if (repeat){
                timeout = setTimeout(async () => {
                    await controls.start("hidden");
                    controls.start("visible");
                }, repeat)
            }
        };

        if (isInView){
            show();
        }else{
            controls.start("hidden");
        }
        return () => clearTimeout(timeout)
    }, [isInView]);
    // the above return is for useEffect 

    const Wrapper = el;

    return(
        <Wrapper className= {className}>
            <motion.span ref={ref} initial = "hidden" animate={controls}
            variants={{visible:{
                transition: {
                    staggerChildren: 0.1
                }
            }, hidden:{}}} aria-hidden>
                {textArray.map((line,i)=> (
                    <span key={i} className='block'>
                        {line.split(" ").map((word,j)=>(
                            <span key={j} className='inline-block'> 
                            {word.split("").map((char,k)=> (
                                <motion.span key={k} className='inline-block'
                                variants={animation}>
                                    {char}
                                </motion.span>
                            ))}
                            <span className="inline-block">&nbsp;</span>
                            </span>
                        ))}
                    </span>
                ))}
            </motion.span>
        </Wrapper>
    );

}
export default Staggertext;