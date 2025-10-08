'use client';
import { useState, useEffect } from 'react';

interface Skill {
  _id: string;
  name: string;
  category: string;
  level: number;
  order: number;
}

interface SkillsByCategory {
  frontend: Skill[];
  backend: Skill[];
  tools: Skill[];
}

export default function Skills() {
  const [skills, setSkills] = useState<SkillsByCategory>({
    frontend: [],
    backend: [],
    tools: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/skills');
      const result = await response.json();
      
      if (result.success) {
        setSkills(result.data);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'frontend':
        return {
          title: 'Frontend',
          description: 'Modern frameworks and libraries for building interactive UIs',
          color: 'blue',
          icon: (
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          )
        };
      case 'backend':
        return {
          title: 'Backend',
          description: 'Server-side technologies and database management',
          color: 'green',
          icon: (
            <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
          )
        };
      case 'tools':
        return {
          title: 'Tools & DevOps',
          description: 'Development tools and deployment technologies',
          color: 'purple',
          icon: (
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          )
        };
      default:
        return {
          title: 'Other',
          description: 'Additional skills and technologies',
          color: 'gray',
          icon: <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        };
    }
  };

  const renderSkillLevel = (level: number) => {
    return (
      <div className="flex items-center space-x-1 mt-1">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full ${
              i < level ? 'bg-current' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
        <span className="text-xs ml-2 opacity-70">({level}/10)</span>
      </div>
    );
  };

  if (loading) {
    return (
      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, categorySkills]) => {
            const info = getCategoryInfo(category);
            const colorClasses = {
              blue: {
                bg: 'bg-blue-100 dark:bg-blue-900',
                text: 'text-blue-600 dark:text-blue-400'
              },
              green: {
                bg: 'bg-green-100 dark:bg-green-900',
                text: 'text-green-600 dark:text-green-400'
              },
              purple: {
                bg: 'bg-purple-100 dark:bg-purple-900',
                text: 'text-purple-600 dark:text-purple-400'
              },
              gray: {
                bg: 'bg-gray-100 dark:bg-gray-900',
                text: 'text-gray-600 dark:text-gray-400'
              }
            }[info.color] || {
              bg: 'bg-gray-100 dark:bg-gray-900',
              text: 'text-gray-600 dark:text-gray-400'
            };

            return (
              <div key={category} className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <div className={`w-16 h-16 ${colorClasses.bg} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  <svg className={`w-8 h-8 ${colorClasses.text}`} fill="currentColor" viewBox="0 0 20 20">
                    {info.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {info.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {info.description}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {categorySkills
                    .sort((a: Skill, b: Skill) => a.order - b.order)
                    .map((skill: Skill) => (
                    <div key={skill._id} className="group relative">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                        {skill.name}
                       
                      </span>
                     
                      
                    </div>
                  ))}
                  {categorySkills.length === 0 && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                      No skills in this category yet.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}