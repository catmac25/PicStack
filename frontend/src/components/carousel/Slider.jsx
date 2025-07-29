
import React, { useRef, useState } from 'react';// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
const Slider = () => {
    return(
        <div>
               <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className='bg-[#eaf2d7] border-[#cddbb2]'>
          <div className=' flex flex-col justify-center items-center p-3'>
            <p className='mt-7 text-3xl font-bold'>Ray JohnSon</p>
            <p className='italic text-lg mt-2 text-center'>PicStack is a total game-changer! Uploading and sharing photos has never been this easy — just drag, drop, and you’re done. I love how quick and seamless the whole experience is!</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className='bg-[#eaf2d7] border-[#cddbb2]'>
        <div className=' flex flex-col justify-center items-center p-3'>
            <p className='mt-7 text-3xl font-bold'>Arianna Chawala</p>
            <p className='italic text-lg mt-10 text-center'>PicStack is super easy to use! I just dropped my photos in and shared the link with friends right away. No stress, just smooth and simple.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide  className='bg-[#eaf2d7] border-[#cddbb2]'>
        <div className=' flex flex-col justify-center items-center p-3'>
            <p className='mt-7 text-3xl font-bold'>Ken D'souza</p>
            <p className='italic text-lg mt-10 text-center'>PicStack’s got me acting like a tech genius. Upload? Done. Link? Instant. Whole process is vibe central 🔥.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide  className='bg-[#eaf2d7] border-[#cddbb2]'>
        <div className=' flex flex-col justify-center items-center p-3'>
            <p className='mt-7 text-3xl font-bold'>Sam Smith</p>
            <p className='italic text-lg mt-10 text-center'>Not me uploading pics in 2 seconds and feeling like a pro. PicStack really said ‘no stress, just flex.
                the tagline says it all !
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide className='bg-[#eaf2d7] border-[#cddbb2]'>
  <div className='flex flex-col justify-center items-center p-3'>
    <p className='mt-7 text-3xl font-bold'>Tanya Mehra</p>
    <p className='italic text-lg mt-10 text-center'>
      PicStack is that one tool I didn’t know I needed. Uploading pics is literally effortless. Sharing links? A breeze.
    </p>
  </div>
</SwiperSlide>

<SwiperSlide className='bg-[#eaf2d7] border-[#cddbb2]'>
  <div className='flex flex-col justify-center items-center p-3'>
    <p className='mt-7 text-3xl font-bold'>Jay Kapoor</p>
    <p className='italic text-lg mt-10 text-center'>
      Finally something that just works. No ads, no confusion — just drag, drop, and boom! Link ready to go.
    </p>
  </div>
</SwiperSlide>

<SwiperSlide className='bg-[#eaf2d7] border-[#cddbb2]'>
  <div className='flex flex-col justify-center items-center p-3'>
    <p className='mt-7 text-3xl font-bold'>Ravi Menon</p>
    <p className='italic text-lg mt-10 text-center'>
      No more apps compressing my pics. I just PicStack it, send the link, and everyone gets HD vibes.
    </p>
  </div>
</SwiperSlide>

      </Swiper>
        </div>
    )
} 

export default Slider