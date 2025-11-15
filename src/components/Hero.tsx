import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBackground from '@/assets/hero-background.jpg';
import zainebPhoto from '@/assets/zaineb.png';
import { usePerfMode } from '@/hooks/use-perf';
import { useSiteData } from '@/hooks/use-site-data';

const Hero = () => {
  const { isLowPower } = usePerfMode();
  const { data, isLoading, error } = useSiteData();
  const { scrollY } = useScroll();
  
  // Debug: Log data loading state
  console.log('Hero - Loading:', isLoading, 'Error:', error, 'Data:', data);
  
  // Always call hooks unconditionally - React requirement
  const y1Transform = useTransform(scrollY, [0, 500], [0, 150]);
  const y2Transform = useTransform(scrollY, [0, 500], [0, -150]);
  const opacityTransform = useTransform(scrollY, [0, 300], [1, 0]);
  
  // Use the transforms only if not low power
  const y1 = isLowPower ? 0 : y1Transform;
  const y2 = isLowPower ? 0 : y2Transform;
  const opacity = isLowPower ? 1 : opacityTransform;
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-background">
        <div className="text-center text-red-500">
          <p>Error loading data: {error.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="relative min-h-[120vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 md:pt-20 md:pb-0">
      {/* Background with gradient overlay */}
      <motion.div className="absolute inset-0 z-0" style={{ y: y1 as any }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#404C9B] via-[#5a3b7f] to-[#A1529B]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        {/* Animated mesh gradient effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#404C9B]/40 via-transparent to-[#A1529B]/40 animate-pulse" />
        </div>
      </motion.div>

      {/* Enhanced Animated Elements - Blue & Purple themed */}
      {!isLowPower && (
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30" 
        style={{ 
          y: y2,
          background: 'radial-gradient(circle, #404C9B 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      )}
      {!isLowPower && (
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-30" 
        style={{ 
          y: y1,
          background: 'radial-gradient(circle, #A1529B 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
      )}
      {!isLowPower && (
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-20" 
        style={{ 
          background: 'radial-gradient(circle, #6b4d8a 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      )}

      {/* Content */}
  <motion.div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-12 items-center max-w-7xl mx-auto">
          
          {/* Left side - Profile Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-full max-w-sm mx-auto">
              {/* Animated glow effect - Blue & Purple */}
              {!isLowPower && (
              <motion.div 
                className="absolute inset-0 rounded-3xl blur-3xl opacity-30"
                style={{ background: 'linear-gradient(135deg, #404C9B, #A1529B)' }}
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              )}
              
              {/* Image with smooth float animation */}
              <motion.div
                animate={isLowPower ? undefined : { y: [0, -10, 0] }}
                transition={isLowPower ? undefined : {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
                className="relative"
              >
                <motion.img
                  src={data?.hero?.profileImage ?? zainebPhoto}
                  alt={data?.site?.author ?? 'Zaineb'}
                  className="relative rounded-3xl w-full h-auto shadow-2xl border-2 border-primary/40 hover:border-primary transition-all duration-500"
                  decoding="async"
                  whileHover={{
                    boxShadow: '0 0 40px rgba(64, 76, 155, 0.6), 0 0 80px rgba(161, 82, 155, 0.4)',
                  }}
                />
                {/* Subtle overlay on hover - Blue & Purple gradient */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(135deg, rgba(64, 76, 155, 0.1), rgba(161, 82, 155, 0.1))' }}
                  initial={false}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Text Content */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start space-y-6">
          {/* Greeting with sparkle effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-card/80 backdrop-blur-sm border border-border rounded-full text-sm font-medium text-muted-foreground shadow-lg">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              {data?.hero?.welcome ?? 'Welcome to my digital space'}
            </span>
          </motion.div>

          {/* Main Title with stagger animation */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {data?.hero?.titleLeft ?? 'Embedded Systems'}{' '}
            </motion.span>
            <motion.span 
              className="gradient-text inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6, type: 'spring', bounce: 0.4 }}
            >
              {data?.hero?.titleAccent ?? '& Web'}
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {data?.hero?.titleRight ?? 'Engineer'}
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto lg:mx-0"
          >
            {data?.hero?.subtitle ?? (
              <>Driven engineer passionate about bridging hardware and software. Specialized in <span className="text-primary font-semibold">embedded systems</span>, <span className="text-primary font-semibold">IoT architectures</span>, and <span className="text-accent font-semibold">full-stack web solutions</span>.</>
            )}
          </motion.p>

          {/* CTA Buttons with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={() => scrollToSection('#projects')}
                className="text-lg px-8 py-6 group relative overflow-hidden"
                style={{ 
                  background: 'linear-gradient(135deg, #404C9B, #A1529B)',
                  boxShadow: '0 0 20px rgba(64, 76, 155, 0.5)'
                }}
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative flex items-center">
                  {data?.hero?.primaryCta ?? 'View My Work'}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
                </span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 text-lg px-8 py-6 hover:bg-muted transition-smooth backdrop-blur-sm"
                asChild
              >
                <a href={data?.hero?.cv ?? '/Mahmoud_Resume.pdf'} download>
                  <Download className="mr-2 h-5 w-5" />
                  {data?.hero?.secondaryCta ?? 'Download CV'}
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Social Links with stagger animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex gap-4 justify-center lg:justify-start"
          >
            {[
              data?.socials?.github ? { icon: Github, href: data.socials.github, label: 'GitHub' } : undefined,
              data?.socials?.linkedin ? { icon: Linkedin, href: data.socials.linkedin, label: 'LinkedIn' } : undefined,
              data?.socials?.email ? { icon: Mail, href: data.socials.email, label: 'Email' } : undefined,
            ].filter(Boolean).map((social: any, index: number) => (
              <motion.a
                key={social.label}
                href={social.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.15, y: -8, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-card/80 backdrop-blur-sm border border-border rounded-full hover:border-primary transition-smooth hover:bg-muted relative group"
                aria-label={social.label}
                style={{ boxShadow: 'none' }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(64, 76, 155, 0.4)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
              >
                <social.icon className="h-5 w-5 text-foreground group-hover:text-primary transition-smooth" />
                <motion.div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, #404C9B, #A1529B)' }}
                  initial={false}
                />
              </motion.a>
            ))}
          </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      {!isLowPower && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          style={{ opacity: opacity as any }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
