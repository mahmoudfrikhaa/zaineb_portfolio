import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Brain, Palette, Server, Cpu } from 'lucide-react';
import { useSiteData } from '@/hooks/use-site-data';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { data } = useSiteData();

  const defaultCategories = [
    {
      icon: Cpu,
      name: 'Embedded Systems',
      color: 'text-accent',
      skills: ['Arduino', 'STM32', 'ESP32', 'Raspberry Pi', 'SPI/UART/I2C', 'Real-time control'],
    },
    {
      icon: Database,
      name: 'Data & Databases',
      color: 'text-secondary',
      skills: ['MySQL', 'Firebase', 'PostgreSQL'],
    },
    {
      icon: Brain,
      name: 'Tools',
      color: 'text-accent',
      skills: ['GitLab', 'GitHub', 'VS Code', 'IAR', 'STM32CubeMX', 'Docker', 'LabVIEW']
    },
    {
      icon: Code,
      name: 'Front-End',
      color: 'text-primary',
      skills: ['WordPress', 'Angular'],
    },
    {
      icon: Server,
      name: 'Back-End',
      color: 'text-secondary',
      skills: ['Node.js', 'Flask', 'Python', 'REST APIs', 'Firebase'],
    },
    {
      icon: Palette,
      name: 'Design',
      color: 'text-primary',
      skills: ['UI/UX Design', 'Figma'],
    },
  ];
  const icons = [Cpu, Database, Brain, Code, Server, Palette];
  const skillCategories = (data?.skills?.categories as any[] | undefined)?.map((c, i) => ({
    icon: icons[i % icons.length],
    name: c.name,
    color: 'text-primary',
    skills: c.skills || [],
  })) ?? defaultCategories;

  return (
    <section id="skills" className="py-20 lg:py-32 bg-black/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, hsl(0 90% 50%) 0%, transparent 70%)', opacity: 0.1 }} />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, hsl(0 100% 55%) 0%, transparent 70%)', opacity: 0.1 }} />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {(data?.skills?.heading ?? 'Technical Skills').split(' ').slice(0, -1).join(' ')} <span className="gradient-text">{(data?.skills?.heading ?? 'Technical Skills').split(' ').slice(-1)}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {data?.skills?.subheading ?? 'A comprehensive toolkit for building modern, intelligent applications'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              whileHover={{ 
                scale: 1.03, 
                y: -8,
                rotateZ: categoryIndex % 2 === 0 ? 1 : -1,
              }}
              className="bg-card border border-border rounded-2xl p-6 hover:border-primary transition-smooth hover:shadow-2xl group relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity"
                initial={false}
              />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div 
                    className={`p-3 rounded-xl bg-gradient-primary group-hover:glow-primary transition-smooth`}
                    whileHover={{ 
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <category.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <h3 className="font-display text-xl font-semibold text-foreground group-hover:gradient-text transition-smooth">{category.name}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ 
                        duration: 0.3, 
                        delay: categoryIndex * 0.1 + skillIndex * 0.05,
                        type: 'spring',
                        bounce: 0.4,
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        y: -3,
                        backgroundColor: 'hsl(var(--primary) / 0.1)',
                      }}
                      className="px-3 py-1.5 bg-muted rounded-lg text-sm font-medium text-foreground border border-border hover:border-primary transition-smooth cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
