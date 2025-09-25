"use client";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { IconMail, IconBriefcase } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export const ANIMATION_DELAYS = {
  intro: 0,
  headline: 0.15,
  subtext: 0.3,
  cta: 0.45,
  slider: 0.2,
};

// Animation variants
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export const slideIn = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

export default function HeroText() {
  return (
    <div className="flex flex-col items-center md:items-start gap-6 text-center md:text-left">
      {/* Intro Badge with enhanced animation */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          delay: ANIMATION_DELAYS.intro,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-lg px-4 py-1 text-sm font-medium border border-white/10 cursor-default"
      >
        <span
          className="animate-wave inline-block origin-[70%_70%]"
          style={{ animationDelay: "1s" }}
        >
          👋
        </span>{" "}
        Hey! I'm{" "}
        <span className="font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Yasin Walum
        </span>
      </motion.div>

      {/* Enhanced Headline */}
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          delay: ANIMATION_DELAYS.headline,
          duration: 0.8,
          ease: "easeOut",
        }}
        className="text-3xl sm:text-5xl lg:text-6xl text-balance leading-tight"
      >
        <span className="block sm:inline">
          <motion.span
            className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Web, mobile & software
          </motion.span>
        </span>
        <span className="block sm:inline"> made simple.</span>
      </motion.h1>

      {/* Enhanced Subtext */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          delay: ANIMATION_DELAYS.subtext,
          duration: 0.8,
          ease: "easeOut",
        }}
        className="max-w-[50ch] text-lg text-muted-foreground leading-relaxed"
      >
        Full-stack engineer specializing in{" "}
        <span className="text-foreground font-medium">web development</span>,{" "}
        <span className="text-foreground font-medium">mobile apps</span>, and{" "}
        <span className="text-foreground font-medium">custom software</span>{" "}
        solutions that drive business growth.
      </motion.p>

      {/* Enhanced CTA Button */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        variants={slideIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          delay: ANIMATION_DELAYS.cta,
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <Button
          asChild
          size="lg"
          className="gap-2 px-8 py-3 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <Link href="/contact" className="group">
            Get In Touch
            <IconMail className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="gap-2 px-8 py-3 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <Link href="/services" className="group">
            See Services
            <IconBriefcase className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
