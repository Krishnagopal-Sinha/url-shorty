import { motion } from "framer-motion";
import { TextHoverEffect } from "../ui/TextHoverEffect";

interface EnhancedFooterProps {
  isDark: boolean;
}

export const EnhancedFooter = ({ isDark }: EnhancedFooterProps) => (
  <motion.footer
    className="text-center py-12 relative"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.5, duration: 0.8 }}
  >
    <div className="space-y-4">
      <motion.p
        className={`text-sm transition-all duration-300 ${
          isDark
            ? "text-neutral-500 group-hover:text-neutral-400"
            : "text-neutral-600 group-hover:text-neutral-700"
        }`}
        whileHover={{ scale: 1.02 }}
      >
        Built using React.js & FastAPI
      </motion.p>

      <motion.div
        className="flex items-center justify-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.6 }}
      >
        <span
          className={`text-xs ${
            isDark ? "text-neutral-600" : "text-neutral-500"
          }`}
        >
          Made with ❤️ by
        </span>
        <motion.div
          className="relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            window.open("https://github.com/krishnagopal-sinha", "_blank");
          }}
        >
          <TextHoverEffect
            className={`text-xs font-bold ${
              isDark ? "text-neutral-400" : "text-neutral-600"
            } cursor-pointer`}
            isDark={isDark}
          >
            Krishna
          </TextHoverEffect>
          <motion.div
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ y: 5 }}
            animate={{ y: 0 }}
          >
            <div
              className={`px-2 py-1 rounded-lg text-xs ${
                isDark
                  ? "bg-neutral-800 text-neutral-300 border border-neutral-700"
                  : "bg-white text-neutral-700 border border-neutral-200"
              } shadow-lg backdrop-blur-sm`}
            >
              👨‍💻 Developer
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  </motion.footer>
);
