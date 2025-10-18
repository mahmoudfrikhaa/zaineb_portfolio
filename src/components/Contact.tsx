import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'mahmoud.frikha.12@gmail.com', href: 'mailto:mahmoud.frikha.12@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+216 25 870 278', href: 'tel:+216 25 870 278' },
    { icon: MapPin, label: 'Location', value: 'Sfax, Tunisia', href: '#' },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/mahmoudfrikhaa', color: 'hover:text-primary' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mahmoud-frikha-503b05198/', color: 'hover:text-primary' },
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com', color: 'hover:text-accent' },
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-40" />
      <motion.div 
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(0 90% 50%) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div 
        className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(0 100% 55%) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, 30, 0],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to exchange ideas? I'd love to collaborate.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Details - Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="flex flex-col items-center gap-4 p-6 bg-card border border-border rounded-2xl hover:border-primary transition-smooth group text-center"
              >
                <div className="p-4 rounded-xl bg-gradient-primary group-hover:glow-primary transition-smooth">
                  <info.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">{info.label}</div>
                  <div className="font-semibold text-foreground group-hover:gradient-text transition-smooth">
                    {info.value}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mb-12"
          >
            <h3 className="font-display text-2xl font-semibold mb-6">Follow Me</h3>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1, type: 'spring', bounce: 0.5 }}
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-5 bg-card border border-border rounded-xl ${social.color} transition-smooth hover:border-primary hover:glow-primary`}
                  aria-label={social.label}
                >
                  <social.icon className="h-7 w-7" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="p-8 bg-gradient-primary rounded-2xl text-white text-center relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-grid-pattern opacity-10"
              initial={false}
            />
            <div className="relative z-10">
              <h4 className="font-display text-2xl md:text-3xl font-bold mb-3">Ready to build the future together?</h4>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto text-lg">
                Whether it's embedded innovation or full-stack development, I'm always open to creating technology that matters.
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold"
                asChild
              >
                <a href="/Mahmoud-Frikha-CV.pdf" download>Download CV</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
