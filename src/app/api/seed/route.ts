// app/api/seed/route.ts - Seed database with initial content
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Content from '@/lib/models/Content';
import Project from '@/lib/models/Project';
import Skill from '@/lib/models/Skill';
import Experience from '@/lib/models/Experience';

const initialContent = [
  // Hero section
  { section: 'hero', key: 'name', value: 'Siraphop Sangkrit', type: 'text' },
  { section: 'hero', key: 'title', value: 'Full Stack Developer', type: 'text' },
  { section: 'hero', key: 'subtitle', value: '& UI/UX Designer', type: 'text' },
  { section: 'hero', key: 'description', value: 'I create beautiful, functional, and user-centered digital experiences. Passionate about clean code and innovative solutions.', type: 'text' },
  
  // About section
  { section: 'about', key: 'title', value: 'About Me', type: 'text' },
  { section: 'about', key: 'subtitle', value: "I'm a passionate developer with expertise in modern web technologies and a keen eye for design.", type: 'text' },
  { section: 'about', key: 'story', value: 'With over 3 years of experience in web development, I specialize in creating responsive, user-friendly applications using modern frameworks and technologies. I believe in writing clean, maintainable code and creating intuitive user experiences that solve real-world problems.', type: 'text' },
  { section: 'about', key: 'technologies', value: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Docker'], type: 'array' },
  { section: 'about', key: 'facts', value: ['3+ years of experience', '20+ projects completed', 'Always learning new technologies', 'Open source contributor'], type: 'array' },
  
  // Contact section
  { section: 'contact', key: 'title', value: 'Get In Touch', type: 'text' },
  { section: 'contact', key: 'subtitle', value: "I'm always open to discussing new opportunities and interesting projects.", type: 'text' },
  { section: 'contact', key: 'email', value: 'your.email@example.com', type: 'text' },
  { section: 'contact', key: 'linkedin', value: 'linkedin.com/in/yourprofile', type: 'text' },
  { section: 'contact', key: 'github', value: 'github.com/yourusername', type: 'text' },
];

const initialProjects = [
  {
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, product catalog, shopping cart, and payment integration.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Docker'],
    featured: true,
    order: 1,
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates using Socket.io. Users can create projects, assign tasks, and track progress.',
    technologies: ['Next.js', 'Socket.io', 'MongoDB', 'TypeScript'],
    featured: true,
    order: 2,
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    title: 'Portfolio Website',
    description: 'A responsive portfolio website with dark mode, smooth animations, and content management system. Built with modern web technologies.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB'],
    featured: true,
    order: 3,
    demoUrl: '#',
    codeUrl: '#'
  }
];

const initialSkills = [
  // Frontend Skills
  { name: 'React', category: 'frontend', order: 1 },
  { name: 'Next.js', category: 'frontend',  order: 2 },
  { name: 'Vue.js', category: 'frontend', order: 3 },
  { name: 'TypeScript', category: 'frontend', order: 4 },
  { name: 'JavaScript', category: 'frontend' ,order: 5 },
  { name: 'HTML5', category: 'frontend', order: 6 },
  { name: 'CSS3', category: 'frontend',order: 7 },
  { name: 'Tailwind CSS', category: 'frontend' ,order: 8 },
  { name: 'Sass/SCSS', category: 'frontend',order: 9 },
  
  // Backend Skills
  { name: 'Node.js', category: 'backend', order: 1 },
  { name: 'Express.js', category: 'backend', order: 2 },
  { name: 'PHP', category: 'backend', order: 3 },
  { name: 'Laravel', category: 'backend', order: 4 },
  { name: 'Python', category: 'backend', order: 5 },
  { name: 'MongoDB', category: 'backend', order: 6 },
  { name: 'PostgreSQL', category: 'backend', order: 7 },
  { name: 'MySQL', category: 'backend', order: 8 },
  { name: 'Redis', category: 'backend', order: 9 },
  
  // Tools & DevOps
  { name: 'Git', category: 'tools', order: 1 },
  { name: 'GitHub', category: 'tools', order: 2 },
  { name: 'VS Code', category: 'tools',  order: 3 },
  { name: 'Docker', category: 'tools', order: 4 },
  { name: 'AWS', category: 'tools', order: 5 },
  { name: 'Vercel', category: 'tools', order: 6 },
  { name: 'Netlify', category: 'tools', order: 7 },
  { name: 'Figma', category: 'tools', order: 8 },
  { name: 'Postman', category: 'tools', order: 9 },
  { name: 'Jest', category: 'tools', order: 10 },
  { name: 'Webpack', category: 'tools', order: 11 }
];

const initialExperiences = [
  {
    company: 'Tech Solutions Inc.',
    position: 'Senior Full Stack Developer',
    description: 'Led development of scalable web applications using React, Node.js, and PostgreSQL. Mentored junior developers and implemented CI/CD pipelines.',
    startDate: '2022-06-01',
    current: true,
    location: 'Bangkok, Thailand',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    achievements: [
      'Increased application performance by 40%',
      'Led team of 5 developers',
      'Implemented automated testing reducing bugs by 60%'
    ],
    order: 1
  },
  {
    company: 'Digital Agency Co.',
    position: 'Full Stack Developer',
    description: 'Developed responsive web applications and e-commerce platforms for various clients. Collaborated with design teams to implement pixel-perfect UIs.',
    startDate: '2020-03-01',
    endDate: '2022-05-31',
    current: false,
    location: 'Bangkok, Thailand',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'Git'],
    achievements: [
      'Delivered 15+ client projects on time',
      'Improved code quality standards',
      'Reduced development time by 30%'
    ],
    order: 2
  },
  {
    company: 'StartUp Innovations',
    position: 'Junior Developer',
    description: 'Built web applications from concept to deployment. Learned modern development practices and agile methodologies.',
    startDate: '2019-01-01',
    endDate: '2020-02-28',
    current: false,
    location: 'Bangkok, Thailand',
    technologies: ['JavaScript', 'PHP', 'HTML', 'CSS', 'Bootstrap'],
    achievements: [
      'Successfully completed first commercial project',
      'Learned full development lifecycle',
      'Contributed to 10+ features'
    ],
    order: 3
  },
  {
    company: 'Freelance',
    position: 'Web Developer',
    description: 'Worked on various freelance projects including small business websites, landing pages, and web applications. Gained experience in client communication and project management.',
    startDate: '2018-06-01',
    endDate: '2018-12-31',
    current: false,
    location: 'Remote',
    technologies: ['WordPress', 'JavaScript', 'jQuery', 'PHP', 'MySQL'],
    achievements: [
      'Completed 8+ freelance projects',
      'Maintained 100% client satisfaction rate',
      'Developed strong client communication skills'
    ],
    order: 4
  }
];

export async function GET() {
  return NextResponse.json({
    message: 'Seed endpoint is working. Use POST method to seed the database.',
    methods: ['POST']
  });
}

export async function POST() {
  try {
    await connectDB();
    
    // Clear existing data
    await Content.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});
    
    // Seed content
    await Content.insertMany(initialContent);
    
    // Seed projects
    await Project.insertMany(initialProjects);
    
    // Seed skills
    await Skill.insertMany(initialSkills);
    
    // Seed experiences
    const formattedExperiences = initialExperiences.map(exp => ({
      ...exp,
      startDate: new Date(exp.startDate),
      endDate: exp.endDate ? new Date(exp.endDate) : undefined
    }));
    await Experience.insertMany(formattedExperiences);
    
    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      data: {
        contentCount: initialContent.length,
        projectsCount: initialProjects.length,
        skillsCount: initialSkills.length,
        experiencesCount: initialExperiences.length
      }
    });
  } catch (error: unknown) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}