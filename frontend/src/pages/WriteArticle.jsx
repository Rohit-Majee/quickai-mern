import { Edit, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Markdown from "react-markdown";
import { useAuth } from "@clerk/clerk-react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const WriteArticle = () => {
  const articleLengthOptions = [
    { value: 800, text: "Short (500–800 words)" },
    { value: 1200, text: "Medium (800–1200 words)" },
    { value: 1600, text: "Long (1200+ words)" },
  ];

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [generatedArticle, setGeneratedArticle] = useState("");
  const [selectedLength, setSelectedLength] = useState(articleLengthOptions[0]);

  const { getToken } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const prompt = `Write an article about ${input} in ${selectedLength.text}`;
      const { data } = await axiosInstance.post(
        "/ai/generate-article",
        {
          prompt,
          length: selectedLength.lenght,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setGeneratedArticle(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6 items-start p-6 bg-slate-50 min-h-screen">
      {/* Left: Form */}
      <div className="w-full lg:w-2/5 bg-white p-6 rounded-3xl shadow-xl border border-slate-200">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="text-indigo-600 w-6 h-6" />
            <h2 className="text-2xl font-bold text-gray-800">
              Article Generator
            </h2>
          </div>

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Article Topic
          </label>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            required
            placeholder="e.g., The Rise of AI in Healthcare"
            className="w-full px-4 py-2 mb-6 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Select Length
          </label>
          <div className="flex gap-2 flex-wrap mb-8">
            {articleLengthOptions.map((item, index) => {
              const isSelected = selectedLength?.value === item.value;
              return (
                <button
                  type="button"
                  key={index}
                  onClick={() => setSelectedLength(item)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition duration-200 
                  ${
                    isSelected
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-indigo-50"
                  }`}
                >
                  {item.text}
                </button>
              );
            })}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-semibold text-sm
            bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600
            disabled:opacity-50 transition-all duration-200 shadow-lg"
          >
            {loading ? (
              <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white border-opacity-80" />
            ) : (
              <Edit className="w-4 h-4" />
            )}
            {loading ? "Generating..." : "Generate Article"}
          </button>
        </form>
      </div>

      {/* Right: Output */}
      <div className="w-full lg:w-3/5 bg-white p-6 rounded-3xl shadow-xl border border-slate-200 min-h-[400px] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center gap-2 mb-4">
          <Edit className="text-indigo-600 w-5 h-5" />
          <h2 className="text-xl font-bold text-gray-800">Generated Article</h2>
        </div>

        <AnimatePresence mode="wait">
          {generatedArticle ? (
            <motion.div
              key="output"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="reset-tw">
                <Markdown>{generatedArticle}</Markdown>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-500 mt-4 flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              <p className="text-sm">
                Enter a topic and select a length to generate your article.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WriteArticle;
