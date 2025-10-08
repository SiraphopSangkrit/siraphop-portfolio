'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface HeroContent {
  name?: string;
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function Hero() {
  const [content, setContent] = useState<HeroContent>({
    name: 'Siraphop Sangkrit',
    title: 'Full Stack Developer',
    subtitle: '',
    description: 'I create beautiful, functional, and user-centered digital experiences. Passionate about clean code and innovative solutions.'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeroContent();
  }, []);

  const fetchHeroContent = async () => {
    try {
      const response = await fetch('/api/content');
      const result: { success: boolean; data: { hero: HeroContent } } = await response.json();
      
      if (result.success && result.data.hero) {
        setContent(result.data.hero);
      }
    } catch (error: unknown) {
      console.error('Error fetching hero content:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-full overflow-hidden">
            <Image 
              src="/96740d03-eb0b-415e-88fd-b8f2bc4f2091.jpg" 
              alt="Profile Picture" 
              width={128} 
              height={128} 
              className="rounded-full object-cover w-full h-full" 
              priority
              onError={(e) => {
                // Fallback to gradient background if image fails to load
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Fallback initials if image doesn't load */}
            <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
              {content.name?.split(' ').map(n => n[0]).join('') || 'SS'}
            </div>
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Hi, I'm <span className="text-blue-600 dark:text-blue-400">{content.name || 'Siraphop Sangkrit'}</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
          {content.title || 'Full Stack Developer'}{content.subtitle && ` ${content.subtitle}`}
        </p>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          {content.description || 'I create beautiful, functional, and user-centered digital experiences. Passionate about clean code and innovative solutions.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => scrollToSection('#projects')}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            View My Work
          </button>
          <button 
            onClick={() => scrollToSection('#contact')}
            className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
}