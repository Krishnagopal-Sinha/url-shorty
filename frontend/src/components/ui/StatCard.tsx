import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  isDark?: boolean;
}

export const StatCard = ({
  title,
  value,
  icon,
  isDark = false,
}: StatCardProps) => (
  <motion.div
    className="relative group"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    whileHover={{ y: -5 }}
  >
    <div
      className={`relative overflow-hidden rounded-2xl ${
        isDark
          ? "bg-neutral-900/50 border-neutral-800"
          : "bg-white/50 border-neutral-200"
      } border p-6 backdrop-blur-sm`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-2xl">{icon}</div>
        <div
          className={`text-sm font-medium ${
            isDark ? "text-neutral-400" : "text-neutral-600"
          }`}
        >
          {title}
        </div>
      </div>
      <div
        className={`text-3xl font-bold mb-1 ${
          isDark ? "text-white" : "text-neutral-800"
        }`}
      >
        {value}
      </div>
      <div
        className={`text-sm ${
          isDark ? "text-neutral-500" : "text-neutral-600"
        }`}
      >
        Total {title.toLowerCase()}
      </div>

      {/* subtle hover effect */}
      <div
        className={`absolute inset-0 ${
          isDark ? "bg-neutral-800/20" : "bg-neutral-200/20"
        } opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
      />
    </div>
  </motion.div>
);
