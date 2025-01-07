import Image from 'next/image';
import React from 'react';

function Hero() {
  return (
    <main className="max-w-screen-2xl mx-auto mt-8 font-sans">
      {/* Hero Section */}
      <div className="relative">
        <div className="bg-[url('/hero.jpg')] bg-cover object-cover  bg-center h-screen w-full flex items-center justify-center text-center lg:justify-start lg:text-left lg:px-32 px-5 relative z-20">
          {/* Text Content */}
          <div className="text-white px-5">
            <p className="py-5 text-xs md:text-sm">SUMMER 2020</p>
            <h1 className="text-3xl md:text-5xl font-bold">NEW COLLECTION</h1>
            <p className="opacity-70 text-sm md:text-lg py-5">
              We know how large objects will act, <br />
              but things on a small scale.
            </p>
            <button className="bg-[#2DC071] py-2 px-5 font-bold">Shop Now</button>
          </div>
        </div>
        {/* Overlay Fix */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-10"></div>
      </div>

      {/* Editor Picks Section */}
      <div className="bg-[#FAFAFA]">
        <div className="text-center mt-10 py-20 px-5">
          <b className="text-[#737373] text-2xl">EDITORS PICKS</b>
          <p className="text-[#737373] pt-6">Problems trying to resolve the conflict between</p>
        </div>

        <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-10 max-w-screen-lg mx-auto font-semibold px-5">
          {/* Card 1 */}
          <div className="relative flex justify-center">
            <div className="sm:w-[250px] w-[250px]">
            <Image src="/img1.png" width={510} height={500} alt="Men" />
            <p className="absolute lg:bottom-14 bottom-5  left-10 sm:left-52 bg-white text-center py-2 px-4">MEN</p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="relative flex flex-col justify-center items-center">
            <Image src="/img2.png" width={240} height={500} alt="Women" />
            <p className="absolute bottom-5  left-10 sm:left-52 bg-white text-center py-2 px-4">WOMEN</p>
          </div>
          {/* Card 3 */}
          <div >
            <div className="relative mb-5 flex flex-col justify-center items-center">
              <Image src="/img3.png" width={240} height={242} alt="Accessories" />
              <p className="absolute bottom-5 left-10 sm:left-52 bg-white text-center py-2 px-4">ACCESSORIES</p>
            </div>
            <div className="relative flex flex-col justify-center items-center">
              <Image src="/img4.png" width={240} height={242} alt="Kids" />
              <p className="absolute bottom-5 left-10 sm:left-52 bg-white text-center py-2 px-4">KIDS</p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

export default Hero;
