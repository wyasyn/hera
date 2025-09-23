"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import HeroWrapper from "./hero-wrapper";
import Link from "next/link";
import {
  IconMail,
  IconChevronLeft,
  IconChevronRight,
  IconPlayerPause,
  IconPlayerPlay,
  IconBriefcase,
  IconCode,
  IconDeviceMobile,
  IconWorld,
  IconNetwork,
} from "@tabler/icons-react";
import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback } from "react";

// Constants for better maintainability
const SLIDER_INTERVAL = 6000; // Increased to give more time to read service info
const ANIMATION_DELAYS = {
  intro: 0,
  headline: 0.15,
  subtext: 0.3,
  cta: 0.45,
  slider: 0.2,
};

// Service-focused image data showcasing your offerings
const serviceSlides = [
  {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Full-stack web development with modern code editor and frameworks",
    title: "Full-Stack Web Development",
    description:
      "End-to-end web applications using React, Node.js, Next.js, and modern databases",
    icon: IconCode,
    features: [
      "Frontend & Backend",
      "Database Design",
      "API Development",
      "Cloud Deployment",
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Mobile app development showing responsive design across devices",
    title: "Mobile App Development",
    description: "Native and cross-platform mobile apps for iOS and Android",
    icon: IconDeviceMobile,
    features: [
      "React Native",
      "iOS & Android",
      "Cross-Platform",
      "App Store Ready",
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1215&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Custom website design with modern UI/UX elements",
    title: "Custom Websites & Software",
    description:
      "Tailored web solutions and custom software built for your specific needs",
    icon: IconWorld,
    features: [
      "Custom Design",
      "E-commerce",
      "CMS Solutions",
      "Business Software",
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1134&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Network infrastructure and server management visualization",
    title: "Networking Services",
    description:
      "Network setup, server management, and infrastructure solutions",
    icon: IconNetwork,
    features: [
      "Network Setup",
      "Server Management",
      "Cloud Infrastructure",
      "Security",
    ],
  },
];

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const slideIn = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

const serviceCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
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
    <HeroWrapper>
      <motion.div className="container grid grid-cols-1 md:grid-cols-2 items-center min-h-dvh md:min-h-[90dvh] gap-10 pt-12 md:pt-0">
        {/* Left Column: Text */}
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
            className="text-4xl sm:text-5xl lg:text-6xl text-balance"
          >
            I help{" "}
            <motion.span
              className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              startups & businesses
            </motion.span>{" "}
            build digital products without overwhelm.
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
            <span className="text-foreground font-medium">web development</span>
            , <span className="text-foreground font-medium">mobile apps</span>,
            and{" "}
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

        {/* Right Column: Enhanced Service Showcase Slider */}
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
          {/* Main Container with Improved Layout */}
          <div className="relative w-full h-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            {/* Image Section - Top Half */}
            <div className="relative w-full h-[280px] overflow-hidden">
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
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </motion.div>
              ))}

              {/* Service Icon Overlay */}
              <div className="absolute top-6 left-6 z-10">
                <motion.div
                  key={current}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-14 h-14 rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg"
                >
                  {React.createElement(serviceSlides[current].icon, {
                    className: "w-7 h-7 text-blue-600 dark:text-blue-400",
                  })}
                </motion.div>
              </div>

              {/* Navigation Controls */}
              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrevious}
                  className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm hover:scale-110 transition-transform shadow-lg border-white/20"
                  aria-label="Previous service"
                >
                  <IconChevronLeft className="w-4 h-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNext}
                  className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm hover:scale-110 transition-transform shadow-lg border-white/20"
                  aria-label="Next service"
                >
                  <IconChevronRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Play/Pause Control */}
              <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={togglePlayPause}
                  className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm hover:scale-110 transition-transform shadow-lg border-white/20"
                  aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                >
                  {isPlaying ? (
                    <IconPlayerPause className="w-4 h-4" />
                  ) : (
                    <IconPlayerPlay className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 dark:bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
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

            {/* Content Section - Bottom Half */}
            <div className="h-[260px] p-8 flex flex-col justify-between">
              {/* Service Title and Description */}
              <motion.div
                key={current}
                variants={serviceCardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-4"
              >
                {/* Title with cool gradient */}
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent leading-tight">
                    {serviceSlides[current].title}
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed max-w-md">
                  {serviceSlides[current].description}
                </p>
              </motion.div>

              {/* Feature Tags */}
              <motion.div
                key={`features-${current}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-3"
              >
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider">
                  Key Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {serviceSlides[current].features.map((feature, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.1 * idx,
                        ease: "easeOut",
                      }}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-100 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300 dark:border-blue-800/50 hover:scale-105 transition-transform cursor-default"
                    >
                      {feature}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Service Navigation Dots */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
            {serviceSlides.map((service, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`group relative transition-all duration-300 ${
                  index === current ? "scale-125" : "hover:scale-110"
                }`}
                aria-label={`View ${service.title}`}
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === current
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/25"
                      : "bg-gray-300 dark:bg-gray-600 group-hover:bg-gray-400 dark:group-hover:bg-gray-500"
                  }`}
                />
                {/* Service Name Indicator */}
                {index === current && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                  >
                    <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-medium rounded-lg px-3 py-1 shadow-lg">
                      {service.title}
                    </div>
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </HeroWrapper>
  );
}
