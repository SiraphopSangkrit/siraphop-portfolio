"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from 'react-icons/md';
interface HeroContent {
  name?: string;
  title?: string;
  subtitle?: string;
  description?: string;
}

interface ContactContent {
  email?: string;
  linkedin?: string;
  github?: string;
}
export default function Hero() {
  const [content, setContent] = useState<HeroContent>({
    name: "Siraphop Sangkrit",
    title: "Software Developer",
    subtitle: "",
    description:
      "I create beautiful, functional, and user-centered digital experiences. Passionate about clean code and innovative solutions.",
  });

  const [contact, setContact] = useState<ContactContent>({
    email: "your.email@example.com",
    linkedin: "linkedin.com/in/yourprofile",
    github: "github.com/yourusername"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeroContent();
    fetchContactContent();
  }, []);

 const fetchContactContent = async () => {
    try {
      const response = await fetch('/api/content');
      const result: { success: boolean; data: { contact: ContactContent } } = await response.json();
      
      if (result.success && result.data.contact) {
        setContact(prevContent => ({ ...prevContent, ...result.data.contact }));
      }
    } catch (error: unknown) {
      console.error('Error fetching contact content:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHeroContent = async () => {
    try {
      const response = await fetch("/api/content");
      const result: { success: boolean; data: { hero: HeroContent } } =
        await response.json();

      if (result.success && result.data.hero) {
        setContent(result.data.hero);
      }
    } catch (error: unknown) {
      console.error("Error fetching hero content:", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <section
        id="home"
        className="min-h-screen items-center justify-center px-4 pt-16"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="min-h-screen items-center justify-center px-4 pt-16 mt-14 "
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 relative bg-linear-to-br from-blue-500 to-purple-600 rounded-full overflow-hidden">
            <Image
              src="/96740d03-eb0b-415e-88fd-b8f2bc4f2091.jpg"
              alt="Profile Picture"
              width={128}
              height={128}
              className="rounded-full object-cover w-full h-full"
              priority
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            {/* Fallback initials if image doesn't load */}
            <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
              {content.name
                ?.split(" ")
                .map((n) => n[0])
                .join("") || "SS"}
            </div>
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Hi, I&apos;m{" "}
          <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {content.name || "Siraphop Sangkrit"}
          </span>
        </h1>
        <p className="text-2xl font-bold text-gray-600 dark:text-gray-300 mb-8">
          {content.title || "Software Developer"}
          {content.subtitle && ` ${content.subtitle}`}
        </p>
        <div className="mb-8 flex justify-center gap-6">
          <a href={`mailto:${contact.email}`} target="_blank" rel="noopener noreferrer">
            <MdEmail className="w-12 h-12 text-white" />
          </a>
          <a href={`https://${contact.github}`} target="_blank" rel="noopener noreferrer">
            <FaGithub className="w-12 h-12 text-white" />
          </a>
          <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="w-12 h-12 text-white" />
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => scrollToSection("#projects")}
            className="px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            View My Work
          </Button>
          <Button
            onClick={() => scrollToSection("#contact")}
            className="px-8 py-6 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
          >
            Get In Touch
          </Button>
        </div>

        <div className="mt-12 flex justify-center gap-3">
         <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg'} alt="Laravel" width={64} height={64} />
         <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg'} alt="React" width={64} height={64} />
         <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg'} alt="Node.js" width={64} height={64} />
         <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg'} alt="TypeScript" width={64} height={64} />
         <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg'} alt="JavaScript" width={64} height={64} />
         <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg'} alt="JavaScript" width={64} height={64} />
         
        </div>
      </div>
    </section>
  );
}
