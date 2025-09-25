"use client";
import { motion } from "motion/react";

import HeroWrapper from "./hero-wrapper";

import React from "react";

import HeroText from "./hero-text";
import ServicesSlider from "./ServicesSlider";

export default function Hero() {
  return (
    <HeroWrapper>
      <motion.div className="container grid grid-cols-1 md:grid-cols-2 items-center min-h-dvh md:min-h-[90dvh] gap-10 pt-12 md:pt-0 pb-4 md:pb-0">
        <HeroText />
        <ServicesSlider />
      </motion.div>
    </HeroWrapper>
  );
}
