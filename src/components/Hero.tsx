import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBackground from '@/assets/hero-background.jpg';
import mahmoudPhoto from '@/assets/mahmoud.png';
import { usePerfMode } from '@/hooks/use-perf';

const Hero = () => {
  const { isLowPower } = usePerfMode();
  const { scrollY } = useScroll();
  
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

  return (
    <section id="home" className="relative min-h-[120vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 md:pt-20 md:pb-0">
      {/* Background Image with Overlay */}
      <motion.div className="absolute inset-0 z-0" style={{ y: y1 as any }}>
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/85 to-black" />
      </motion.div>

      {/* Enhanced Animated Elements - Red themed */}
      {!isLowPower && (
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30" 
        style={{ 
          y: y2,
          background: 'radial-gradient(circle, hsl(0 90% 50%) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
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
          background: 'radial-gradient(circle, hsl(0 100% 55%) 0%, transparent 70%)',
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
              {/* Animated glow effect */}
              {!isLowPower && (
              <motion.div 
                className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-30" 
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
                  src={mahmoudPhoto}
                  alt="Mahmoud"
                  className="relative rounded-3xl w-full h-auto shadow-2xl border-2 border-primary/40 hover:border-primary transition-all duration-500"
                  decoding="async"
                  whileHover={{
                    boxShadow: '0 0 40px rgba(255, 0, 0, 0.4)',
                  }}
                />
                {/* Subtle overlay on hover */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"
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
              Welcome to my digital space
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
              Embedded Systems{' '}
            </motion.span>
            <motion.span 
              className="gradient-text inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6, type: 'spring', bounce: 0.4 }}
            >
              & Web
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Engineer
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto lg:mx-0"
          >
            Driven engineer passionate about bridging hardware and software. Specialized in <span className="text-primary font-semibold">embedded systems</span>, <span className="text-primary font-semibold">IoT architectures</span>, and <span className="text-accent font-semibold">full-stack web solutions</span>.
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
                className="bg-gradient-primary hover:opacity-90 transition-smooth glow-primary text-lg px-8 py-6 group relative overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative flex items-center">
                  View My Work
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
                <a href="/Mahmoud_Resume.pdf" download>
                  <Download className="mr-2 h-5 w-5" />
                  Download CV
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
              { icon: Github, href: 'https://github.com/mahmoudfrikhaa', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/mahmoud-frikha-503b05198/', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:mahmoud.frikha.12@gmail.com', label: 'Email' },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.15, y: -8, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-card/80 backdrop-blur-sm border border-border rounded-full hover:border-primary transition-smooth glow-primary hover:bg-muted relative group"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5 text-foreground group-hover:text-primary transition-smooth" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity"
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
