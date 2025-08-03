import React from "react";
import { MoveRight } from "lucide-react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router";
import { useUser, useClerk, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo / Website Name */}
        <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
          <img
            src={assets.logo}
            alt="logo"
            className="w-32 sm:w-44 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            Get Started
            <MoveRight size={18} />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
