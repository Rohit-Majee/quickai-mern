import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Edit, FileText } from "lucide-react";
import Markdown from "react-markdown";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuth } from "@clerk/clerk-react";

const ResumeReviewer = () => {
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generatedResume, setGeneratedResume] = useState("");
  const { getToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input || input.type !== "application/pdf") {
      toast.error("Please upload a valid PDF resume.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", input);

      const { data } = await axiosInstance.post("/ai/review-resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setGeneratedResume(data.content);
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
            {/* Title */}
            <div className="flex items-center gap-2">
              <Sparkles className="text-indigo-600 w-6 h-6" />
              <h1 className="text-2xl font-semibold text-gray-900">
                Resume Reviewer
              </h1>
            </div>

            {/* File Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Resume (PDF)
              </label>
              <label
                htmlFor="fileInput"
                className="flex flex-col items-center justify-center w-full h-48 px-6 py-8 bg-gray-50 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 border-gray-300 hover:border-indigo-500 hover:shadow-md text-center"
              >
                {input ? (
                  <p className="text-sm text-gray-700">
                    Selected File:{" "}
                    <span
                      className="font-semibold text-indigo-600 truncate inline-block max-w-[180px] sm:max-w-[250px]"
                      title={input.name}
                    >
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
                      or drag & drop
                    </p>
                  </>
                )}
                <input
                  id="fileInput"
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => setInput(e.target.files[0])}
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Accepted format: PDF only
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 px-5 py-3 rounded-lg text-white font-semibold text-sm bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 transition-all shadow-lg"
            >
              {loading ? (
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white border-opacity-80" />
              ) : (
                <Edit className="w-4 h-4" />
              )}
              {loading ? "Reviewing..." : "Review Resume"}
            </button>
          </form>
        </div>

        {/* Feedback Output */}
        <div className="lg:col-span-3 bg-white rounded-3xl shadow-md p-8 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="text-indigo-600 w-5 h-5" />
            <h2 className="text-xl font-semibold text-gray-900">
              Resume Feedback
            </h2>
          </div>

          {/* Scrollable Output */}
          <div className="relative w-full h-[400px] bg-gray-50 rounded-lg p-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center gap-2 text-gray-500"
                >
                  <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-indigo-500 border-opacity-70" />
                  <p className="text-sm">Analyzing your resume...</p>
                </motion.div>
              ) : generatedResume ? (
                <motion.div
                  key="output"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="reset-tw">
                    <Markdown>{generatedResume}</Markdown>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-gray-500 flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  <p className="text-sm">
                    Upload a PDF resume and click <strong>Review Resume</strong>{" "}
                    to receive AI-powered feedback.
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

export default ResumeReviewer;
