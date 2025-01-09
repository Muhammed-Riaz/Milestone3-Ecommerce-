"use client"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { CiHeart } from "react-icons/ci";
import { FaSpinner } from 'react-icons/fa';
import { IoCartOutline } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import React from 'react';
import Ecommerce1, { ShoppingCartProduct } from "@/app/components/query1";
import { useCart } from '../../context/cartcontext';
import Header from '@/app/components/header';
import 'react-toastify/dist/ReactToastify.css';


function Page({ params }: { params: Promise<{ id: string }> }) {
  const [data, setData] = useState<ShoppingCartProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { id } = React.use(params);

  // Memoize fetchData with useCallback
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const productData: ShoppingCartProduct[] = await Ecommerce1();
      const selectedProduct = productData.find((product) => product.id === id);

      if (!selectedProduct) {
        console.error("Product not found");
        return;
      }

      setData(selectedProduct);
    } catch (error) {
      console.error("Error fetching product data:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // useEffect with updated dependency array
  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id, fetchData]);

  const handleAddToCart = useCallback(() => {
    if (data) {
      const productToAdd = {
        id: data.id,
        sku: data.sku,
        name: data.name,
        price: data.price,
        image: data.image ? urlFor(data.image).url() : "/placeholder-image.png",
        quantity: 1,
        currency: "USD",
      };

      addToCart(productToAdd);

      toast.success("Item added to cart!", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [data, addToCart]);


  const handleAddToCart1 = useCallback(() => {
    if (data) {
      const productToAdd = {
        id: data.id,
        sku: data.sku,
        name: data.name,
        price: data.price,
        image: data.image ? urlFor(data.image).url() : "/placeholder-image.png",
        quantity: 1,
        currency: "USD",
      };

      addToCart(productToAdd);

      toast.success("Item added to cart!", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [data, addToCart]);


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

  if (!data) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <h1 className="text-2xl font-bold text-red-400">Product not found! Refresh</h1>
      </div>
    );
  }

  return (
<>
<ToastContainer/>
    <section>
      <Header />

      <div className='bg-[#FAFAFA] max-w-screen-2xl mx-auto'>

        <div className='max-w-[1440px] mx-auto'>
          <div className='max-w-screen-xl px-5 mx-auto flex items-center gap-2 pt-[24px] pb-[24px]'>
            <span className='text-[#252B42] font-[700] text-[14px]'>Home</span>
            <MdOutlineKeyboardArrowRight fill='#BDBDBD' size={30} />
            <span className='text-[#b1aeae] font-bold'>shop</span>
          </div>
        </div>

        <div className='max-w-[1440px] lg:mx-8 mx-2 shadow-xl border rounded-md border-gray-400 h-auto bg-[#FAFAFA] lg:p-10 p-4'>

          <div className='flex flex-col sm:flex-row max-w-screen-xl mx-auto h-auto sm:gap-10 gap-4 sm:px-10 px-2 relative'>

            {/* img */}
            <div className='sm:w-[506px] w-full relative rounded-[10px] mb-4'>

              <div className='bg-[#FFFFFF] w-full h-[250px]  rounded-[10px] sm:h-[450px]  relative'>
                <Image
                  src={data.image ? urlFor(data.image).url() : "/placeholder-image.png"}
                  height={500}
                  width={300}
                  alt={data.name || "Product image"}
                  className='overflow-hidden rounded-[5px] h-full w-full  absolute inset-0 object-cover '
                  onError={(e) => e.currentTarget.src = "/placeholder-image.png"} // Graceful fallback
                />

              </div>

              {/* stock image  */}
              <div className='flex gap-4 mt-4 py-5 '>

                <div className='max-w-[110px]  h-auto rounded-md overflow-hidden border border-gray-200 cursor-pointer'>
                  <Image
                    src={data.image ? urlFor(data.image).url() : "/placeholder-image.png"}
                    height={75}
                    width={110}
                    alt={data.name || "Product image"}
                    className='overflow-hidden rounded-[5px] bg-cover object-cover'
                    onError={(e) => e.currentTarget.src = "/placeholder-image.png"} // Graceful fallback
                  />

                </div>

                <div className='max-w-[110px] h-auto rounded-md overflow-hidden border border-gray-200 cursor-pointer'>
                  <Image
                    src={data.image ? urlFor(data.image).url() : "/placeholder-image.png"}
                    height={75}
                    width={110}
                    alt={data.name || "Product image"}
                    className='overflow-hidden rounded-[5px] bg-cover object-cover'
                    onError={(e) => e.currentTarget.src = "/placeholder-image.png"} // Graceful fallback
                  />

                </div>


              </div>

            </div>

            {/* text  */}
            <div className=' py-5 text-center sm:text-left'>
              <h3 className='text-[#252B42] font-[400] text-[20px]'>{data.name}</h3>

              {/* review */}
              <div className='w-[223px] h-[24px] flex items-center sm:gap-5 gap-2 my-[23px] ml-[10px] '>
                <div className='w-[150px] h-[23px] '>
                  <Image
                    src={"/stars.png"}
                    height={25}
                    width={150}
                    alt='stars'
                  >
                  </Image>
                </div>

                <div className='w-[100px] mb-3'>
                  <p className='text-[#737373]  font-bold text-[14px]'>10 Reviews</p>
                </div>

              </div>

              {/* price */}
              <div >
                <p className='text-[24px] font-[700] text-[#252B42]'> <span className='line-through text-[#737373]'>50$</span> {data.price}$</p>
              </div>

              {/* stock */}
              <div>
                <span className='text-[#737373] font-[700] text-[14px] '>Availability :</span> <span className='text-[#23A6F0] font-[700] text-[14px]'>in Stock</span>
              </div>
              {/* title */}
              <div className='max-w-[464px] my-5'>
                <p className='text-[#858585] font-[400]  text-[18px] '>{data.description}</p>
              </div>

              {/* line  */}
              <hr className='border-b-[1px] w-full' />

              {/* rounded color light */}
              <div className='sm:flex  hidden  items-center my-10 gap-2 mt-4'>
                <div className='w-[16px] h-[16px] bg-[#23A6F0] rounded-full'></div>
                <div className='w-[16px] h-[16px] bg-[#23856D] rounded-full'></div>
                <div className='w-[16px] h-[16px] bg-[#E77C40] rounded-full'></div>
                <div className='w-[16px] h-[16px] bg-[#252B42] rounded-full'></div>
              </div>

              <div className='max-w-[400px] my-8 h-[44px] flex gap-5 items-center'>

                <button className='bg-[#23A6F0] w-[148px] h-[44px] rounded-[5px] sm:py-[10px] sm:px-[20px]  text-[#FFFFFF] text-[14px] font-[700]'>Select option</button>

                {/* Icons */}
                <div className='flex gap-5 items-center'>
                  <div className='bg-[#FFFFFF] rounded-[45px] flex items-center justify-center sm:w-[50px] w-full  h-[50px] border-[1px]'>
                    <CiHeart size={30} />
                  </div>

                  <div className='bg-[#FFFFFF] rounded-[45px] flex items-center justify-center sm:w-[50px] w-full  h-[50px] border-[1px]'>
                    <button
                    className='hidden sm:block'
                      onClick={handleAddToCart}
                    
                    >
                      <IoCartOutline size={30} />
                    </button>

                    <button
                    className='sm:hidden block'
                      onClick={handleAddToCart1}
                    
                    >
                      <IoCartOutline size={30} />
                    </button>
                  </div>

                  <div className='bg-[#FFFFFF] rounded-[45px] flex items-center justify-center sm:w-[50px] w-full h-[50px] border-[1px]'>
                    <MdRemoveRedEye size={30} />
                  </div>



                </div>


              </div>
              <br />
             
            </div>
          </div>
        </div>

      </div>
    </section>

    </>
  );
}

export default Page;


