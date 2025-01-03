"use client"
import Link from "next/link";
import { useCart } from "../(pages)/context/cartcontext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { IoCallOutline, IoCartOutline, IoPersonOutline } from "react-icons/io5";

import { CiHeart, CiSearch, CiYoutube, CiFacebook, CiTwitter } from "react-icons/ci";
import { FaInstagram, FaAngleDown } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { BiMenuAltRight } from "react-icons/bi";

function Header() {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="max-w-screen-2xl mx-auto font-sans">
      {/* Top Section Header */}
      <div className="hidden lg:flex justify-between items-center bg-[#252B42] text-white py-4 px-5">
        {/* Contact Information */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 font-semibold">
            <IoCallOutline size={20} />
            <p>(225) 555-0118</p>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <TfiEmail size={20} />
            <p>michelle.rivera@example.com</p>
          </div>
        </div>

        {/* Promotion */}
        <div className="font-bold text-center">
          <p>Follow Us and get a chance to win 80% off</p>
        </div>

        {/* Social Media Links */}
        <div className="flex items-center gap-4 font-bold">
          <p>Follow Us:</p>
          <FaInstagram size={20} />
          <CiYoutube size={20} />
          <CiFacebook size={20} />
          <CiTwitter size={20} />
        </div>
      </div>

      {/* Navbar Section */}
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <p className="text-3xl font-bold">Bandage</p>

          {/* Navigation Links */}
          <nav className="hidden sm:flex items-center gap-6 text-[#737373] font-bold">
            <Link href={"/"}>
              <li className="list-none hover:text-[#23A6F0]">Home</li>
            </Link>
            <Link href={"/shop"}>
              <li className="list-none flex items-center hover:text-[#23A6F0]">
                Shop <FaAngleDown className="ml-1" />
              </li>
            </Link>
            <Link href={"/about"}>
              <li className="list-none hover:text-[#23A6F0]">About</li>
            </Link>
            <Link href={"#"}>
              <li className="list-none hover:text-[#23A6F0]">Blog</li>
            </Link>
            <Link href={"/contact"}>
              <li className="list-none hover:text-[#23A6F0]">Contact</li>
            </Link>
            <Link href={"#"}>
              <li className="list-none hover:text-[#23A6F0]">Pages</li>
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-3 text-[#23A6F0] font-bold">
            <IoPersonOutline size={20} />
              <p>Login / Register</p>
            </div>

            <div className="flex items-center gap-3 relative h-[36px] w-[75px] lg:w-auto">
              <CiSearch size={30} fill="#23A6F0" className="hidden lg:block" />
              <CiSearch size={30} className="lg:hidden block" />
              <CiHeart size={30} fill="#23A6F0" className="hidden lg:block" />
              
              {/* Cart Icon with Badge */}
              <Link href="/cart">
                <div className="relative cursor-pointer">
                  <IoCartOutline size={30} color="#23A6F0" />
                  <span className="absolute top-0 right-0 w-[18px] h-[18px] rounded-full bg-[#23A6F0] flex justify-center items-center text-[12px] text-white">
                    {totalItems}
                  </span>
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger className="sm:hidden">
                <BiMenuAltRight size={30} />
              </SheetTrigger>
              <SheetContent className="bg-white">
                <SheetHeader>
                  <SheetTitle className="text-lg font-semibold text-[#252B42] mb-4 mt-5">
                    Navigation Menu
                  </SheetTitle>
                  <nav className="text-[#737373] font-bold text-sm">
                    <Link href={"/"}>
                      <li className="list-none mb-3 hover:text-[#23A6F0]">Home</li>
                    </Link>
                    <Link href={"/shop"}>
                      <li className="list-none mb-3 hover:text-[#23A6F0]">Shop</li>
                    </Link>
                    <Link href={"/about"}>
                      <li className="list-none mb-3 hover:text-[#23A6F0]">About</li>
                    </Link>
                    <Link href={"/contact"}>
                      <li className="list-none hover:text-[#23A6F0]">Contact</li>
                    </Link>
                  </nav>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
