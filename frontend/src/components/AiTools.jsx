import React from "react";
import { AiToolsData } from "../assets/assets";
import { Navigate, useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";

const AiTools = () => {
  const navigate = useNavigate();
  const user = useUser();
  return (
    <div className="px-4 my-24 sm:px-20 xl:px-32">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
          Powerful <span className="text-indigo-600">AI Tools</span>
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Everything you need to create, enhance, and optimize your content
          using cutting-edge AI technology.
        </p>
      </div>

      {/* Cards Section */}
      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            className="group rounded-2xl bg-white p-6 shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer border border-gray-100"
            onClick={() => user && navigate(tool.path)}
          >
            {/* Icon */}
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 transition">
              <tool.Icon size={28} />
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition">
              {tool.title}
            </h3>

            {/* Description */}
            <p className="mt-2 text-gray-600 text-sm leading-relaxed">
              {tool.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiTools;
