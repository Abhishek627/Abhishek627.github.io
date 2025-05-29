
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "blog", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }

      // Special case for hero section
      if (window.scrollY < 100) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 80;
        const offsetTop = element.offsetTop - headerHeight;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
    }
  };

  const scrollToNextSection = () => {
    scrollToSection("about");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header activeSection={activeSection} onSectionChange={scrollToSection} />
      
      <div id="home">
        <Hero onScrollToNext={scrollToNextSection} />
      </div>
      
      <div id="about">
        <About />
      </div>
      
      <div id="projects">
        <Projects />
      </div>
      
      <div id="blog">
        <Blog />
      </div>
      
      <div id="contact">
        <Contact />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
