import Image from 'next/image'
import React from 'react'

function Classic() {
  return (
    <main>
      {/* parent */}
      <div className='mt-16 max-w-[1440px] lg:h-[711px] h-[1230px] mx-auto bg-[#23856D] font-sans'>

        <div className='flex lg:flex-row flex-col justify-evenly items-center text-white lg:pt-5 pt-20 '>

          {/* text */}
          <div className='pt-20 lg:pt-5 text-center'>
            <p className='text-xl'>summer 2020</p>
            <br />
            <br />
            <h1 className='text-5xl font-bold'>Vita Classic <br /> Product</h1>
            <br />
            <p className='text-xs'>We know how large objects will act, We know <br /> how are objects will act, We know</p>
            <br />
            <div>
              <span className='font-bold text-xl'>$16.48</span> <br className='lg:hidden block' /> <br className='md:hidden lg:hidden' />  <button className='text-white bg-[#2DC071] rounded-xl ml-5 py-2 px-8'>Add to cart</button>
            </div>
          </div>

          {/* image */}
          <div className='max-w-[443px] h-[685px] mt-20 '>
            <Image src={"/shop1.png"} width={443} height={685} alt='hero'></Image>
          </div>

        </div>
      </div>
    </main>
  )
}

export default Classic