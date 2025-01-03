import React from 'react'
import Link from "next/link"
 import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { BiMenuAltRight } from "react-icons/bi";

function Header1() {
  return (
    <header className="max-w-screen-2xl mx-auto font-sans ">



    {/* navbar */}
    <div className='max-w-screen-2xl gap-3 flex items-center lg:justify-between lg:px-10 px-3 mt-5 mx-auto '>

      <div>
        <p className='text-3xl font-bold'>Bandage</p>
      </div>

      <div>
        <ul className=' hidden sm:flex items-center  gap-5 text-[#737373] font-bold text-[18px]'>
          <Link href={"/"}><li>Home</li></Link>
          <Link href={"/shop"}><li>Product </li></Link>
          <Link href={"/pricing"}><li>Pricing</li></Link>
          <Link href={"/contact"}><li>Contact</li></Link>
        </ul>
      </div>

      <div>


        <div className='flex items-center gap-5'>

          <div className='sm:hidden hidden lg:flex items-center gap-5 font-bold text-[#23A6F0]'>
         
              <button>Login</button>
              <button className='w-[214px] h-[52px] bg-[#23A6F0] font-bold text-[14px] rounded-[5px] text-white'>Become a member</button>

          </div>


        </div>
      </div>

      <Sheet >
    <SheetTrigger className="sm:hidden block">
      <BiMenuAltRight size={30} className="block sm:hidden" />
    </SheetTrigger>
    <SheetContent className="bg-white">
      <SheetHeader>
      <ul className=" text-[#737373] font-bold text-[14px]">
        <Link href={"/"}><li>Home</li></Link>
        <br />
        <Link href={"/shop"}><li>Product</li></Link>
        <br />
        <Link href={"/pricing"}><li>Pricing</li></Link>
        <br />
        <Link href={"/contact"}><li>Contact</li></Link>
      </ul>
      </SheetHeader>
    </SheetContent>
  </Sheet>

    </div>


  </header>
  )
}

export default Header1