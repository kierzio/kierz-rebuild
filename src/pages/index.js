import React from "react";
import Layout from "../components/Layout";
import Hero from "../components/Sections/Hero";
import About from "../components/Sections/About";
import Projects from "../components/Sections/Projects";
import Contact from "../components/Sections/Contact";
import "../styles/global.css";

const IndexPage = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </Layout>
  );
};

export default IndexPage;

export const Head = () => (
  <>
    <title>kierz.io 💎 Creative Digital Experiences</title>
    <meta name="description" content="Portfolio site showcasing creative digital experiences at the intersection of technology and design" />
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet" />
  </>
);