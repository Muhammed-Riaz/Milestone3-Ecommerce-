"use client"

import Productcard from '@/app/components/productCard';
import {Ecommerce, EType} from '@/app/components/query'
import React, { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa';

function ProductsPage() {

    const [getData, setgetData] = useState<EType[]>([]); // Use Blog[] as type
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function getApi() {
        try {

          const res:EType[] =await Ecommerce()
  
          if (!res) {
            console.log("invalid data");
            
          }
  
          setgetData(res); // Set data to state
        } catch (error) {
          console.error('Error fetching Products:', error);
        } finally {
          setLoading(false); // Ensure loading is stopped even on error
        }
      }
  
      getApi();
    }, []);
    
  
    if (loading) {
      return (
        <div className="flex justify-center items-center h-[100vh]">
          <div>
            <FaSpinner className="animate-spin text-4xl ml-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-blue-400">Loading...</h1>
          </div>
        </div>
      );
    }


  return (


    <section className="font-sans">
    <div className="min-h-screen py-10">
      {/* Top Text Heading */}
      <div className='py-20 px-5'>
        <p className='text-[#737373] text-xl text-center'>Featured Products</p>
        <h1 className='text-[#737373] text-2xl font-bold text-center my-3'>BESTSELLER PRODUCTS</h1>
        <p className='text-[#737373] text-center '>Problems trying to resolve the conflict between</p>
      </div>

      {/* Blogs */}
     <div className='flex justify-center items-center'>
     <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10  lg:mx-10 ">
        {getData.map((prod) => (
          <Productcard key={prod._id} data={prod} /> // Pass each blog
        ))}
      </div>
     </div>

    </div>
  </section>


  )
}

export default ProductsPage