import { motion } from "framer-motion";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesProps {
  isDark: boolean;
}

// feature list
const features: Feature[] = [
  {
    icon: "⚡",
    title: "Fast",
    description: "Instant URL shortening",
  },
  {
    icon: "📊",
    title: "Analytics",
    description: "Track click statistics",
  },
  {
    icon: "🔒",
    title: "Secure",
    description: "Safe and reliable links",
  },
];

export const Features = ({ isDark }: FeaturesProps) => (
  <motion.div
    className={`${
      isDark
        ? "bg-neutral-900/50 border-neutral-800"
        : "bg-white/50 border-neutral-200"
    } backdrop-blur-sm rounded-2xl border p-8`}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.0, duration: 0.8 }}
  >
    <h2
      className={`text-xl font-bold mb-6 text-center ${
        isDark ? "text-white" : "text-neutral-800"
      }`}
    >
      Features
    </h2>
    <div className="grid md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="text-center group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
          whileHover={{ y: -5 }}
        >
          <div
            className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl border ${
              isDark
                ? "bg-neutral-800 border-neutral-700 group-hover:bg-neutral-700"
                : "bg-neutral-100 border-neutral-300 group-hover:bg-neutral-200"
            } transition-colors`}
          >
            {feature.icon}
          </div>
          <h3
            className={`font-bold text-lg mb-2 ${
              isDark ? "text-white" : "text-neutral-800"
            }`}
          >
            {feature.title}
          </h3>
          <p className={isDark ? "text-neutral-400" : "text-neutral-600"}>
            {feature.description}
          </p>
        </motion.div>
      ))}
    </div>
  </motion.div>
);
