import React from "react";
import Hero from "./_components/hero";
import Projects from "./_components/projects";
import Testimonials from "./_components/testimonials";
import Blog from "./_components/blog";
import Clients from "./_components/clients";
import Stats from "./_components/stats";
import AboutMe from "./_components/about";
import Separator from "@/components/separator";

export default function page() {
  return (
    <>
      <Hero />
      <Separator />
      <AboutMe />
      <Separator />
      <Projects />
      <Separator />
      <Testimonials />
      <Separator />
      <Blog />
      <Separator />
      <Stats />
      <Separator />
      <Clients />
      <Separator />
    </>
  );
}
