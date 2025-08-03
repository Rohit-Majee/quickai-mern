import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-12 w-full text-gray-500 bg-gray-50">
      <div className="flex flex-col md:flex-row justify-between w-full gap-12 border-b border-gray-300/30 pb-8">
        {/* Brand Section */}
        <div className="md:max-w-md">
          <img
            src={assets.logo}
            alt="logo"
            className="w-32 sm:w-44 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <p className="mt-6 text-sm leading-relaxed">
            Experience the power of AI With QuickAI. Transform your content
            creation exprience with our suite of premium AI tools.Write
            articles, generate images and enhance your workflow.
          </p>
        </div>

        {/* Links & Newsletter */}
        <div className="flex-1 flex flex-col md:flex-row md:justify-end gap-16">
          {/* Links */}
          <div>
            <h2 className="font-semibold mb-4 text-gray-800">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#" className="hover:text-indigo-600 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="font-semibold text-gray-800 mb-4">
              Subscribe to our Newsletter
            </h2>
            <p className="text-sm mb-4">
              Get the latest news, articles, and resources delivered weekly.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none w-full max-w-xs h-10 rounded-md px-3"
              />
              <button className="bg-indigo-600 text-white px-4 h-10 rounded-md hover:bg-indigo-500 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <p className="pt-6 text-center text-xs md:text-sm text-gray-400">
        © 2024{" "}
        <a href="https://prebuiltui.com" className="hover:text-indigo-600">
          PrebuiltUI
        </a>
        . All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
