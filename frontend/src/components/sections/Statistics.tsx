import { motion } from "framer-motion";
import { StatCard } from "../ui/StatCard";

interface StatisticsProps {
  stats: {
    totalUrls: number;
    totalClicks: number;
    todayUrls: number;
  };
  isDark: boolean;
}

export const Statistics = ({ stats, isDark }: StatisticsProps) => (
  <motion.div
    className="space-y-4"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6, duration: 0.8 }}
  >
    <h2
      className={`text-xl font-bold mb-4 ${
        isDark ? "text-white" : "text-neutral-800"
      }`}
    >
      Statistics
    </h2>

    <div className="grid grid-cols-1 gap-4">
      <StatCard
        title="URLs Created"
        value={stats.totalUrls}
        icon="🔗"
        isDark={isDark}
      />
      <StatCard
        title="Total Clicks"
        value={stats.totalClicks}
        icon="👆"
        isDark={isDark}
      />
      <StatCard
        title="Today's URLs"
        value={stats.todayUrls}
        icon="📅"
        isDark={isDark}
      />
    </div>
  </motion.div>
);
