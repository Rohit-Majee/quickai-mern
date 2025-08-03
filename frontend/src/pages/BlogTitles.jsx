import { Edit, Hash, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Markdown from "react-markdown";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const BlogTitles = () => {
  const blogCategories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [generatedTitle, setGeneratedTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("General");
  const { getToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const prompt = `Generate a blog title for the keyword ${input} in catagory ${selectedCategory}`;
      const { data } = await axiosInstance.post(
        "/ai/generate-blog-title",
        {
          prompt,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setGeneratedTitle(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 lg:px-20 font-sans">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-10">
        {/* Left Column: Config */}
        <div className="lg:col-span-3 bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="text-indigo-600 w-6 h-6" />
              <h1 className="text-2xl font-bold text-gray-900">
                AI Blog Title Generator
              </h1>
            </div>

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Keyword / Topic
            </label>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              required
              placeholder="e.g. AI in Healthcare"
              className="w-full px-4 py-3 mb-6 text-sm border rounded-lg bg-gray-50 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Select a Category
            </label>
            <div className="flex gap-2 flex-wrap mb-8">
              {blogCategories.map((item, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => setSelectedCategory(item)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition shadow-sm duration-200 
                    ${
                      selectedCategory === item
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-100"
                    } focus:outline-none`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 px-5 py-3 rounded-lg text-white font-semibold text-sm bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 transition-all shadow-lg"
            >
              {loading ? (
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white border-opacity-80" />
              ) : (
                <Hash className="w-4 h-4" />
              )}
              {loading ? "Generating..." : "Generate Title"}
            </button>
          </form>
        </div>

        {/* Right Column: Result */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Hash className="text-indigo-600 w-5 h-5" />
            <h2 className="text-xl font-semibold text-gray-900">
              Generated Title
            </h2>
          </div>

          <div className="overflow-y-auto max-h-[600px]">
            <AnimatePresence mode="wait">
              {generatedTitle ? (
                <motion.div
                  key="output"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="reset-tw">
                    <Markdown>{generatedTitle}</Markdown>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-gray-500 mt-2"
                >
                  <p>
                    # Enter a topic and click <strong>Generate Title</strong> to
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

export default BlogTitles;
