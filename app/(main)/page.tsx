import React from "react";
import Hero from "./_components/hero";
import About from "./_components/about";
import Projects from "./_components/projects";
import Testimonials from "./_components/testimonials";
import Blog from "./_components/blog";
import Clients from "./_components/clients";
import Stats from "./_components/stats";

export default function page() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Testimonials />
      <Blog />
      <Stats />
      <Clients />
    </>
  );
}
