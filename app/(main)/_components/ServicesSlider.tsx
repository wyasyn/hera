"use client";
import React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  IconChevronLeft,
  IconChevronRight,
  IconPlayerPause,
  IconPlayerPlay,
} from "@tabler/icons-react";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { serviceSlides } from "@/constants/staticData";
import { ANIMATION_DELAYS, fadeUp } from "./hero-text";

// Constants for better maintainability
const SLIDER_INTERVAL = 6000; // Increased to give more time to read service info

const serviceCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ServicesSlider() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoadStates, setImageLoadStates] = useState<boolean[]>(
    new Array(serviceSlides.length).fill(false)
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Enhanced slider logic with pause on hover
  const startSlider = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % serviceSlides.length);
    }, SLIDER_INTERVAL);
  }, []);

  const stopSlider = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % serviceSlides.length);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrent(
      (prev) => (prev - 1 + serviceSlides.length) % serviceSlides.length
    );
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Effect for auto-play management
  useEffect(() => {
    if (isPlaying && !isHovered) {
      startSlider();
    } else {
      stopSlider();
    }

    return () => stopSlider();
  }, [isPlaying, isHovered, startSlider, stopSlider]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target !== document.body) return;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          goToPrevious();
          break;
        case "ArrowRight":
          event.preventDefault();
          goToNext();
          break;
        case " ":
          event.preventDefault();
          togglePlayPause();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious, togglePlayPause]);

  // Handle image load states
  const handleImageLoad = useCallback((index: number) => {
    setImageLoadStates((prev) => {
      const newStates = [...prev];
      newStates[index] = true;
      return newStates;
    });
  }, []);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        delay: ANIMATION_DELAYS.slider,
        duration: 0.9,
        ease: "easeOut",
      }}
      className="relative w-full h-[540px] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Service showcase carousel"
    >
      {/* Main Container with Full Background Image */}
      <div className="relative w-full h-full rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        {/* Full Background Image */}
        <div className="absolute inset-0 w-full h-full">
          {serviceSlides.map((service, index) => (
            <motion.div
              key={service.src}
              initial={{ opacity: 0 }}
              animate={{
                opacity: index === current ? 1 : 0,
                scale: index === current ? 1 : 1.1,
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              {!imageLoadStates[index] && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse" />
              )}
              <Image
                src={service.src}
                alt={service.alt}
                fill
                className="object-cover transition-transform duration-700"
                priority={index === 0}
                quality={90}
                sizes="(max-width: 768px) 100vw, 50vw"
                onLoad={() => handleImageLoad(index)}
              />
              {/* Enhanced gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
            </motion.div>
          ))}
        </div>

        {/* Service Icon - Top Left */}
        <div className="absolute top-6 left-6 z-10">
          <motion.div
            key={current}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg"
          >
            {React.createElement(serviceSlides[current].icon, {
              className: "w-7 h-7 text-white",
            })}
          </motion.div>
        </div>

        {/* Play/Pause Control - Top Right */}
        <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="outline"
            size="icon"
            onClick={togglePlayPause}
            className="bg-white/10 backdrop-blur-md hover:bg-white/20 hover:scale-110 transition-all shadow-lg border-white/20 text-white hover:text-white"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <IconPlayerPause className="w-4 h-4" />
            ) : (
              <IconPlayerPlay className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Navigation Controls - Center */}
        <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            className="bg-white/10 backdrop-blur-md hover:bg-white/20 hover:scale-110 transition-all shadow-lg border-white/20 text-white hover:text-white"
            aria-label="Previous service"
          >
            <IconChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="bg-white/10 backdrop-blur-md hover:bg-white/20 hover:scale-110 transition-all shadow-lg border-white/20 text-white hover:text-white"
            aria-label="Next service"
          >
            <IconChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Gradient Transition Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-5" />

        {/* Content Section - Bottom with Compact Design */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          {/* Compact backdrop blur container */}
          <div className="bg-gradient-to-t from-black/40 via-black/25 to-transparent backdrop-blur-md px-6 md:px-8 pb-4 pt-8">
            <motion.div
              key={current}
              variants={serviceCardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-3"
            >
              {/* Compact Title Section */}
              <div className="space-y-1">
                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                  {serviceSlides[current].title}
                </h3>
                <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
              </div>

              {/* Compact Description */}
              <p className="text-gray-200 text-sm leading-relaxed max-w-2xl line-clamp-2">
                {serviceSlides[current].description}
              </p>

              {/* Compact Feature Tags */}
              <motion.div
                key={`features-${current}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex flex-wrap gap-1.5 mt-2"
              >
                {serviceSlides[current].features
                  .slice(0, 4)
                  .map((feature, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.05 * idx,
                        ease: "easeOut",
                      }}
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/15 text-white border border-white/20 backdrop-blur-sm hover:scale-105 transition-transform cursor-default hover:bg-white/25"
                    >
                      {feature}
                    </motion.span>
                  ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Service Navigation Dots - Smaller and Lower */}
          <div className="flex items-center justify-center space-x-2 pb-3 bg-gradient-to-t from-black/30 to-transparent">
            {serviceSlides.map((service, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`group relative transition-all duration-300 ${
                  index === current ? "scale-110" : "hover:scale-105"
                }`}
                aria-label={`View ${service.title}`}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === current
                      ? "bg-gradient-to-r from-blue-400 to-purple-400 shadow-md shadow-blue-400/20"
                      : "bg-white/30 group-hover:bg-white/50"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Progress Bar - Bottom Edge */}
          <div className="h-0.5 bg-black/10 relative">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 shadow-sm shadow-blue-400/30"
              initial={{ width: "0%" }}
              animate={{
                width: isPlaying && !isHovered ? "100%" : "0%",
              }}
              transition={{
                duration:
                  isPlaying && !isHovered ? SLIDER_INTERVAL / 1000 : 0.3,
                ease: "linear",
                repeat: isPlaying && !isHovered ? Infinity : 0,
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
