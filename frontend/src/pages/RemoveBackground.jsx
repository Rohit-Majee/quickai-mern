import { Eraser, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@clerk/clerk-react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const RemoveBackground = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const { getToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", input);

      const { data } = await axiosInstance.post(
        "/ai/remove-image-background",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setGeneratedImage(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-4 py-10 lg:px-16 font-sans">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-10 items-start">
        {/* Upload Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-md p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-2">
              <Eraser className="text-indigo-600 w-6 h-6" />
              <h1 className="text-2xl font-semibold text-gray-900">
                Background Remover
              </h1>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Image
              </label>
              <label
                htmlFor="fileInput"
                className="flex flex-col items-center justify-center w-full h-48 px-6 py-8 bg-gray-50 border-2 border-dashed rounded-lg transition-all duration-300 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50"
              >
                {input ? (
                  <p className="text-sm text-gray-700">
                    Selected File:{" "}
                    <span className="font-semibold text-indigo-600">
                      {input.name}
                    </span>
                  </p>
                ) : (
                  <>
                    <svg
                      className="w-10 h-10 text-indigo-500 mb-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16v-8m0 0L8 12m4-4l4 4m-7 4h10a2 2 0 002-2V7a2 2 0 00-2-2h-5.172a2 2 0 01-1.414-.586l-1.828-1.828A2 2 0 009.172 2H5a2 2 0 00-2 2v5"
                      />
                    </svg>
                    <p className="text-sm text-gray-600">
                      <span className="text-indigo-600 font-medium underline">
                        Click to browse
                      </span>{" "}
                      or drag and drop
                    </p>
                  </>
                )}
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  required
                  onChange={(e) => setInput(e.target.files[0])}
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Supported formats: JPG, PNG, WebP
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 px-5 py-3 rounded-lg text-white font-semibold text-sm bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 transition-all shadow-lg"
            >
              {loading ? (
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white border-opacity-80" />
              ) : (
                <Eraser className="w-4 h-4" />
              )}
              {loading ? "Processing..." : "Remove Background"}
            </button>
          </form>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-3 bg-white rounded-3xl shadow-md p-8 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Eraser className="text-indigo-600 w-5 h-5" />
            <h2 className="text-xl font-semibold text-gray-900">
              Processed Image
            </h2>
          </div>

          <div className="relative w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-2 text-gray-500"
                >
                  <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-indigo-500 border-opacity-70" />
                  <p className="text-sm">Processing image...</p>
                </motion.div>
              ) : generatedImage ? (
                <motion.div
                  key="image-container"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full"
                >
                  <img
                    src={generatedImage}
                    alt="Processed"
                    className="object-contain w-full h-full rounded-lg"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-gray-500 px-4"
                >
                  <p>
                    Upload an image and click <strong>Remove Background</strong>{" "}
                    to get started.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveBackground;
