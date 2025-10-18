import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: 'AI-Powered Analytics Platform',
      description: 'A comprehensive analytics dashboard using machine learning to provide real-time insights and predictive analytics for business intelligence.',
      tags: ['React', 'TensorFlow', 'Python', 'PostgreSQL'],
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with advanced features including real-time inventory, payment processing, and personalized recommendations.',
      tags: ['Next.js', 'Stripe', 'MongoDB', 'Node.js'],
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Smart Assistant Chatbot',
      description: 'Intelligent chatbot leveraging NLP and OpenAI APIs to provide context-aware responses and automate customer support workflows.',
      tags: ['Vue.js', 'OpenAI', 'NLP', 'Firebase'],
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Portfolio Builder SaaS',
      description: 'A SaaS platform that enables users to create stunning portfolio websites with drag-and-drop functionality and AI-assisted content generation.',
      tags: ['React', 'TypeScript', 'Supabase', 'Tailwind'],
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: 'Real-time Collaboration Tool',
      description: 'Web application for team collaboration with real-time editing, video calls, and project management features.',
      tags: ['Next.js', 'WebRTC', 'Socket.io', 'Redis'],
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      title: 'Mobile Fitness Tracker',
      description: 'Cross-platform mobile app for fitness tracking with AI-powered workout recommendations and progress analytics.',
      tags: ['React Native', 'AI/ML', 'GraphQL', 'AWS'],
      gradient: 'from-green-500 to-lime-500',
    },
  ];

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary transition-smooth"
            >
              {/* Gradient Header */}
              <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-smooth">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-muted rounded-lg text-xs font-medium text-foreground border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 hover:bg-primary hover:text-white transition-smooth"
                    asChild
                  >
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 hover:bg-secondary hover:text-white transition-smooth"
                    asChild
                  >
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
