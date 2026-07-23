'use client';

import About from "../../components/About";
import AIAssistant from "../../components/AIAssistant";
import Contact from "../../components/Contact";
import Education from "../../components/Education";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";
import ProjectsSection from "../../components/ProjectsSection";
import ScrollProgress from "../../components/ScrollProgress";
import Skills from "../../components/Skills";


export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="pt-16">
        <Hero />
        <About />
        <Skills />
        <Education />
        <ProjectsSection />
        <Contact />
      </main>
      <Footer />
      <AIAssistant />
    </>
  );
}