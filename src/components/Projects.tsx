import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import ProjectModal from './ProjectModal';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['All', 'Web', 'AI/ML', 'Mobile', 'SaaS', 'Full-Stack'];

  const projects = [
    {
      title: 'AI-Powered Analytics Platform',
      description: 'A comprehensive analytics dashboard using machine learning to provide real-time insights and predictive analytics for business intelligence.',
      fullDescription: 'Advanced business intelligence platform that leverages machine learning algorithms to transform raw data into actionable insights. Features real-time data processing, predictive analytics, and customizable dashboards.',
      tags: ['React', 'TensorFlow', 'Python', 'PostgreSQL'],
      gradient: 'from-purple-600 to-red-500',
      category: 'AI/ML',
      features: [
        'Real-time data processing and visualization',
        'Machine learning-powered predictions',
        'Customizable dashboard widgets',
        'Advanced data filtering and segmentation',
        'Automated report generation'
      ],
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with advanced features including real-time inventory, payment processing, and personalized recommendations.',
      fullDescription: 'Enterprise-grade e-commerce platform built with modern technologies. Includes advanced inventory management, secure payment integration, AI-powered product recommendations, and comprehensive admin dashboard.',
      tags: ['Next.js', 'Stripe', 'MongoDB', 'Node.js'],
      gradient: 'from-red-600 to-purple-600',
      category: 'Full-Stack',
      features: [
        'Real-time inventory synchronization',
        'Secure payment processing with Stripe',
        'AI-powered product recommendations',
        'Advanced search and filtering',
        'Multi-vendor support'
      ],
    },
    {
      title: 'Smart Assistant Chatbot',
      description: 'Intelligent chatbot leveraging NLP and OpenAI APIs to provide context-aware responses and automate customer support workflows.',
      fullDescription: 'Next-generation conversational AI assistant powered by advanced NLP and GPT models. Provides intelligent, context-aware responses and seamlessly integrates with existing customer support systems.',
      tags: ['Vue.js', 'OpenAI', 'NLP', 'Firebase'],
      gradient: 'from-purple-500 to-pink-500',
      category: 'AI/ML',
      features: [
        'Natural language understanding',
        'Context-aware conversations',
        'Multi-language support',
        'Integration with helpdesk systems',
        'Sentiment analysis'
      ],
    },
    {
      title: 'Portfolio Builder SaaS',
      description: 'A SaaS platform that enables users to create stunning portfolio websites with drag-and-drop functionality and AI-assisted content generation.',
      fullDescription: 'Comprehensive SaaS solution for creating professional portfolio websites without coding. Features drag-and-drop builder, AI-powered content suggestions, and one-click deployment.',
      tags: ['React', 'TypeScript', 'Supabase', 'Tailwind'],
      gradient: 'from-pink-500 to-rose-500',
      category: 'SaaS',
      features: [
        'Drag-and-drop website builder',
        'AI-assisted content generation',
        'Professional templates library',
        'Custom domain support',
        'Analytics dashboard'
      ],
    },
    {
      title: 'Real-time Collaboration Tool',
      description: 'Web application for team collaboration with real-time editing, video calls, and project management features.',
      fullDescription: 'Unified collaboration platform that brings teams together with real-time document editing, video conferencing, task management, and file sharing in one seamless interface.',
      tags: ['Next.js', 'WebRTC', 'Socket.io', 'Redis'],
      gradient: 'from-indigo-600 to-purple-600',
      category: 'Full-Stack',
      features: [
        'Real-time collaborative editing',
        'HD video and audio calls',
        'Task and project management',
        'File sharing and version control',
        'Team chat and notifications'
      ],
    },
    {
      title: 'Mobile Fitness Tracker',
      description: 'Cross-platform mobile app for fitness tracking with AI-powered workout recommendations and progress analytics.',
      fullDescription: 'Comprehensive fitness tracking application with AI-powered workout plans, nutrition tracking, and social features. Works seamlessly across iOS and Android platforms.',
      tags: ['React Native', 'AI/ML', 'GraphQL', 'AWS'],
      gradient: 'from-green-600 to-emerald-500',
      category: 'Mobile',
      features: [
        'AI-powered workout recommendations',
        'Nutrition and calorie tracking',
        'Progress analytics and insights',
        'Social features and challenges',
        'Wearable device integration'
      ],
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section id="projects" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Showcasing innovative solutions and creative implementations
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto mb-12 space-y-6"
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search projects by name, description, or technology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 bg-card border-border focus:border-primary transition-smooth"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 transition-spring ${
                  selectedCategory === category
                    ? 'bg-gradient-primary text-white hover:opacity-90'
                    : 'hover:bg-primary hover:text-white'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => handleProjectClick(project)}
              className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary transition-spring cursor-pointer"
            >
              {/* Gradient Header */}
              <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-foreground backdrop-blur-sm">
                    {project.category}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="font-display text-xl font-semibold text-foreground group-hover:gradient-text transition-smooth">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-muted rounded-lg text-xs font-medium text-foreground border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-3 py-1 text-xs font-medium text-primary">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Hover Indicator */}
                <div className="pt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-smooth">
                  <span className="text-sm font-medium">View Details</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg">
              No projects found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Projects;
