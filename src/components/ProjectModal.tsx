import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Project {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  fullDescription?: string;
  features?: string[];
  demoUrl?: string;
  githubUrl?: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 z-50 overflow-hidden"
          >
            <div className="h-full bg-card border border-border rounded-3xl overflow-hidden flex flex-col">
              {/* Header with Gradient */}
              <div className={`relative h-48 md:h-64 bg-gradient-to-br ${project.gradient}`}>
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm hover:bg-card"
                >
                  <X className="h-5 w-5" />
                </Button>

                {/* Title */}
                <div className="absolute bottom-6 left-6 right-6">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-display text-3xl md:text-4xl font-bold text-white drop-shadow-lg"
                  >
                    {project.title}
                  </motion.h2>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="font-display text-xl font-semibold mb-3">Overview</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.fullDescription || project.description}
                  </p>
                </motion.div>

                {project.features && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="font-display text-xl font-semibold mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">▹</span>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="font-display text-xl font-semibold mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-gradient-primary text-white rounded-lg text-sm font-medium shadow-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-4 pt-4"
                >
                  <Button
                    className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
                    size="lg"
                    asChild
                  >
                    <a href={project.demoUrl || "#"} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-5 w-5" />
                      View Demo
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 hover:bg-primary hover:text-white transition-smooth"
                    size="lg"
                    asChild
                  >
                    <a href={project.githubUrl || "#"} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-5 w-5" />
                      Source Code
                    </a>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
