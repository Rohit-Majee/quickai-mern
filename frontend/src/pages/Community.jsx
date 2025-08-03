import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Heart } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const Community = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const { getToken } = useAuth();
  const fetchCreations = async () => {
    try {
      const { data } = await axiosInstance.get(
        "/user/get-published-creations",
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

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

  const imageLikeToggel = async (id) => {
    try {
      const { data } = await axiosInstance.post(
        "/user/toggle-like-creation",
        { id },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        await fetchCreations();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  return (
    <div className="flex flex-col flex-1 h-full p-6 bg-gray-50 rounded-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Creations</h2>

      {loading ? (
        // Loading State (Spinner)
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500 border-opacity-70"></div>
        </div>
      ) : creations.length === 0 ? (
        // Empty State
        <div className="flex flex-col justify-center items-center h-60 text-gray-500">
          <p className="text-sm">
            No creations found. Start creating something!
          </p>
        </div>
      ) : (
        // Creations Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
          {creations.map((creation, index) => (
            <div
              key={index}
              className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition bg-white"
            >
              {/* Image */}
              <img
                src={creation.content}
                alt={`creation-${index}`}
                className="w-full h-60 object-cover"
              />

              {/* Hover Overlay with Prompt */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-60 transition">
                <p className="text-white text-sm font-medium text-center px-4">
                  {creation.prompt}
                </p>
              </div>

              {/* Like Section */}
              <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-sm shadow-sm">
                <Heart
                  onClick={() => imageLikeToggel(creation.id)}
                  className={`w-4 h-4 transition ${
                    creation.likes.includes(user.id)
                      ? "fill-red-500 text-red-600"
                      : "text-gray-400 hover:text-red-500"
                  }`}
                />
                <span className="text-gray-700 font-medium">
                  {creation.likes.length}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Community;
