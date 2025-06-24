import { motion, AnimatePresence } from "framer-motion";
import { LinkPreview } from "../ui/LinkPreview";

interface UrlItem {
  id: string;
  original: string;
  short: string;
  clicks: number;
  created_at: string;
}

interface RecentUrlsProps {
  urls: UrlItem[];
  isDark: boolean;
  onCopy: (text: string) => void;
  onOpenLink: (url: string) => void;
}

export const RecentUrls = ({
  urls,
  isDark,
  onCopy,
  onOpenLink,
}: RecentUrlsProps) => (
  <AnimatePresence>
    {urls.length > 0 && (
      <motion.div
        className={`${
          isDark
            ? "bg-neutral-900/50 border-neutral-800"
            : "bg-white/50 border-neutral-200"
        } backdrop-blur-sm rounded-2xl border p-8 mb-8`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <h2
          className={`text-xl font-bold mb-6 ${
            isDark ? "text-white" : "text-neutral-800"
          }`}
        >
          Recent URLs
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {urls.slice(0, 6).map((urlItem) => (
            <LinkPreview
              key={urlItem.id}
              url={urlItem.short}
              originalUrl={urlItem.original}
              clicks={urlItem.clicks}
              onCopy={onCopy}
              onOpenLink={onOpenLink}
              isDark={isDark}
            />
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
