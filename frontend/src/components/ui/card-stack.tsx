"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";

interface CardStackProps {
  items: {
    id: string;
    content: React.ReactNode;
    name: string;
    designation: string;
    image: string;
  }[];
  offset?: number;
  scaleFactor?: number;
  className?: string;
}

export const CardStack: React.FC<CardStackProps> = ({
  items,
  offset = 10,
  scaleFactor = 0.06,
  className,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hoveredIndex !== null) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [hoveredIndex]);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-[400px] w-full max-w-md mx-auto", className)}
    >
      {items.map((item, index) => {
        const isHovered = hoveredIndex === index;
        const isAbove = hoveredIndex !== null && index < hoveredIndex;
        const isBelow = hoveredIndex !== null && index > hoveredIndex;

        return (
          <div
            key={item.id}
            className={cn(
              "absolute inset-0 transition-all duration-300 ease-out",
              isHovered && "z-10",
              isAbove && "z-0",
              isBelow && "z-0"
            )}
            style={{
              transform: `translateY(${index * offset}px) scale(${
                1 - index * scaleFactor
              })`,
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={cn(
                "relative w-full h-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300",
                isHovered && "shadow-2xl scale-105",
                isAbove && "opacity-60 -translate-y-2",
                isBelow && "opacity-60 translate-y-2"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100" />
              <div className="relative z-10 p-6 h-full flex flex-col">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.designation}</p>
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Example usage component
export const ExampleCardStack: React.FC = () => {
  const items = [
    {
      id: "1",
      name: "John Doe",
      designation: "Frontend Developer",
      image: "/api/placeholder/60/60",
      content: (
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">1.2M</div>
          <div className="text-gray-600">URLs Shortened</div>
        </div>
      ),
    },
    {
      id: "2",
      name: "Jane Smith",
      designation: "Backend Engineer",
      image: "/api/placeholder/60/60",
      content: (
        <div className="text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">99.9%</div>
          <div className="text-gray-600">Uptime</div>
        </div>
      ),
    },
    {
      id: "3",
      name: "Mike Johnson",
      designation: "DevOps Engineer",
      image: "/api/placeholder/60/60",
      content: (
        <div className="text-center">
          <div className="text-4xl font-bold text-purple-600 mb-2">50ms</div>
          <div className="text-gray-600">Average Response</div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <CardStack items={items} />
    </div>
  );
};
