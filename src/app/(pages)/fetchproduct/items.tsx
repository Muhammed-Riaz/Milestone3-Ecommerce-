import React from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/footer";
import ProductList from "../../components/apiproduct";

const Blog = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="container mx-auto px-4">
        {/* 3rd Page */}
        <div className="max-w-screen-2xl mx-auto bg-white py-10">
          <div className="max-w-[1440px] mx-auto">
            <div className="h-[72px] mt-[10px] flex justify-center flex-wrap">
              <div className="p-[24px]">
                <Link href="/" className="font-[Montserrat] font-[600] text-[14px] text-[#737373]">
                  Description
                </Link>
              </div>
              <div className="p-[24px]">
                <Link href="/" className="font-[Montserrat] font-[600] text-[14px] text-[#737373]">
                  Additional Information
                </Link>
              </div>
              <div className="p-[24px] ">
                <Link href="/" className="font-[Montserrat] font-[600] text-[14px] text-[#737373]">
                  Reviews <span className="text-green-700 ml-2">(0) </span>
                </Link>
              </div>
            </div>
            <div className="border-t border-[#ECECEC] mx-auto max-w-4xl mt-20 lg:mt-5"></div>

            <div className="flex flex-wrap items-center justify-center gap-10 mt-20 lg:mt-10 ">
              <div className="w-[332px] h-[392px]">
                <Image
                  className="w-full h-full object-cover"
                  alt="frame"
                  width={400}
                  height={500}
                  src={"/chair.jpeg"}
                />
              </div>
              <div className="w-[335px]">
                <h3 className="font-[Montserrat] font-[700] text-[24px] text-[#252B42]">
                  the quick fox jumps over
                </h3>
                <p className="font-[Montserrat] font-[400] mt-4 text-[14px] text-[#737373] leading-6">
                  Met minim Mollie non desert Alamo est sit cliquey dolor do met sent...
                </p>
                <p className="font-[Montserrat] font-[400] mt-4 text-[14px] text-[#737373] leading-6">
                  Met minim Mollie non desert Alamo est sit cliquey dolor do met sent...
                </p>
                <p className="font-[Montserrat] font-[400] mt-4 text-[14px] text-[#737373] leading-6">
                  Met minim Mollie non desert Alamo est sit cliquey dolor do met sent...
                </p>
              </div>
              <div className="w-[332px]">
                <h3 className="font-[Montserrat] font-[700] text-[24px] text-[#252B42]">
                  the quick fox jumps over
                </h3>
                <ul className="mt-5 space-y-2">
                  <li className="flex items-center">
                    <Image alt="arrow" width={10} height={10} src={"/vector.png"} />
                    <span className="ml-2 text-[#737373]">the quick fox jumps over the lazy dog</span>
                  </li>
                  <li className="flex items-center">
                    <Image alt="arrow" width={10} height={10} src={"/vector.png"} />
                    <span className="ml-2 text-[#737373]">the quick fox jumps over the lazy dog</span>
                  </li>
                  <li className="flex items-center">
                    <Image alt="arrow" width={10} height={10} src={"/vector.png"} />
                    <span className="ml-2 text-[#737373]">the quick fox jumps over the lazy dog</span>
                  </li>
                  <li className="flex items-center">
                    <Image alt="arrow" width={10} height={10} src={"/vector.png"} />
                    <span className="ml-2 text-[#737373]">the quick fox jumps over the lazy dog</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bestseller Products Section */}
        <div className="max-w-screen-2xl mx-auto bg-[#FAFAFA] py-10">
          <div className="px-4">
            <h3 className="font-[Montserrat] font-[700] text-[24px] text-[#252B42] pl-10 mb-5">
              BESTSELLER PRODUCTS
            </h3>
            <hr className="border-b-2 mx-auto max-w-lg" />
            <div className="max-w-screen-xls mx-auto">
             <ProductList />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Blog;
