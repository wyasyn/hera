"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const tags = [
  { label: "Full Stack Development", icon: "💻" },
  { label: "AI & Machine Learning", icon: "🤖" },
  { label: "Fast Execution", icon: "⚡" },
  { label: "Problem Solving", icon: "🧩" },
];

// Container animation for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

// Each tag's entry animation
const tagVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

// Responsive corner positions - mobile styles for screens < 990px
const getCornerPositions = () => [
  {
    // Top-left - responsive positioning
    position:
      "absolute top-4 left-4 lg:top-0 lg:left-0 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2",
    rotation: -15,
    transformOrigin: "center",
  },
  {
    // Top-right - responsive positioning
    position:
      "absolute top-4 right-4 lg:top-0 lg:right-0 lg:transform lg:translate-x-1/2 lg:-translate-y-1/2",
    rotation: 15,
    transformOrigin: "center",
  },
  {
    // Bottom-left - responsive positioning
    position:
      "absolute bottom-4 left-4 lg:bottom-0 lg:left-0 lg:transform lg:-translate-x-1/2 lg:translate-y-1/2",
    rotation: 12,
    transformOrigin: "center",
  },
  {
    // Bottom-right - responsive positioning
    position:
      "absolute bottom-4 right-4 lg:bottom-0 lg:right-0 lg:transform lg:translate-x-1/2 lg:translate-y-1/2",
    rotation: -18,
    transformOrigin: "center",
  },
];

// Animated background blur patches
const BackgroundBlurs = () => {
  const blurPatches = [
    {
      className: "absolute -top-24 -left-24 w-32 h-32 lg:w-48 lg:h-48",
      color: "bg-blue-400/20 dark:bg-blue-500/15",
      delay: 0,
      duration: 8,
    },
    {
      className: "absolute -top-16 -right-16 w-28 h-28 lg:w-40 lg:h-40",
      color: "bg-purple-400/20 dark:bg-purple-500/15",
      delay: 1,
      duration: 10,
    },
    {
      className: "absolute -bottom-24 -left-32 w-36 h-36 lg:w-52 lg:h-52",
      color: "bg-emerald-400/20 dark:bg-emerald-500/15",
      delay: 2,
      duration: 12,
    },
    {
      className: "absolute -bottom-20 -right-24 w-24 h-24 lg:w-36 lg:h-36",
      color: "bg-amber-400/20 dark:bg-amber-500/15",
      delay: 0.5,
      duration: 9,
    },
    {
      className: "absolute top-1/2 left-1/4 w-20 h-20 lg:w-32 lg:h-32",
      color: "bg-rose-400/20 dark:bg-rose-500/15",
      delay: 1.5,
      duration: 11,
    },
    {
      className: "absolute top-1/3 right-1/3 w-16 h-16 lg:w-28 lg:h-28",
      color: "bg-indigo-400/20 dark:bg-indigo-500/15",
      delay: 2.5,
      duration: 7,
    },
  ];

  return (
    <div className="absolute -inset-32 pointer-events-none">
      {blurPatches.map((patch, i) => (
        <motion.div
          key={i}
          className={cn(
            patch.className,
            patch.color,
            "rounded-full blur-xl opacity-60"
          )}
          initial={{
            scale: 0.8,
            opacity: 0,
            x: Math.random() * 40 - 20,
            y: Math.random() * 40 - 20,
          }}
          animate={{
            scale: [0.8, 1.2, 0.9, 1.1, 0.8],
            opacity: [0.4, 0.7, 0.5, 0.6, 0.4],
            x: [
              Math.random() * 40 - 20,
              Math.random() * 60 - 30,
              Math.random() * 40 - 20,
              Math.random() * 50 - 25,
              Math.random() * 40 - 20,
            ],
            y: [
              Math.random() * 40 - 20,
              Math.random() * 60 - 30,
              Math.random() * 40 - 20,
              Math.random() * 50 - 25,
              Math.random() * 40 - 20,
            ],
            rotate: [0, 180, 360, 180, 0],
          }}
          transition={{
            duration: patch.duration,
            delay: patch.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          whileInView={{
            opacity: [0.4, 0.8, 0.4],
            scale: [0.8, 1.3, 0.8],
          }}
        />
      ))}
    </div>
  );
};

export default function AboutIntro() {
  const cornerPositions = getCornerPositions();

  return (
    <section
      aria-labelledby="about-heading"
      className="relative w-full py-20 md:py-34 overflow-hidden"
    >
      {/* Animated Background Blurs */}
      <BackgroundBlurs />

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-transparent to-background/90 pointer-events-none bg-no-repeat" />

      {/* Content container with responsive padding and centered layout */}
      <div className="relative z-10 mx-auto max-w-[700px] text-center px-4 lg:px-6">
        <div className="container mx-auto max-w-3xl px-6 lg:px-8 xl:px-12 py-8 lg:py-12 xl:py-16">
          {/* Heading */}
          <motion.h2
            id="about-heading"
            className="text-2xl lg:text-3xl xl:text-4xl mb-4 text-foreground relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Software Engineer Who Delivers Results
          </motion.h2>

          {/* Paragraph */}
          <motion.p
            className="text-muted-foreground text-base lg:text-lg leading-relaxed max-w-[40ch] mx-auto mb-8 lg:mb-12 relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            I design and build scalable, user-friendly, and intelligent digital
            solutions — combining aesthetics, accessibility, and performance to
            create measurable impact.
          </motion.p>

          {/* Corner Tags Container - with responsive positioning */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-20"
            role="list"
            aria-label="Key skills and strengths"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {tags.map((tag, i) => {
              const corner = cornerPositions[i];
              return (
                <motion.div
                  key={i}
                  role="listitem"
                  className={cn("pointer-events-auto", corner.position)}
                  variants={tagVariants}
                  animate={{
                    rotate: corner.rotation,
                    y: [-5, 5], // Reduced bounce on mobile
                  }}
                  transition={{
                    opacity: { duration: 0.6, ease: "easeOut" },
                    y: {
                      duration: 2.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    },
                    rotate: {
                      duration: 0,
                    },
                  }}
                  style={{ transformOrigin: corner.transformOrigin }}
                  whileHover={{
                    scale: 1.05, // Reduced scale on hover for mobile
                    rotate: corner.rotation + (Math.random() - 0.5) * 8,
                    boxShadow: "0px 6px 16px rgba(0,0,0,0.12)",
                  }}
                  whileTap={{
                    scale: 0.95,
                    rotate: corner.rotation + 3,
                  }}
                >
                  <Badge
                    variant="outline"
                    className="bg-card/80 backdrop-blur-sm px-2 py-1 lg:px-4 lg:py-2 rounded-lg lg:rounded-xl text-xs lg:text-sm font-medium flex items-center gap-1 lg:gap-2 cursor-pointer select-none 
                             transition-all duration-300 hover:bg-primary/20 hover:text-primary hover:backdrop-blur-md whitespace-nowrap
                             max-w-[120px] lg:max-w-none border-white/20 dark:border-white/10
                             shadow-lg hover:shadow-xl" // Enhanced backdrop and shadow
                  >
                    {/* Icon with responsive animation */}
                    <motion.span
                      aria-hidden="true"
                      whileHover={{
                        rotate: [0, -10, 10, -5, 5, 0], // Reduced rotation on mobile
                      }}
                      whileTap={{ scale: 1.1, rotate: 180 }} // Reduced effects
                      transition={{ duration: 0.4 }}
                      className="inline-block text-sm lg:text-base"
                    >
                      {tag.icon}
                    </motion.span>
                    <span className="text-xs lg:text-sm leading-tight">
                      {/* Truncate text on screens smaller than 990px */}
                      <span className="hidden lg:inline">{tag.label}</span>
                      <span className="lg:hidden">
                        {tag.label.split(" ")[0]}{" "}
                        {/* Show only first word on smaller screens */}
                      </span>
                    </span>
                  </Badge>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
