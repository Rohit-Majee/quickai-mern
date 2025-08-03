import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlus, Sparkles } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { axiosInstance } from "../lib/axios";

const GenerateImages = () => {
  const imageStyles = [
    "Realistic",
    "Ghibli",
    "Cartoon",
    "Anime",
    "Portrait",
    "Fantasy",
    "3D",
  ];
  const [input, setInput] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [generatedImage, setGeneratedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [publish, setPublish] = useState(false);
  const { getToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`;
      const { data } = await axiosInstance.post(
        "/ai/generate-image",
        {
          prompt,
          publish,
        },
        {
          headers: {
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
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-4 py-10 lg:px-16 font-sans">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-10 items-start">
        {/* Configuration Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-md p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="text-indigo-600 w-6 h-6" />
              <h1 className="text-2xl font-semibold text-gray-900">
                AI Image Generator
              </h1>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What do you want to see?
              </label>
              <textarea
                required
                rows={6}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="E.g., A futuristic city on Mars"
                className="w-full px-4 py-3 text-sm border rounded-lg bg-gray-50 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose a Style
              </label>
              <div className="flex flex-wrap gap-2">
                {imageStyles.map((style) => (
                  <button
                    type="button"
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`px-4 py-2 text-sm rounded-full border transition duration-200 font-medium shadow-sm ${
                      selectedStyle === style
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-100"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div className="my-6 flex items-center gap-2">
              <label className="relative cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={publish}
                  onChange={(e) => setPublish(e.target.checked)}
                />
                <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition"></div>
                <span className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
              </label>
              <p className="text-sm">Make this Image Public</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 px-5 py-3 rounded-lg text-white font-semibold text-sm bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 transition-all shadow-lg"
            >
              {loading ? (
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white border-opacity-80" />
              ) : (
                <ImagePlus className="w-4 h-4" />
              )}
              {loading ? "Generating..." : "Generate Image"}
            </button>
          </form>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-3 bg-white rounded-3xl shadow-md p-8 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <ImagePlus className="text-indigo-600 w-5 h-5" />
            <h2 className="text-xl font-semibold text-gray-900">
              Generated Result
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
                  <p className="text-sm">Generating image...</p>
                </motion.div>
              ) : generatedImage ? (
                <motion.img
                  key="image"
                  src={generatedImage}
                  alt="Generated"
                  className="object-cover w-full h-full rounded-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-gray-500 px-4"
                >
                  <p>
                    Enter a topic and click <strong>Generate Image</strong> to
                    get started.
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

export default GenerateImages;
