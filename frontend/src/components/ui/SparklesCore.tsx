import { motion } from "framer-motion";

interface SparklesCoreProps {
  isDark: boolean;
}

export const SparklesCore = ({ isDark }: SparklesCoreProps) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 20 }).map((_, i) => (
      <motion.div
        key={i}
        className={`absolute w-1 h-1 ${
          isDark ? "bg-neutral-400" : "bg-neutral-600"
        } rounded-full`}
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 8 + Math.random() * 4,
          repeat: Infinity,
          delay: Math.random() * 5,
          ease: "easeInOut",
        }}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      />
    ))}
  </div>
);
