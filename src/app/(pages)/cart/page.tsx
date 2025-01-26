"use client";
import Image from "next/image";
import { useCart } from "../context/cartcontext";
import Link from "next/link";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total: number = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (

    <section>

      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Your Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center mt-8">
            <p className="text-lg text-gray-600">Your cart is empty.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Desktop Table */}
            <div className="hidden md:block shadow-lg rounded-lg overflow-hidden font-sans">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-center">
                    <th className="py-3 px-4 border-b ">Name</th>
                    <th className="py-3 px-4 border-b ">Price</th>
                    <th className="py-3 px-4 border-b ">Quantity</th>
                    <th className="py-3 px-4 border-b text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {cart.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      
                      <td className="py-3 flex max-w-44 mx-auto item-center gap-5">
                      <Image
                      className="object-cover rounded w-[50px] h-[50px]"
                       src={item.image} width={100} height={100} alt="product">
                      </Image>
                        <p className="text-start w-[100px]">{item.name}</p></td>
                      <td className="h-[50px] py-3 px-4  ">${item.price}</td>
                      <td className="py-3 px-4flex items-center justify-center space-x-2 h-[50px]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-gray-300 text-black py-1 px-2 rounded hover:bg-gray-400 transition duration-200 shadow-sm"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-300 text-black py-1 px-2 rounded hover:bg-gray-400 transition duration-200 shadow-sm"
                        >
                          +
                        </button>
                      </td>
                      <td className="py-3 px-4  text-left">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200 shadow-sm"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4 bg-white shadow-md"
                >
                  <div className="mb-2">
                    <span className="font-bold text-gray-700">Name:</span> {item.name}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold text-gray-700">Price:</span> ${item.price}
                  </div>
                  <div className="mb-2 flex items-center space-x-2">
                    <span className="font-bold text-gray-700">Quantity:</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-300 text-black py-1 px-2 rounded hover:bg-gray-400 transition duration-200 shadow-sm"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-300 text-black py-1 px-2 rounded hover:bg-gray-400 transition duration-200 shadow-sm"
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200 shadow-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Price Section */}
            <div className="mt-6 p-4 bg-white shadow-lg rounded-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Total Summary</h2>
              <div className="flex justify-between items-center">
                <span className="text-lg text-gray-600">Total Price:</span>
                <span className="text-2xl font-bold text-green-600">${total.toFixed(2)}</span>
              </div>
            <Link href={"/checkout"}>
            <button 
                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 shadow-lg"
              >
                Checkout
              </button>
            </Link>
            </div>
          </div>
        )}
      </div>
     
    </section>
  );
};

export default CartPage;

