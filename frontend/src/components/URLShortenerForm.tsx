import { useState } from "react";
import { motion } from "framer-motion";
import { api } from "../services/api";
import type { URLCreate, URLResponse } from "../services/api";
import { toast } from "sonner";

interface URLShortenerFormProps {
  onUrlCreated: (url: URLResponse) => void;
}

export const URLShortenerForm: React.FC<URLShortenerFormProps> = ({
  onUrlCreated,
}) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }
    try {
      new URL(url);
    } catch {
      toast.error("Please enter a valid URL");
      return;
    }
    setIsLoading(true);
    try {
      const urlData: URLCreate = { original_url: url };
      const result = await api.createUrl(urlData);
      onUrlCreated(result);
      setUrl("");
      toast.success("URL shortened successfully!");
    } catch (error) {
      toast.error("Failed to shorten URL. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-center gap-4"
    >
      <div className="w-full relative group">
        {/* Gradient border glassy input */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 rounded-xl blur opacity-40 group-hover:opacity-80 transition duration-700 group-hover:duration-200"></div>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste your long URL here..."
          className="w-full px-5 py-4 text-lg rounded-xl border-2 border-white/40 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 text-gray-900 dark:text-white shadow-md focus:border-purple-400 focus:outline-none transition-colors backdrop-blur-lg"
          disabled={isLoading}
          autoFocus
        />
      </div>
      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isLoading ? (
          <span className="flex items-center gap-2 justify-center">
            <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
            Shortening...
          </span>
        ) : (
          "Shorten URL"
        )}
      </motion.button>
    </motion.form>
  );
};
