import { useState } from "react";
import { motion } from "framer-motion";

interface StatefulButtonProps {
  children: React.ReactNode;
  onClick: () => Promise<boolean> | void;
  disabled?: boolean;
  className?: string;
  isDark?: boolean;
}

export const StatefulButton = ({
  children,
  onClick,
  disabled = false,
  className = "",
  isDark = false,
}: StatefulButtonProps) => {
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");

  const handleClick = async () => {
    if (disabled || state !== "idle") return;

    setState("loading");
    try {
      const result = await onClick();
      if (result === true) {
        setState("success");
        setTimeout(() => setState("idle"), 2000);
      } else {
        setState("idle");
      }
    } catch (error) {
      setState("idle");
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || state !== "idle"}
      className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 border ${
        state === "idle"
          ? isDark
            ? "bg-neutral-800 text-white border-neutral-700 hover:bg-neutral-700"
            : "bg-neutral-200 text-neutral-800 border-neutral-300 hover:bg-neutral-300"
          : state === "loading"
          ? isDark
            ? "bg-neutral-700 text-white border-neutral-600"
            : "bg-neutral-300 text-neutral-800 border-neutral-400"
          : "bg-emerald-600 text-white border-emerald-500"
      } ${className}`}
    >
      <span
        className={`transition-opacity duration-300 ${
          state === "loading" ? "opacity-0" : "opacity-100"
        }`}
      >
        {state === "success" ? "✓ Success" : children}
      </span>
      {state === "loading" && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full" />
        </motion.div>
      )}
    </button>
  );
};
