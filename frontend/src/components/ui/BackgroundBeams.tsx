interface BackgroundBeamsProps {
  isDark: boolean;
}

export const BackgroundBeams = ({ isDark }: BackgroundBeamsProps) => (
  <div className="absolute inset-0 overflow-hidden">
    <div
      className={`absolute inset-0 ${
        isDark ? "bg-neutral-950" : "bg-neutral-50"
      }`}
    />
    <div
      className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${
        isDark ? "via-neutral-800" : "via-neutral-300"
      } to-transparent`}
    />
    <div
      className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${
        isDark ? "via-neutral-800" : "via-neutral-300"
      } to-transparent`}
    />
    <div
      className={`absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent ${
        isDark ? "via-neutral-800" : "via-neutral-300"
      } to-transparent`}
    />
    <div
      className={`absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent ${
        isDark ? "via-neutral-800" : "via-neutral-300"
      } to-transparent`}
    />
  </div>
);
