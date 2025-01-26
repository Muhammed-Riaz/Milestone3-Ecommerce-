"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "../context/cartcontext";
import Link from "next/link";

const Checkout: React.FC = () => {
  const { cart } = useCart();

  const total: number = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col lg:flex-row p-6 bg-slate-50 gap-6">
      {/* Order Summary */}
      {cart.length === 0 ? (
        <div className="text-center w-full mt-8">
          <p className="text-lg text-gray-600">Your cart is empty!</p>
        </div>
      ) : (
        <div className="lg:w-1/2 w-full bg-white p-5 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-[#737373]">Order Summary</h2>

          <div className="space-y-4 h-auto">
            {cart.map((product) => (
              <div key={product.id} className="flex justify-between items-center border-b pb-4">
                <div className="flex gap-4 items-center">
                  <Image
                    className="object-cover rounded w-[50px] h-[50px]"
                    src={product.image}
                    width={100}
                    height={100}
                    alt="product"
                  />
                  <h3 className="font-semibold text-sm md:text-base">{product.name}</h3>
                </div>
                <p className="text-[#737373] font-semibold">${product.price.toFixed(2)}</p>
              </div>
            ))}
            <div className="mt-4 font-bold flex justify-between text-xl py-5 text-[#737373]">
              <span>Total:</span> <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* User Information Form */}
      <div className="lg:w-1/2 w-full bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-[#737373]">User Information</h2>

        <form className="space-y-4">
          <div>
            <label className="block mb-1 font-bold text-[#737373]">Name</label>
            <input
              type="text"
              className="border rounded w-full p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter Your Name"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-bold text-[#737373]">Email</label>
            <input
              type="email"
              className="border rounded w-full p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-bold text-[#737373]">Address</label>
            <input
              type="text"
              className="border rounded w-full p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter Your Address"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-bold text-[#737373]">Phone Number</label>
            <input
              type="tel"
              className="border rounded w-full p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter Your Phone Number"
              required
            />
          </div>

          <Link href="/form">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 w-full mt-5 rounded transition duration-300"
            >
              Place Order
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
