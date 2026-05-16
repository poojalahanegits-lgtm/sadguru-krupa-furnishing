import React from "react";
import About from "../components/About";
import Products from "../components/Products";
import Contact from "../components/Contact";

import HeroSection from "../components/HeroSection";
import ProjectsSection from "../components/ProjectsSection";
import Testimonials from "../components/Testimonials";
const Home = () => {
  return (
    <>
      <HeroSection />
      <About />
      <Products />
      <ProjectsSection />
      <Testimonials />
      <Contact />
      {/* <Footer /> */}
    </>
  );
};

export default Home;
