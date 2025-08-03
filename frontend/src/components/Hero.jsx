import React from "react";
import { useNavigate } from "react-router";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Top Background */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 sm:-top-80 transform-gpu blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-1/2 -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-pink-300 to-indigo-400 opacity-30 w-[72rem] h-[45rem]"
          />
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-32 sm:py-48 lg:py-56 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl">
          Create <span className="text-indigo-600">Amazing</span> Content with
          AI
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl max-w-2xl mx-auto">
          Transform your content creation with premium AI tools. Generate
          articles, design stunning images, and automate your workflow like
          never before.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button onClick={(()=>navigate("/ai"))} className="rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
            Start Creating Now
          </button>
          <button className="rounded-full border border-gray-300 px-6 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 transition duration-300">
            Watch Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
