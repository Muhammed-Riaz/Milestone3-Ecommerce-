"use client";
import Image from "next/image";
import Link from "next/link";
import { EType } from "./query";
import { urlFor } from "@/sanity/lib/image";


interface dataprop {
  data: EType;
}

function Productcard({ data }: dataprop) {
  return (

    <section className="font-sans">

        <div className='max-w-[350px] relative group shadow hover:shadow-xl rounded-xl my-auto max-h-[550px] border px-2 py-2 '>
          

          {/* img */}
          <div className="w-[250] h-[260px] rounded-[6px] overflow-hidden">
            <Image
              src={
                data.image?.asset._ref
                  ? urlFor(data.image.asset._ref).url()
                  : "/No image"
              }
              width={340}
              height={240}
              alt={data.title || "Fallback Image"}
              className="object-cover max-w-[250px] mx-auto h-full rounded-[6px] transition-transform duration-300 transform group-hover:scale-105 "
            />
          </div>


          {/* text  */}

          <div className='max-w-[250px] border hover:shadow-lg rounded mx-auto my-auto max-h-[250px] borde px-3 py-5 mt-2 '>
            <div>
              <p className='text-center pt-2 font-bold text-muted-foreground text-[#252B42]'>{data.slug.current}</p>
              <p className='text-center py-3 text-[#737373] text-md'>{data.title}</p>

              <div className='flex justify-center items-center gap-5'><span className='text-[#BDBDBD] font-bold line-through'>$50.48 </span> <span className='text-[#23856D] text-[24px] font-bold'>{data.price}$</span> </div>

            </div>
            <div className='flex justify-center items-center gap-2 mt-2'>
              <div className='w-[16px] h-[16px] bg-[#23A6F0] rounded-full'></div>
              <div className='w-[16px] h-[16px] bg-[#23856D] rounded-full'></div>
              <div className='w-[16px] h-[16px] bg-[#E77C40] rounded-full'></div>
              <div className='w-[16px] h-[16px] bg-[#252B42] rounded-full'></div>
            </div>
            <Link href={`/product/${data._id}`}>
            <button className="mx-auto w-full mt-2 text-muted-foreground font-bold hover:text-gray-400">View Product</button> </Link>

            <div>
              
            </div>
          </div>
        </div>
     
    </section>
  );
}

export default Productcard;
