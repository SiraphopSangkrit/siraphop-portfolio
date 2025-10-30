
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { BackgroundBeams} from "@/components/ui/background-beams";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <BackgroundBeams />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      </>
  );
}
