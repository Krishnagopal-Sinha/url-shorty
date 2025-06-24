import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { URLResponse } from "../services/api";
import { toast } from "sonner";

interface URLListProps {
  urls: URLResponse[];
}

export const URLList: React.FC<URLListProps> = ({ urls }) => {
  const [selectedUrl, setSelectedUrl] = useState<URLResponse | null>(null);

  // Copy short URL to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("URL copied to clipboard!");
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  // Open original URL in new tab
  const handleVisitUrl = (originalUrl: string) => {
    window.open(originalUrl, "_blank");
  };

  if (urls.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="text-gray-500 dark:text-gray-400">
          <p className="text-lg">No URLs shortened yet</p>
          <p className="text-sm mt-2">Create your first short URL above!</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <AnimatePresence>
        {urls.map((url, index) => (
          <motion.div
            key={url.id}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="relative group"
          >
            {/* Gradient border glassy card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 rounded-2xl blur opacity-40 group-hover:opacity-80 transition duration-700 group-hover:duration-200"></div>
            <div className="relative bg-white/80 dark:bg-gray-900/80 rounded-2xl p-6 shadow-xl border border-white/30 dark:border-gray-700 backdrop-blur-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white text-lg truncate">
                      {url.short_url}
                    </span>
                    <button
                      onClick={() => copyToClipboard(url.short_url)}
                      className="ml-2 text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200"
                      title="Copy URL"
                    >
                      📋
                    </button>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 break-all">
                    {url.original_url}
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:items-end">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {url.clicks} clicks
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date(url.created_at).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => setSelectedUrl(url)}
                      className="px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 text-xs font-medium shadow"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => handleVisitUrl(url.original_url)}
                      className="px-3 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-800 text-xs font-medium shadow"
                    >
                      Visit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      {/* Modal for preview */}
      <AnimatePresence>
        {selectedUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            onClick={() => setSelectedUrl(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white/90 dark:bg-gray-900/90 rounded-2xl p-8 max-w-lg w-full shadow-2xl backdrop-blur-lg border border-white/30 dark:border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                URL Preview
              </h3>
              <div className="mb-4">
                <div className="mb-2">
                  <span className="block text-xs text-gray-500 mb-1">
                    Short URL
                  </span>
                  <span className="block text-sm font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded break-all">
                    {selectedUrl.short_url}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-gray-500 mb-1">
                    Original URL
                  </span>
                  <span className="block text-sm font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded break-all">
                    {selectedUrl.original_url}
                  </span>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setSelectedUrl(null)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Close
                </button>
                <button
                  onClick={() => handleVisitUrl(selectedUrl.original_url)}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Visit URL
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
