import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Sparkles, Rocket, Award } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.jpg';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const highlights = [
    {
      icon: Code2,
      title: 'Web Development',
      description: 'Expert in modern frameworks like React, Next.js, and Vue',
    },
    {
      icon: Sparkles,
      title: 'AI & Machine Learning',
      description: 'Passionate about AI-driven solutions and intelligent systems',
    },
    {
      icon: Rocket,
      title: 'Innovation',
      description: 'Always exploring cutting-edge technologies and trends',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering high-quality, scalable solutions',
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A journey of passion, innovation, and continuous learning
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-2xl opacity-30 animate-glow-pulse" />
              <motion.img
                whileHover={{ scale: 1.02 }}
                src={profilePhoto}
                alt="Developer workspace"
                className="relative rounded-2xl w-full h-auto shadow-2xl border border-border"
              />
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-foreground leading-relaxed">
                I'm a <span className="text-primary font-semibold">final-year student</span> with a deep passion for creating 
                innovative digital experiences. My journey in technology combines the artistry of 
                <span className="text-secondary font-semibold"> modern web development</span> with the power of 
                <span className="text-accent font-semibold"> artificial intelligence</span>.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I believe in building solutions that not only solve problems but inspire and delight users. 
                Every project is an opportunity to push boundaries and create something extraordinary.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-4 bg-card border border-border rounded-xl hover:border-primary transition-smooth cursor-pointer"
                >
                  <item.icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-display font-semibold mb-1 text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
