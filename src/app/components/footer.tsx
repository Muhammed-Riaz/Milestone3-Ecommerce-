import React from "react";
import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";

function Footer() {
  return (
    <footer className="mt-20 font-sans">
      {/* Top Section */}
      <div className="max-w-[1440px] mx-auto px-6 py-8 bg-[#FAFAFA] ">
        <div className="max-w-[1050px] mx-auto lg:flex flex-wrap justify-between items-center">
          <h1 className="text-[#252B42] font-bold text-[24px]">Bandage</h1>
          {/* Social Icons */}
          <div className="flex gap-5 items-center mt-4 lg:mt-0">
            <CiFacebook fill="#23A6F0" size={30} />
            <FaInstagram fill="#23A6F0" size={30} />
            <CiTwitter fill="#23A6F0" size={30} />
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="mt-10">
        <div className="max-w-[1050px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 px-6">
          {/* Column 1 */}
          <div>
            <h2 className="text-2xl font-bold text-[#252B42]">Company Info</h2>
            <ul className="text-[#737373] font-bold text-[14px] mt-4 space-y-2">
              <li>About Us</li>
              <li>Carrier</li>
              <li>We are hiring</li>
              <li>Blog</li>
            </ul>
          </div>
          {/* Column 2 */}
          <div>
            <h2 className="text-2xl font-bold text-[#252B42]">Legal</h2>
            <ul className="text-[#737373] font-bold text-[14px] mt-4 space-y-2">
              <li>About Us</li>
              <li>Carrier</li>
              <li>We are hiring</li>
              <li>Blog</li>
            </ul>
          </div>
          {/* Column 3 */}
          <div>
            <h2 className="text-2xl font-bold text-[#252B42]">Features</h2>
            <ul className="text-[#737373] font-bold text-[14px] mt-4 space-y-2">
              <li>Business Marketing</li>
              <li>User Analytic</li>
              <li>Live Chat</li>
              <li>Unlimited Support</li>
            </ul>
          </div>
          {/* Column 4 */}
          <div>
            <h2 className="text-2xl font-bold text-[#252B42]">Resources</h2>
            <ul className="text-[#737373] font-bold text-[14px] mt-4 space-y-2">
              <li>iOS & Android</li>
              <li>Watch a Demo</li>
              <li>Customers</li>
              <li>API</li>
            </ul>
          </div>
          {/* Column 5 */}
          <div>
            <h2 className="text-2xl font-bold text-[#252B42]">Get In Touch</h2>
            <div className="mt-4">
              <div className="flex items-center w-[250px] lg:w-[321px] h-[58px] border-2 rounded overflow-hidden">
                <input
                  type="text"
                  className="flex-grow py-[10px] lg:px-[20px] px-5 w-[120px] lg:w-[150px] h-[28px] text-[#737373]  placeholder-gray-500"
                  placeholder="Your Email"
                />
                <button className="bg-[#23A6F0] rounded-[5px] w-[121px] h-[58px] text-white ">Subscribe</button>
              </div>
              <p className="text-[#737373] mt-3 text-sm">
                Lorem ipsum dolor sit amet.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#FAFAFA] mt-12">
        <div className="max-w-[1440px] mx-auto px-6 py-4">
          <p className="text-center font-bold text-[14px] text-[#737373]">
            Made With Love By Finland | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
