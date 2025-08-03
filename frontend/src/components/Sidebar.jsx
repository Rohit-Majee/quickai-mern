import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import React from "react";
import { SidebarData } from "../assets/assets";
import { NavLink } from "react-router";
import { LogOut } from "lucide-react";

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div
      className={`fixed top-14 left-0 h-[calc(100%-3.5rem)] w-64 bg-white shadow-xl border-r border-gray-100 z-30 transform ${
        sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
      } transition-transform duration-300 ease-in-out flex flex-col`}
    >
      {/* User Profile Section */}
      <div className="flex flex-col items-center py-8 px-4 border-b border-gray-100">
        <img
          src={user.imageUrl}
          alt="user logo"
          className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500 shadow-md"
        />
        <h1 className="mt-3 text-lg font-semibold text-gray-900">
          {user.fullName}
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 mt-6 px-4 space-y-1 overflow-y-auto">
        {SidebarData.map((tool, index) => (
          <NavLink
            key={index}
            to={tool.path}
            end
            onClick={() => setSidebar(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 ${
                isActive
                  ? "bg-indigo-100 text-indigo-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
              }`
            }
          >
            <tool.Icon className="w-5 h-5" />
            {tool.title}
          </NavLink>
        ))}
      </nav>

      {/* Footer / Account Controls */}
      <div className="border-t border-gray-100 p-4 flex items-center justify-between">
        <div
          onClick={openUserProfile}
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-md p-2 transition"
        >
          <img
            src={user.imageUrl}
            alt="user logo"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h1 className="text-sm font-medium text-gray-800">
              {user.fullName}
            </h1>
            <p className="text-xs text-indigo-600 font-semibold">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect> Plan
            </p>
          </div>
        </div>
        <LogOut
          onClick={signOut}
          className="w-5 h-5 text-gray-500 hover:text-red-500 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Sidebar;
