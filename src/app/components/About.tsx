'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface AboutContent {
  title?: string;
  subtitle?: string;
  story?: string;
  technologies?: string[];
  facts?: string[];
}

interface Skill {
  _id: string;
  name: string;
  category: string;
  level: number;
  order: number;
}

interface Experience {
  _id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  location: string;
  technologies: string[];
  achievements: string[];
  order: number;
}

export default function About() {
  const [content, setContent] = useState<AboutContent>({
    title: 'About Me',
    subtitle: "I'm a passionate developer with expertise in modern web technologies and a keen eye for design.",
    story: 'With over 3 years of experience in web development, I specialize in creating responsive, user-friendly applications using modern frameworks and technologies.',
    technologies: [],
    facts: ['3+ years of experience', '20+ projects completed', 'Always learning new technologies', 'Open source contributor']
  });
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutContent();
    fetchSkills();
    fetchExperiences();
  }, []);

  const fetchAboutContent = async () => {
    try {
      const response = await fetch('/api/content');
      const result: { success: boolean; data: { about: AboutContent } } = await response.json();
      
      if (result.success && result.data.about) {
        setContent(prevContent => ({ ...prevContent, ...result.data.about }));
      }
    } catch (error: unknown) {
      console.error('Error fetching about content:', error);
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/skills');
      const result: { success: boolean; data: Record<string, Skill[]> } = await response.json();
      
      if (result.success) {
        // Get top skills from each category for the About section
        const topSkills: string[] = [];
        Object.values(result.data).forEach((categorySkills: Skill[]) => {
          const sortedSkills = categorySkills
            .sort((a: Skill, b: Skill) => b.level - a.level)
            .slice(0, 3); // Top 3 from each category
          topSkills.push(...sortedSkills.map((skill: Skill) => skill.name));
        });
        
        setContent(prevContent => ({ 
          ...prevContent, 
          technologies: topSkills.slice(0, 8) // Limit to 8 total skills
        }));
      }
    } catch (error: unknown) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchExperiences = async () => {
    try {
      const response = await fetch('/api/experiences');
      const result: { success: boolean; data: Experience[] } = await response.json();
      
      if (result.success) {
        setExperiences(result.data.slice(0, 3)); // Show only top 3 experiences
      }
    } catch (error: unknown) {
      console.error('Error fetching experiences:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  if (loading) {
    return (
      <section id="about" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 ">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              My Story
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {content.story}
            </p>
            
            
            <div className="flex flex-wrap gap-2 mb-8">
             {/* Experience Section */}
        {experiences.length > 0 && (
          <div className="mt-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 ">
              Experience
            </h3>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={exp._id} className="relative">
                  {/* Timeline connector */}
                  {index < experiences.length - 1 && (
                    <div className="absolute left-4 top-16 w-0.5 h-full bg-gray-300 dark:bg-gray-600"></div>
                  )}
                  
                  <div className="flex gap-6">
                    {/* Timeline dot */}
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        exp.current 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                      }`}>
                        <div className="w-3 h-3 rounded-full bg-current"></div>
                      </div>
                    </div>
                    
                    {/* Experience content */}
                    <div className="flex-grow bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                            {exp.position}
                          </h4>
                          <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                            {exp.company}
                          </p>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 sm:mt-0">
                          <p>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate!)}</p>
                          <p>{exp.location}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {exp.description}
                      </p>
                      
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className="mb-4">
                          <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                            Key Achievements:
                          </h5>
                          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                            {exp.achievements.map((achievement, idx) => (
                              <li key={idx}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span 
                            key={tech}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
            </div>
          </div>
          <div>
            <Image src="/96740d03-eb0b-415e-88fd-b8f2bc4f2091.jpg" alt="About Me" width={500} height={500} />
          </div>
        </div>

        
      </div>
    </section>
  );
}