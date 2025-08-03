import React, { useState, useEffect } from "react";
import { GemIcon, Sparkles } from "lucide-react";
import { Protect, useAuth } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getToken } = useAuth();

  const getDashboardData = async () => {
    try {
      const { data } = await axiosInstance.get("/user/get-user-creations", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="h-full overflow-y-auto p-6 bg-[#F9FAFB]">
      {/* Overview Cards */}
      {loading ? (
        // Skeleton Loader for Cards
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-5 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
              <div className="h-8 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {/* Total Creations */}
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl shadow-md p-5 flex items-center justify-between hover:shadow-lg transition">
            <div>
              <p className="text-sm opacity-90">Total Creations</p>
              <h2 className="text-3xl font-bold">{creations.length}</h2>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Active Plan */}
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white rounded-xl shadow-md p-5 flex items-center justify-between hover:shadow-lg transition">
            <div>
              <p className="text-sm opacity-90">Active Plan</p>
              <h2 className="text-xl font-bold">
                <Protect plan="premium" fallback="Free">
                  Premium
                </Protect>
              </h2>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <GemIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      )}

      {/* Recent Creations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Creations
        </h3>

        {loading ? (
          // Skeleton Loader for Recent Creations
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-16 bg-gray-200 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        ) : creations.length > 0 ? (
          <div className="space-y-4">
            {creations.map((item) => (
              <CreationItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-gray-500">
            <p className="text-sm">No creations found yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
