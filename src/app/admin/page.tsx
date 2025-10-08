// app/admin/page.tsx - Admin dashboard for content management
'use client';
import { useState, useEffect } from 'react';

interface ContentData {
  hero?: any;
  about?: any;
  skills?: any;
  projects?: any;
  contact?: any;
}

interface Project {
  _id?: string;
  title: string;
  description: string;
  image?: string;
  demoUrl?: string;
  codeUrl?: string;
  technologies: string[];
  featured: boolean;
  order: number;
}

interface Skill {
  _id?: string;
  name: string;
  category: string;
  level: number;
  order: number;
}

interface Experience {
  _id?: string;
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

export default function AdminPage() {
  const [content, setContent] = useState<ContentData>({});
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [activeTab, setActiveTab] = useState('content');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchContent();
    fetchProjects();
    fetchSkills();
    fetchExperiences();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content');
      const result = await response.json();
      if (result.success) {
        // Ensure each section has some default structure
        const defaultContent = {
          hero: {
            title: result.data.hero?.title || 'Your Name',
            subtitle: result.data.hero?.subtitle || 'Your Title',
            description: result.data.hero?.description || 'A brief description about yourself',
            ...result.data.hero
          },
          about: {
            title: result.data.about?.title || 'About Me',
            story: result.data.about?.story || 'Tell your story here...',
            technologies: result.data.about?.technologies || ['React', 'Node.js', 'TypeScript'],
            ...result.data.about
          },
          contact: {
            email: result.data.contact?.email || 'your.email@example.com',
            phone: result.data.contact?.phone || '+1 (555) 123-4567',
            location: result.data.contact?.location || 'Your City, Country',
            ...result.data.contact
          }
        };
        setContent(defaultContent);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const result = await response.json();
      if (result.success) {
        setProjects(result.data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/skills');
      const result = await response.json();
      if (result.success) {
        // Flatten grouped skills into array
        const skillsArray = Object.values(result.data).flat() as Skill[];
        setSkills(skillsArray);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const fetchExperiences = async () => {
    try {
      const response = await fetch('/api/experiences');
      const result = await response.json();
      if (result.success) {
        setExperiences(result.data);
      }
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  const updateContent = async (section: string, key: string, value: any) => {
    setSaving(true);
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, key, value })
      });
      
      const result = await response.json();
      if (result.success) {
        setMessage('Content updated successfully!');
        fetchContent();
      } else {
        setMessage('Error updating content');
      }
    } catch (error) {
      setMessage('Error updating content');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const saveProject = async (project: Project) => {
    setSaving(true);
    try {
      const method = project._id ? 'PUT' : 'POST';
      const url = project._id ? `/api/projects/${project._id}` : '/api/projects';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      });
      
      const result = await response.json();
      if (result.success) {
        setMessage('Project saved successfully!');
        fetchProjects();
      } else {
        setMessage('Error saving project');
      }
    } catch (error) {
      setMessage('Error saving project');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    setSaving(true);
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      if (result.success) {
        setMessage('Project deleted successfully!');
        fetchProjects();
      } else {
        setMessage('Error deleting project');
      }
    } catch (error) {
      setMessage('Error deleting project');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const saveExperience = async (experience: Experience) => {
    setSaving(true);
    try {
      const method = experience._id ? 'PUT' : 'POST';
      const url = experience._id ? `/api/experiences/${experience._id}` : '/api/experiences';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(experience)
      });
      
      const result = await response.json();
      if (result.success) {
        setMessage('Experience saved successfully!');
        fetchExperiences();
      } else {
        setMessage('Error saving experience');
      }
    } catch (error) {
      setMessage('Error saving experience');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const deleteExperience = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    
    setSaving(true);
    try {
      const response = await fetch(`/api/experiences/${id}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      if (result.success) {
        setMessage('Experience deleted successfully!');
        fetchExperiences();
      } else {
        setMessage('Error deleting experience');
      }
    } catch (error) {
      setMessage('Error deleting experience');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-lg">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Portfolio Admin Panel
          </h1>
          
          {message && (
            <div className={`p-4 rounded-lg ${
              message.includes('Error') 
                ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' 
                : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
            }`}>
              {message}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {['content', 'projects', 'skills', 'experiences'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="space-y-8">
            <ContentEditor 
              section="hero" 
              data={content.hero || {}} 
              onUpdate={updateContent}
              saving={saving}
            />
            <ContentEditor 
              section="about" 
              data={content.about || {}} 
              onUpdate={updateContent}
              saving={saving}
            />
            <ContentEditor 
              section="contact" 
              data={content.contact || {}} 
              onUpdate={updateContent}
              saving={saving}
            />
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <ProjectsManager 
            projects={projects}
            onSave={saveProject}
            onDelete={deleteProject}
            saving={saving}
          />
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <SkillsManager 
            skills={skills}
            onRefresh={fetchSkills}
            saving={saving}
          />
        )}

        {/* Experiences Tab */}
        {activeTab === 'experiences' && (
          <ExperiencesManager 
            experiences={experiences}
            onSave={saveExperience}
            onDelete={deleteExperience}
            saving={saving}
          />
        )}
      </div>
    </div>
  );
}

// Content Editor Component
function ContentEditor({ 
  section, 
  data, 
  onUpdate, 
  saving 
}: { 
  section: string; 
  data: any; 
  onUpdate: (section: string, key: string, value: any) => void;
  saving: boolean;
}) {
  const [localData, setLocalData] = useState(data);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setLocalData(data);
    setHasChanges(false);
  }, [data]);

  const handleChange = (key: string, value: any) => {
    setLocalData((prev: any) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    console.log('Attempting to save:', { section, localData });
    
    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, updates: localData })
      });
      
      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response result:', result);
      
      if (result.success) {
        setHasChanges(false);
        alert('Content saved successfully!');
        // Update parent component data
        Object.entries(localData).forEach(([key, value]) => {
          onUpdate(section, key, value);
        });
      } else {
        console.error('Save failed:', result.error);
        alert('Failed to save changes: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Network error saving content. Please try again.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold capitalize text-gray-900 dark:text-white">
          {section} Section
        </h2>
        {hasChanges && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        )}
      </div>
      
      <div className="grid gap-4">
        {Object.entries(localData).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            {Array.isArray(value) ? (
              <textarea
                value={Array.isArray(value) ? value.join(', ') : value}
                onChange={(e) => {
                  const newValue = e.target.value.split(', ').map(item => item.trim());
                  handleChange(key, newValue);
                }}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                disabled={saving}
              />
            ) : typeof value === 'string' && value.length > 100 ? (
              <textarea
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                disabled={saving}
              />
            ) : (
              <input
                type="text"
                value={typeof value === 'string' ? value : ''}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={saving}
              />
            )}
          </div>
        ))}
      </div>
      
      {hasChanges && (
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            You have unsaved changes. Click &quot;Save Changes&quot; to update the content.
          </p>
        </div>
      )}
    </div>
  );
}

// Projects Manager Component
function ProjectsManager({ 
  projects, 
  onSave, 
  onDelete, 
  saving 
}: { 
  projects: Project[];
  onSave: (project: Project) => void;
  onDelete: (id: string) => void;
  saving: boolean;
}) {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  const newProject: Project = {
    title: '',
    description: '',
    technologies: [],
    featured: false,
    order: 0
  };

  const handleSave = (project: Project) => {
    onSave(project);
    setEditingProject(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Projects</h2>
        <button
          onClick={() => {
            setEditingProject(newProject);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          disabled={saving}
        >
          Add Project
        </button>
      </div>

      {showForm && editingProject && (
        <ProjectForm
          project={editingProject}
          onSave={handleSave}
          onCancel={() => {
            setEditingProject(null);
            setShowForm(false);
          }}
          saving={saving}
        />
      )}

      <div className="grid gap-4">
        {projects.map((project) => (
          <div key={project._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingProject(project);
                    setShowForm(true);
                  }}
                  className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
                  disabled={saving}
                >
                  Edit
                </button>
                <button
                  onClick={() => project._id && onDelete(project._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                  disabled={saving}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Project Form Component
function ProjectForm({ 
  project, 
  onSave, 
  onCancel, 
  saving 
}: { 
  project: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [formData, setFormData] = useState(project);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
        {project._id ? 'Edit Project' : 'Add New Project'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
            disabled={saving}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            rows={3}
            required
            disabled={saving}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Demo URL
            </label>
            <input
              type="url"
              value={formData.demoUrl || ''}
              onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              disabled={saving}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Code URL
            </label>
            <input
              type="url"
              value={formData.codeUrl || ''}
              onChange={(e) => setFormData({ ...formData, codeUrl: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              disabled={saving}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Technologies (comma-separated)
          </label>
          <input
            type="text"
            value={formData.technologies.join(', ')}
            onChange={(e) => setFormData({ 
              ...formData, 
              technologies: e.target.value.split(', ').map(tech => tech.trim()).filter(Boolean)
            })}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            disabled={saving}
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="mr-2"
            disabled={saving}
          />
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Featured Project
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Project'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// Skills Manager Component
function SkillsManager({ 
  skills, 
  onRefresh, 
  saving 
}: { 
  skills: Skill[];
  onRefresh: () => void;
  saving: boolean;
}) {
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [showForm, setShowForm] = useState(false);

  const categories = ['frontend', 'backend', 'tools'];
  
  const newSkill: Skill = {
    name: '',
    category: 'frontend',
    level: 5,
    order: 0
  };

  const saveSkill = async (skill: Skill) => {
    try {
      const method = skill._id ? 'PUT' : 'POST';
      const url = skill._id ? `/api/skills/${skill._id}` : '/api/skills';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skill)
      });
      
      const result = await response.json();
      if (result.success) {
        alert('Skill saved successfully!');
        onRefresh();
        setEditingSkill(null);
        setShowForm(false);
      } else {
        alert('Error saving skill: ' + result.error);
      }
    } catch (error) {
      console.error('Error saving skill:', error);
      alert('Network error saving skill');
    }
  };

  const deleteSkill = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    
    try {
      const response = await fetch(`/api/skills/${id}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      if (result.success) {
        alert('Skill deleted successfully!');
        onRefresh();
      } else {
        alert('Error deleting skill: ' + result.error);
      }
    } catch (error) {
      console.error('Error deleting skill:', error);
      alert('Network error deleting skill');
    }
  };

  const skillsByCategory = skills.reduce((acc: any, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Skills</h2>
        <button
          onClick={() => {
            setEditingSkill(newSkill);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          disabled={saving}
        >
          Add Skill
        </button>
      </div>

      {showForm && editingSkill && (
        <SkillForm
          skill={editingSkill}
          onSave={saveSkill}
          onCancel={() => {
            setEditingSkill(null);
            setShowForm(false);
          }}
          saving={saving}
          categories={categories}
        />
      )}

      {categories.map(category => (
        <div key={category} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 capitalize">
            {category} Skills
          </h3>
          <div className="grid gap-3">
            {(skillsByCategory[category] || []).map((skill: Skill) => (
              <div key={skill._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                  
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingSkill(skill);
                      setShowForm(true);
                    }}
                    className="px-3 py-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded"
                    disabled={saving}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteSkill(skill._id!)}
                    className="px-3 py-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                    disabled={saving}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {(!skillsByCategory[category] || skillsByCategory[category].length === 0) && (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No skills in this category yet.
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// Skill Form Component
function SkillForm({ 
  skill, 
  onSave, 
  onCancel, 
  saving,
  categories 
}: { 
  skill: Skill;
  onSave: (skill: Skill) => void;
  onCancel: () => void;
  saving: boolean;
  categories: string[];
}) {
  const [formData, setFormData] = useState(skill);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
        {skill._id ? 'Edit Skill' : 'Add New Skill'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Skill Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
            disabled={saving}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
            disabled={saving}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

       

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Display Order
          </label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            disabled={saving}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Skill'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// Experiences Manager Component
function ExperiencesManager({ 
  experiences, 
  onSave, 
  onDelete, 
  saving 
}: { 
  experiences: Experience[];
  onSave: (experience: Experience) => void;
  onDelete: (id: string) => void;
  saving: boolean;
}) {
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [showForm, setShowForm] = useState(false);

  const newExperience: Experience = {
    company: '',
    position: '',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    current: false,
    location: '',
    technologies: [],
    achievements: [],
    order: 0
  };

  const handleSave = (experience: Experience) => {
    onSave(experience);
    setEditingExperience(null);
    setShowForm(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Experiences</h2>
        <button
          onClick={() => {
            setEditingExperience(newExperience);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          disabled={saving}
        >
          Add Experience
        </button>
      </div>

      {showForm && editingExperience && (
        <ExperienceForm
          experience={editingExperience}
          onSave={handleSave}
          onCancel={() => {
            setEditingExperience(null);
            setShowForm(false);
          }}
          saving={saving}
        />
      )}

      <div className="grid gap-4">
        {experiences.map((experience) => (
          <div key={experience._id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    {experience.position}
                  </h3>
                  {experience.current && (
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                  {experience.company} • {experience.location}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {formatDate(experience.startDate)} - {experience.current ? 'Present' : formatDate(experience.endDate || '')}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {experience.description}
                </p>
                
              
                
                
              </div>
              
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => {
                    setEditingExperience(experience);
                    setShowForm(true);
                  }}
                  className="px-3 py-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded text-sm"
                  disabled={saving}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(experience._id!)}
                  className="px-3 py-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded text-sm"
                  disabled={saving}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {experiences.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No experiences added yet.&quot;Click Add Experience&quot; to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Experience Form Component
function ExperienceForm({ 
  experience, 
  onSave, 
  onCancel, 
  saving 
}: { 
  experience: Experience;
  onSave: (experience: Experience) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [formData, setFormData] = useState(experience);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };



  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
        {experience._id ? 'Edit Experience' : 'Add New Experience'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Company *
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
              disabled={saving}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Position *
            </label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
              disabled={saving}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location *
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="City, Country"
            required
            disabled={saving}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            rows={3}
            required
            disabled={saving}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Start Date *
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
              disabled={saving}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={formData.endDate || ''}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              disabled={formData.current || saving}
            />
          </div>
          
          <div className="flex items-center pt-8">
            <input
              type="checkbox"
              checked={formData.current}
              onChange={(e) => setFormData({ 
                ...formData, 
                current: e.target.checked,
                endDate: e.target.checked ? '' : formData.endDate
              })}
              className="mr-2"
              disabled={saving}
            />
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Current Position
            </label>
          </div>
        </div>

       

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Display Order
          </label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            disabled={saving}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Experience'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}