import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Award, GraduationCap, Trophy } from 'lucide-react';

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timeline = [
    {
      icon: GraduationCap,
      type: 'Education',
      title: 'High School Diploma in Mathematics',
      organization: 'Tayeb Mhiri High School',
      period: '2019',
      description: '',
      color: 'primary',
    },
    {
      icon: GraduationCap,
      type: 'Education',
      title: 'National Engineering Entrance Exam (Preparatory Cycle – Physics & Chemistry Section)',
      organization: 'Faculty of Sciences of Sfax',
      period: '2019 – 2023',
      description: '',
      color: 'primary',
    },
    {
      icon: GraduationCap,
      type: 'Education',
      title: 'Engineering Degree in Electrical and Communication Systems Engineering',
      organization: 'National School of Electronics and Telecommunications of Sfax (ENET\'Com)',
      period: '2023 – Present',
      description: '',
      color: 'primary',
    },
    {
      icon: Briefcase,
      type: 'Internship',
      title: 'Web Development Intern',
      organization: 'ESSE Research Laboratory, ENET\'Com',
      period: 'June 2024 – July 2024',
      description: '',
      color: 'secondary',
    },
    {
      icon: Briefcase,
      type: 'Internship',
      title: 'Smart Greenhouse IoT Dashboard',
      organization: 'ESSE Research Laboratory, ENET\'Com',
      period: 'July 2024 – September 2024',
      description: '',
      color: 'secondary',
    },
    {
      icon: Briefcase,
      type: 'Internship',
      title: 'Intelligent Conversational Assistant with RAG',
      organization: 'OneFold Tech',
      period: 'June 2025 – July 2025',
      description: '',
      color: 'secondary',
    },
    {
      icon: Briefcase,
      type: 'Freelance',
      title: 'Full-Stack Web Development',
      organization: 'OneFold Tech',
      period: 'July 2025 – Present',
      description: '',
      color: 'secondary',
    },
  ];

  const getColorClass = (color: string) => {
    const colors = {
      primary: 'text-primary border-primary bg-primary/10',
      secondary: 'text-secondary border-secondary bg-secondary/10',
      accent: 'text-accent border-accent bg-accent/10',
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="experience" className="py-20 lg:py-32 bg-black/50 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, hsl(0 100% 55%) 0%, transparent 70%)', opacity: 0.1 }} />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, hsl(0 90% 50%) 0%, transparent 70%)', opacity: 0.1 }} />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Experience & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A timeline of growth, learning, and accomplishments
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`w-full md:w-[calc(50%-3rem)] ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <motion.div
                    whileHover={{ scale: 1.03, y: -8 }}
                    className="bg-card border border-border rounded-2xl p-6 hover:border-primary transition-smooth group relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity"
                      initial={false}
                    />
                    <div className="flex items-start gap-4 relative z-10">
                      <motion.div 
                        className={`p-3 rounded-xl border-2 ${getColorClass(item.color)} group-hover:glow-primary transition-smooth`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <item.icon className="h-6 w-6" />
                      </motion.div>
                      <div className="flex-1">
                        <div className="text-xs font-medium text-muted-foreground mb-1">{item.type}</div>
                        <h3 className="font-display text-lg font-semibold text-foreground mb-1 group-hover:gradient-text transition-smooth">
                          {item.title}
                        </h3>
                        <div className="text-sm font-medium text-muted-foreground mb-2">
                          {item.organization} • {item.period}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Center Dot with pulse animation */}
                <motion.div 
                  className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-gradient-primary border-4 border-background z-10"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  whileHover={{ scale: 1.5 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
