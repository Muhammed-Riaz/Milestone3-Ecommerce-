import Footer from '@/app/components/footer';
import Header from '@/app/components/header';
import Products from '@/app/components/products';
import Image from 'next/image';
import React from 'react';
import { FaAngleDown } from "react-icons/fa";

function Shop() {
  return (


    <section>

{/* header */}

<Header/>


      <div className="mt-20 font-sans">

        {/* Header Section */}
        <div className="bg-[#FAFAFA] w-full py-10">
          <div className="max-w-[1050px] mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-10  lg:gap-4">
              <h1 className="font-bold text-[24px] text-[#252B42]">Shop</h1>
              <div className="flex items-center gap-2">
                <span className="text-[#252B42] text-[14px] font-bold">Home</span>
                <Image src="/arrow.png" width={10} height={10} alt="Arrow Icon" />
                <span className="text-[#BDBDBD] font-bold">Shop</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-10">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="w-full">
                <Image
                  src={`/col${index + 1}.png`}
                  width={204}
                  height={223}
                  alt={`Product ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-[#FAFAFA] py-5 mt-10">

          <div className="max-w-[1050px] mx-auto flex gap-8 lg:flex-row flex-col justify-between items-center">

            <div>
              <p className="font-bold text-[#737373] text-[14px]">Showing all 12 results</p>
            </div>

            <div className='flex items-center justify-center gap-5'>
              <span className="text-[#737373] font-bold">Views:</span>
              <Image src="/btn1.png" width={60} height={60} alt="Grid View" />
              <Image src="/btn2.png" width={60} height={60} alt="List View" />
            </div>


            <div className="flex lg:flex-row  flex-col items-center gap-4">
              <button className="border border-[#737373] rounded px-4 py-2 bg-[#DDDDDD] flex items-center">
                <span className="text-[#737373]">Popularity</span>
                <FaAngleDown className="ml-2 text-[#737373]" />
              </button>
              <button className="bg-[#23A6F0] text-white rounded px-4 py-2 font-bold">
                Filter
              </button>
            </div>

          </div>

        </div>



        <div className="max-w-[1440px] lg:h-[175px] h-[773px] mt-10 mx-auto bg-[#FAFAFA] lg:p-5 p-28">
          
          <div className="max-w-[1050px] mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">

            <div className='w-[83px] h-[34px]'>
              <Image src={"/v1.png"} width={83} height={34} alt="Image 1" className="w-full object-cover" />
            </div>

            <div className='w-[103px] h-[59px]'>
              <Image src={"/v2.png"} width={103} height={59} alt="Image 1" className="w-full object-cover" />
            </div>

            <div className='w-[104px] h-[62px]'>
              <Image src={"/v3.png"} width={104} height={62} alt="Image 1" className="w-full object-cover" />
            </div>


            <div className='w-[76px] h-[72px]'>
              <Image src={"/v4.png"} width={153} height={34} alt="Image 1" className="w-full object-cover" />
            </div>

            <div className='w-[102px] h-[75px]'>
              <Image src={"/v5.png"} width={153} height={34} alt="Image 1" className="w-full object-cover" />
            </div>

          </div>
        </div>



        {/* Footer Section */}
        <div className="sm:block hidden">
          <Footer />
        </div>



        {/* Product Cards */}

        <Products/>

      {/* </div> */}


      <div className='max-w-[1124px] h-auto mx-auto flex justify-center mb-10 mt-10'>

        <div className=' w-[313px] h-[74px] flex justify-center items-center rounded-[6.73px] border-2'>

          <div className='w-[84px]  h-[74px] flex justify-center items-center '>
            <button className='text-[#BDBDBD] font-bold'>first</button>
          </div>

          <div className='w-[46px]  h-[74px] flex justify-center items-center border-2'>
            <p className='text-[#23A6F0]'>1</p>
          </div>

          <div className='w-[49px] bg-[#23A6F0] h-[74px] flex justify-center items-center '>
            <p className='text-white'>2</p>
          </div>

          <div className='w-[85px]  h-[74px] flex justify-center items-center  '>
            <button className='text-[#23A6F0] font-bold'>Next</button>
          </div>


        </div>
        </div>
        </div>

    </section>
  );
}

export default Shop;
