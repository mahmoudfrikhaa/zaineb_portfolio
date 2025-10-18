import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Sparkles, Rocket, Award } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  const highlights = [
    {
      icon: Code2,
      title: 'Embedded Systems',
      description: 'Expert in microcontrollers, IoT devices, and real-time embedded programming',
    },
    {
      icon: Sparkles,
      title: 'Web Development',
      description: 'Building scalable web applications using WordPress, React, and Node.js',
    },
    {
      icon: Rocket,
      title: 'Innovation',
      description: 'Driven by curiosity and constant learning in AI, automation, and connected systems',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Delivering reliable, optimized, and future-ready technological solutions',
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
          <motion.h2 
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            About <span className="gradient-text">Me</span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            A journey of passion, innovation, and continuous learning
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Content Section - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-foreground leading-relaxed">
                I'm <span className="text-primary font-semibold">Mahmoud Frikha</span>, an ambitious and creative engineer specialized in 
                <span className="text-primary font-semibold"> Embedded Systems</span>, 
                <span className="text-primary font-semibold"> IoT</span>, and 
                <span className="text-accent font-semibold"> Web Development</span>. Throughout my academic and professional journey, 
                I've built a strong foundation in system design, electronics, and software integration. My curiosity for how things work 
                drives me to transform innovative ideas into real-world technological solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether designing intelligent machines, connecting IoT ecosystems, or building scalable digital platforms, I approach 
                every challenge with precision, creativity, and persistence. I believe that technology should not only work — it should 
                inspire. Each project I build is a new opportunity to innovate, automate, and make life smarter.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.6 + index * 0.1,
                    type: 'spring',
                    bounce: 0.3,
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    rotateZ: index % 2 === 0 ? 2 : -2,
                  }}
                  className="p-5 bg-card border border-border rounded-xl hover:border-primary transition-smooth cursor-pointer group relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity"
                    initial={false}
                  />
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="inline-block"
                    >
                      <item.icon className="h-8 w-8 text-primary mb-3" />
                    </motion.div>
                    <h3 className="font-display font-semibold mb-1 text-foreground group-hover:text-primary transition-smooth">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
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
