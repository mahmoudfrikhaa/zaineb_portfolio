import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Brain, Palette, Server, Smartphone } from 'lucide-react';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      icon: Code,
      name: 'Front-End',
      color: 'text-primary',
      skills: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      icon: Server,
      name: 'Back-End',
      color: 'text-secondary',
      skills: ['Node.js', 'Express', 'Python', 'REST APIs', 'GraphQL', 'PostgreSQL'],
    },
    {
      icon: Brain,
      name: 'AI & ML',
      color: 'text-accent',
      skills: ['TensorFlow', 'PyTorch', 'OpenAI APIs', 'NLP', 'Computer Vision', 'Deep Learning'],
    },
    {
      icon: Palette,
      name: 'Design',
      color: 'text-primary',
      skills: ['Figma', 'Adobe XD', 'UI/UX', 'Responsive Design', 'Animation', 'Prototyping'],
    },
    {
      icon: Database,
      name: 'Data',
      color: 'text-secondary',
      skills: ['MongoDB', 'Redis', 'Firebase', 'Supabase', 'MySQL', 'Data Analysis'],
    },
    {
      icon: Smartphone,
      name: 'Tools',
      color: 'text-accent',
      skills: ['Git', 'Docker', 'VS Code', 'Vercel', 'AWS', 'CI/CD'],
    },
  ];

  return (
    <section id="skills" className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, intelligent applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-card border border-border rounded-2xl p-6 hover:border-primary transition-smooth hover:shadow-2xl group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-primary group-hover:glow-primary transition-smooth`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">{category.name}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    className="px-3 py-1.5 bg-muted rounded-lg text-sm font-medium text-foreground border border-border hover:border-primary transition-smooth cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16"
        >
          {[
            { label: 'Projects', value: '25+' },
            { label: 'Technologies', value: '30+' },
            { label: 'Experience', value: '3+ Years' },
            { label: 'Certifications', value: '10+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="text-center p-6 bg-card border border-border rounded-xl"
            >
              <div className="font-display text-3xl lg:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
