import { PricingTable } from "@clerk/clerk-react";
import React from "react";

const Plan = () => {
  return (
    <div className="max-w-2xl mx-auto z-20 my-30">
      {/* Heading */}
      <div className="text-center mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Choose Your <span className="text-indigo-600">Plan</span>
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Start for free and scale up as you grow. Find the perfect plan for
          your content creation needs.
        </p>
      </div>

      {/* Pricing Table */}
      <div className="mt-14 max-sm:mx-8">
        <PricingTable />
      </div>
    </div>
  );
};

export default Plan;
