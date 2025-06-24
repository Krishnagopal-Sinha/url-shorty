import { motion } from "framer-motion";

interface HeaderProps {
  isDark: boolean;
}

export const Header = ({ isDark }: HeaderProps) => (
  <motion.div
    className="text-center mb-16"
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    <motion.h1
      className={`text-5xl md:text-7xl font-bold mb-6 ${
        isDark ? "text-white" : "text-neutral-800"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      URL Shawty
    </motion.h1>
    <motion.p
      className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${
        isDark ? "text-neutral-400" : "text-neutral-600"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
    >
      Transform long URLs into clean, shareable links instantly.
    </motion.p>
  </motion.div>
);
