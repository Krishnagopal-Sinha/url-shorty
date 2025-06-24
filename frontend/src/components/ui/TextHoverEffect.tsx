interface TextHoverEffectProps {
  children: React.ReactNode;
  className?: string;
  isDark?: boolean;
}

export const TextHoverEffect = ({
  children,
  className = "",
  isDark = false,
}: TextHoverEffectProps) => {
  return (
    <div className={`relative group ${className}`}>
      <span
        className={`relative z-10 transition-colors duration-300 ${
          isDark ? "group-hover:text-white" : "group-hover:text-neutral-800"
        }`}
      >
        {children}
      </span>
      <span
        className={`absolute inset-0 bg-gradient-to-r ${
          isDark
            ? "from-neutral-600 to-neutral-400"
            : "from-neutral-300 to-neutral-500"
        } opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg`}
      />
    </div>
  );
};
