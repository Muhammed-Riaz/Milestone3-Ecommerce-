"use client"; // Mark this component as a Client Component
import React, { useState } from "react";
import { useCart } from "../context/cartcontext";
import axios from "axios";
import { useRouter } from "next/navigation"; // Updated import for App Router
import { client } from "@/sanity/lib/client";
import Image from "next/image";

const Checkout: React.FC = () => {
  const { cart } = useCart();
  const router = useRouter(); // Correctly initialized for App Router
  const total: number = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false); // Loading state for the button

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading
  
    try {
  
      // Save order to Sanity
      const cartWithKeys = cart.map((item) => ({
        ...item,
        _key: item.id || crypto.randomUUID(), // Ensure each item has a unique key
      }));
  
      await client.create({
        _type: "order",
        name: formData.name,
        email: formData.email,
        address: formData.address,
        phone: formData.phone,
        cartItems: cartWithKeys,
        totalAmount: total,
      });
  
  
      // Generate order details for email
      const orderDetails = cart
        .map(
          (item) => `
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${item.quantity} pcs</td>
              <td style="padding: 8px; border: 1px solid #ddd;">$${item.price.toFixed(2)}</td>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">$${(
                item.price * item.quantity
              ).toFixed(2)}</td>
            </tr>
          `
        )
        .join("");
  
      // HTML email message
      const message = `
        <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
          <h2 style="color: #333;">Hello <span style="color: #007bff; font-weight: bold;">${
            formData.name
          }</span>,</h2>
          <p style="color: #555;">
        !Thank you for shopping with us at [<strong style="color: #007bff;>Bandage Online</strong>]! We are thrilled to have you as part of our community. Your order has been successfully placed, and we are working hard to get it to you as soon as possible..</p>
          <h3 style="color: #333;">Order Summary:</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead>
              <tr style="background-color: #f4f4f4;">
                <th style="padding: 10px; border: 1px solid #ddd;">Product</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Quantity</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Price</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${orderDetails}
            </tbody>
          </table>
          <p style="font-size: 18px; color: red; font-weight: bold; margin-top: 15px;">
            Total Amount: $${total.toFixed(2)}
          </p>
          <p style="color: #555;">
            <strong> 📍 Shipping Address:</strong> ${formData.address} <br>
            <strong>📞 Contact Number:</strong> ${formData.phone}
          </p>
          <p style="margin-top: 20px; color: #777;">
            If you have any questions, please contact us at 
            <a href="mailto:support@riazahmedzaur110@gmail.com" style="color: #007bff;">support@riazahmedzaur110@gmail.com</a> 
            or call <strong style="color: #007bff;">📞 +92 340-280071-5</strong>.
          </p>
          <p style="margin-top: 30px; font-weight: bold; color: #333;">Best Regards,</p>
          <p style="color: #007bff; font-weight: bold;">"Riaz" / Student of GIAIC</p>

        </div>
      `;
  
  
      // Send email
      const response = await axios.post("/api/email", {
        email: formData.email,
        name: formData.name,
        message: message,
      });
  
      if (response.status === 200) {
        console.log("Email sent successfully!");
        router.push("/form"); // Redirect after successful order
      } else {
        console.error("Email sending failed:", response.data);
        alert("Order placed, but email sending failed.");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      alert("There was an issue with the order submission.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

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
              <div
                key={product.id}
                className="flex justify-between items-center border-b pb-4"
              >
                <div className="flex gap-4 items-center">
                  <Image
                    className="object-cover rounded w-[50px] h-[50px]"
                    src={product.image}
                    width={100}
                    height={100}
                    alt="product"
                  />
                  <h3 className="font-semibold text-sm md:text-base">
                    {product.name}
                  </h3>
                </div>
                <p className="text-[#737373] font-semibold">
                  ${product.price.toFixed(2)}
                </p>
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
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-bold text-[#737373]">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded w-full p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter Your Name"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-bold text-[#737373]">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded w-full p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-bold text-[#737373]">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border rounded w-full p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter Your Address"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-bold text-[#737373]">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded w-full p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter Your Phone Number"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            } text-white font-bold p-3 w-full mt-5 rounded transition duration-300`}
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;