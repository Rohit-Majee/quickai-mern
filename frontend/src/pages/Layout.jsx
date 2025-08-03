import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { SignIn, useUser } from "@clerk/clerk-react";

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();
  return user ? (
    <div className="flex flex-col items-start h-screen">
      {/* Sidebar */}

      {/* Main area */}

      {/* Navbar (fixed at top) */}
      <nav className="h-14 px-8 flex items-center justify-between border-b border-gray-200 bg-white shadow-sm fixed top-0 left-0 right-0 z-30">
        <img
          src={assets.logo}
          alt="logo"
          className="cursor-pointer w-32 sm:w-44"
          onClick={() => navigate("/")}
        />
        {sidebar ? (
          <X
            className="w-6 h-6 sm:hidden cursor-pointer"
            onClick={() => setSidebar(false)}
          />
        ) : (
          <Menu
            className="w-6 h-6 sm:hidden cursor-pointer"
            onClick={() => setSidebar(true)}
          />
        )}
      </nav>
      <div className="flex-1 w-full flex">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        {/* Page content */}
        <main className="flex-1 bg-[#F4F7FB] overflow-y-auto pt-14 sm:ml-64 transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <SignIn />
    </div>
  );
};

export default Layout;
