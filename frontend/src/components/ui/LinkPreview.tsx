import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StatefulButton } from "./StatefulButton";

interface LinkPreviewProps {
  url: string;
  originalUrl: string;
  clicks: number;
  onCopy: (text: string) => void;
  onOpenLink: (url: string) => void;
  isDark?: boolean;
}

export const LinkPreview = ({
  url,
  originalUrl,
  clicks,
  onCopy,
  onOpenLink,
  isDark = false,
}: LinkPreviewProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`${
          isDark
            ? "bg-neutral-900/50 border-neutral-800 hover:bg-neutral-900/70"
            : "bg-white/50 border-neutral-200 hover:bg-white/70"
        } backdrop-blur-sm rounded-2xl border p-6 transition-all duration-300`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span
              className={`text-sm ${
                isDark ? "text-neutral-300" : "text-neutral-600"
              }`}
            >
              Active
            </span>
          </div>
          <span
            className={`text-xs ${
              isDark
                ? "bg-neutral-800 text-neutral-300 border-neutral-700"
                : "bg-neutral-200 text-neutral-600 border-neutral-300"
            } px-2 py-1 rounded-full border`}
          >
            {clicks} clicks
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <p
              className={`text-xs ${
                isDark ? "text-neutral-500" : "text-neutral-600"
              } mb-1`}
            >
              Original URL
            </p>
            <p
              className={`text-sm ${
                isDark ? "text-neutral-300" : "text-neutral-700"
              } truncate`}
            >
              {originalUrl}
            </p>
          </div>

          <div>
            <p
              className={`text-xs ${
                isDark ? "text-neutral-500" : "text-neutral-600"
              } mb-1`}
            >
              Shortened URL
            </p>
            <p
              className={`text-sm font-mono ${
                isDark ? "text-neutral-200" : "text-neutral-800"
              } truncate`}
            >
              {url}
            </p>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <StatefulButton
            onClick={() => onOpenLink(url)}
            className="flex-1"
            isDark={isDark}
          >
            Open Link
          </StatefulButton>
          <StatefulButton
            onClick={() => onCopy(url)}
            className="px-4"
            isDark={isDark}
          >
            Copy
          </StatefulButton>
        </div>
      </div>

      {/* link preview overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full z-50"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={`${
                isDark
                  ? "bg-neutral-900/95 border-neutral-800"
                  : "bg-white/95 border-neutral-200"
              } backdrop-blur-xl rounded-xl p-4 shadow-2xl border max-w-xs`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                <span
                  className={`text-xs ${
                    isDark ? "text-neutral-300" : "text-neutral-600"
                  } font-medium`}
                >
                  Preview
                </span>
              </div>
              <p
                className={`text-xs ${
                  isDark ? "text-neutral-400" : "text-neutral-500"
                } truncate mb-2`}
              >
                {originalUrl}
              </p>
              <div className="flex items-center justify-between text-xs">
                <span
                  className={isDark ? "text-neutral-500" : "text-neutral-600"}
                >
                  Clicks: {clicks}
                </span>
                <span className="text-emerald-400">Redirects to</span>
              </div>
            </div>
            <div
              className={`w-2 h-2 ${
                isDark ? "bg-neutral-900/95" : "bg-white/95"
              } transform rotate-45 mx-auto -mt-1`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
