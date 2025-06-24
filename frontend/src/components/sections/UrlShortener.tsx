import { motion, AnimatePresence } from "framer-motion";
import { StatefulButton } from "../ui/StatefulButton";

interface UrlShortenerProps {
  url: string;
  shortUrl: string;
  isLoading: boolean;
  isDark: boolean;
  onUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onShorten: () => void;
  onCopy: (text: string) => void;
}

export const UrlShortener = ({
  url,
  shortUrl,
  isLoading,
  isDark,
  onUrlChange,
  onKeyPress,
  onShorten,
  onCopy,
}: UrlShortenerProps) => (
  <motion.div
    className={`${
      isDark
        ? "bg-neutral-900/50 border-neutral-800"
        : "bg-white/50 border-neutral-200"
    } backdrop-blur-sm rounded-2xl border p-8`}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
    whileHover={{ scale: 1.01 }}
  >
    <h2
      className={`text-2xl font-bold mb-4 ${
        isDark ? "text-white" : "text-neutral-800"
      }`}
    >
      Shorten Your URL
    </h2>
    <p className={`mb-6 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
      Enter a long URL below and get a short, shareable link
    </p>

    <div className="flex gap-4 mb-6">
      <input
        type="url"
        placeholder="https://example.com/very-long-url"
        value={url}
        onChange={onUrlChange}
        onKeyPress={onKeyPress}
        className={`flex-1 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent ${
          isDark
            ? "bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500"
            : "bg-white border-neutral-300 text-neutral-800 placeholder-neutral-500"
        } border`}
        disabled={isLoading}
      />
      <StatefulButton onClick={onShorten} disabled={isLoading} isDark={isDark}>
        Shorten
      </StatefulButton>
    </div>

    <AnimatePresence>
      {shortUrl && (
        <motion.div
          className={`p-4 rounded-xl border ${
            isDark
              ? "bg-neutral-800/50 border-neutral-700"
              : "bg-neutral-100/50 border-neutral-300"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <p
            className={`text-sm mb-3 font-medium ${
              isDark ? "text-neutral-300" : "text-neutral-700"
            }`}
          >
            Shortened URL:
          </p>
          <div className="flex items-center gap-3">
            <input
              value={shortUrl}
              readOnly
              className={`flex-1 px-3 py-2 rounded-lg font-mono text-sm ${
                isDark
                  ? "bg-neutral-800 border-neutral-700 text-white"
                  : "bg-white border-neutral-300 text-neutral-800"
              } border`}
            />
            <StatefulButton
              onClick={() => onCopy(shortUrl)}
              className="px-4"
              isDark={isDark}
            >
              Copy
            </StatefulButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);
