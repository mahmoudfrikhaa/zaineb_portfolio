import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import PageTransition from '@/components/PageTransition';
import Navigation from '@/components/Navigation';
import { usePerfMode } from '@/hooks/use-perf';

const ProjectDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const project = location.state?.project;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const { isLowPower } = usePerfMode();

  // Gallery images for ConvoZoom
  const galleryImages = project?.title === 'ConvoZoom' ? [
    '/convozoom/convozoom.png',
    '/convozoom/convozoom2.png',
    '/convozoom/convozoom3.png',
    '/convozoom/convozoom4.png',
    '/convozoom/convozoom5.png',
    '/convozoom/convozoom6.png',
  ] : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const previousSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Auto-play carousel
  useEffect(() => {
    if (galleryImages.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, isLowPower ? 5000 : 3000); // slower autoplay on low-power

    return () => clearInterval(interval);
  }, [currentSlide, galleryImages.length, isLowPower]);

  if (!project) {
    navigate('/');
    return null;
  }

  return (
    <PageTransition>
      <Navigation />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-background pt-20"
      >
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative py-20 overflow-hidden"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Button
              variant="outline"
              onClick={() => navigate('/', { state: { scrollTo: 'projects' } })}
              className="group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Button>
          </motion.div>

          {/* Project Header */}
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Badge className={`mb-4 bg-gradient-to-r ${project.gradient} text-white`}>
                {project.category}
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 gradient-text"
            >
              {project.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl text-muted-foreground mb-8"
            >
              {project.description}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              {project.githubUrl && (
                <Button
                  asChild
                  className="bg-gradient-primary hover:opacity-90 transition-smooth"
                >
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    View on GitHub
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button variant="outline" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Live Demo
                  </a>
                </Button>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Full Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <h2 className="font-display text-2xl font-bold mb-4">About This Project</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {project.fullDescription}
              </p>
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <h2 className="font-display text-2xl font-bold mb-6">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag: string, index: number) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.9 + index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="px-4 py-2 bg-muted rounded-xl text-sm font-medium text-foreground border border-border hover:border-primary transition-smooth"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <h2 className="font-display text-2xl font-bold mb-6">Key Features</h2>
              <div className="space-y-4">
                {project.features.map((feature: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                    className="flex items-start gap-3 group"
                  >
                    <CheckCircle2 className="h-6 w-6 text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <p className="text-muted-foreground leading-relaxed">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Carousel Gallery for ConvoZoom */}
            {galleryImages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="bg-card border border-border rounded-2xl p-8 overflow-hidden"
              >
                {/* Main Carousel */}
                <div className="relative">
                  {/* Carousel Container */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-red-500/10 to-orange-500/10">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={currentSlide}
                        custom={direction}
                        initial={
                          isLowPower
                            ? { x: direction > 0 ? 100 : -100, opacity: 0 }
                            : { x: direction > 0 ? 1000 : -1000, opacity: 0, scale: 0.8, rotateY: direction > 0 ? 45 : -45 }
                        }
                        animate={
                          isLowPower
                            ? { x: 0, opacity: 1 }
                            : { x: 0, opacity: 1, scale: 1, rotateY: 0 }
                        }
                        exit={
                          isLowPower
                            ? { x: direction > 0 ? -100 : 100, opacity: 0 }
                            : { x: direction > 0 ? -1000 : 1000, opacity: 0, scale: 0.8, rotateY: direction > 0 ? -45 : 45 }
                        }
                        transition={
                          isLowPower
                            ? { type: 'tween', duration: 0.35, ease: 'easeOut' }
                            : { type: 'spring', stiffness: 300, damping: 30 }
                        }
                        className="absolute inset-0"
                      >
                        <img
                          src={galleryImages[currentSlide]}
                          alt={`${project.title} screenshot ${currentSlide + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        
                        {/* Image Counter */}
                        <motion.div
                          initial={{ y: 50, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="absolute bottom-6 right-6"
                        >
                          <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium">
                            {currentSlide + 1} / {galleryImages.length}
                          </div>
                        </motion.div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    <motion.button
                      whileHover={{ scale: 1.1, x: -5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={previousSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors group z-10"
                    >
                      <ChevronLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1, x: 5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={nextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors group z-10"
                    >
                      <ChevronRight className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
                    </motion.button>
                  </div>

                  {/* Thumbnail Navigation */}
                  <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
                    {galleryImages.map((image, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => goToSlide(index)}
                        className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden transition-all ${
                          currentSlide === index
                            ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                            : 'opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                        {currentSlide === index && (
                          <motion.div
                            layoutId="activeSlide"
                            className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent"
                          />
                        )}
                        <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                      initial={{ width: '0%' }}
                      animate={{ width: `${((currentSlide + 1) / galleryImages.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Project Video */}
            {project.videoUrl && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="bg-card border border-border rounded-2xl p-8"
              >
                <h2 className="font-display text-2xl font-bold mb-6">Project Demo</h2>
                <div className="relative rounded-xl overflow-hidden bg-black aspect-video shadow-2xl">
                  <video
                    controls
                    preload="metadata"
                    playsInline
                    className="w-full h-full object-contain"
                    poster={project.imageUrl ? `/${project.imageUrl}` : undefined}
                  >
                    <source src={`/${project.videoUrl}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Click the play button to watch the demo
                </p>
              </motion.div>
            )}

            {/* Back to Projects CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-center py-8"
            >
              <Button
                size="lg"
                onClick={() => navigate('/', { state: { scrollTo: 'projects' } })}
                className="bg-gradient-primary hover:opacity-90 transition-smooth"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                View More Projects
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
    </PageTransition>
  );
};

export default ProjectDetails;
