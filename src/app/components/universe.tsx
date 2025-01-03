import Image from 'next/image';
import React from 'react';

function Universe() {
  return (
    <section className='font-sans'>
      <div className='mt-16 max-w-[1440px] mx-auto px-4'>
        <div className='flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-10 lg:gap-20'>
          {/* Image for larger screens */}
          <div className='lg:max-w-[704px] h-[682px] lg:block hidden'>
            <Image src={"/cloth1.png"} width={704} height={682} alt='hero' className='w-full h-auto' />
          </div>

          {/* Text content */}
          <div className='max-w-[573px]  text-center lg:text-start'>
            <p className='text-[#737373] text-xl'>Summer 2020</p>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-[#252B42] mt-3'>
              Part of the Neural Universe
            </h1>
            <p className='text-[#737373] mt-3 px-6 sm:px-10 lg:px-3'>
              We know how large objects will act,<br />
              but things on a small scale.
            </p>

            {/* Buttons */}
            <div className='lg:flex flex-col sm:flex-row justify-center lg:justify-start gap-5 mt-5 '>

              <button className='py-[15px] px-[40px] rounded-xl text-white bg-[#23A6F0] w-[200px] lg:bg-[#2DC071] '>
                Buy Now
              </button>
              

              <button className='py-[15px] px-[40px]  mt-3 sm:mt-0 rounded-lg border-2 w-[200px] border-blue-400 text-[#23A6F0] lg:hidden block ml-16'>
                Learn More
              </button>

              <button className='py-2 px-8 mt-3 sm:mt-0 rounded-lg border-2  lg:border-green-400 text-[#2DC071] lg:block hidden'>
                Read More
              </button>
            </div>
          </div>

          {/* Image for smaller screens */}
          <div className='lg:hidden block w-full mt-10'>
            <Image src={"/cloth1.png"} width={704} height={682} alt='hero' className='w-full h-auto' />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Universe;
