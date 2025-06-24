import { motion } from "framer-motion";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggle = ({ isDark, onToggle }: ThemeToggleProps) => (
  <motion.button
    onClick={onToggle}
    className="fixed top-6 right-6 z-50 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.6 }}
  >
    <motion.div
      animate={{ rotate: isDark ? 180 : 0 }}
      transition={{ duration: 0.3 }}
      className="text-xl"
    >
      {isDark ? "🌙" : "☀️"}
    </motion.div>
  </motion.button>
);
