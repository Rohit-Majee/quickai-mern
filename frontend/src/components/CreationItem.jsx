import { useState } from "react";
import Markdown from "react-markdown";

import { motion, AnimatePresence } from "framer-motion";

function CreationItem({ item }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={`group relative flex flex-col gap-4 p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer ${
        expanded ? "ring-2 ring-indigo-400/30" : ""
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Top Section: Prompt + Metadata + Button */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-base font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {item.prompt}
          </h2>
          <p className="text-sm text-gray-500">
            {item.type} &middot;{" "}
            {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>

        <button
          className="shrink-0 px-4 py-1.5 text-sm font-semibold rounded-md text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-sm hover:shadow-md hover:from-indigo-600 hover:to-purple-600 transition-all duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {item.type}
        </button>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="mt-2">
          {item.type === "image" ? (
            <img
              src={item.content}
              alt="creation"
              className="w-full max-w-md rounded-lg border border-gray-300 shadow-sm"
            />
          ) : (
            <div className="prose max-w-none text-sm text-gray-700">
              <div className="reset-tw">
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CreationItem;
