'use client';
import { useState, useEffect } from 'react';

interface ContactContent {
  title?: string;
  subtitle?: string;
  email?: string;
  linkedin?: string;
  github?: string;
}

export default function Contact() {
  const [content, setContent] = useState<ContactContent>({
    title: 'Get In Touch',
    subtitle: "I'm always open to discussing new opportunities and interesting projects.",
    email: 'your.email@example.com',
    linkedin: 'linkedin.com/in/yourprofile',
    github: 'github.com/yourusername'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContactContent();
  }, []);

  const fetchContactContent = async () => {
    try {
      const response = await fetch('/api/content');
      const result: { success: boolean; data: { contact: ContactContent } } = await response.json();
      
      if (result.success && result.data.contact) {
        setContent(prevContent => ({ ...prevContent, ...result.data.contact }));
      }
    } catch (error: unknown) {
      console.error('Error fetching contact content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Let&apos;s Connect
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
              Feel free to reach out if you have any questions or would like to work together.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Email</p>
                  <a 
                    href={`mailto:${content.email}`}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {content.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">LinkedIn</p>
                  <a 
                    href={`https://${content.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {content.linkedin}
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">GitHub</p>
                  <a 
                    href={`https://${content.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {content.github}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}