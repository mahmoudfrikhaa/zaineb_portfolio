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
      title: 'Bachelor in Computer Science',
      organization: 'University Name',
      period: '2021 - Present',
      description: 'Specializing in Web Development, Artificial Intelligence, and Creative Technologies.',
      color: 'primary',
    },
    {
      icon: Briefcase,
      type: 'Internship',
      title: 'Full-Stack Developer Intern',
      organization: 'Tech Company XYZ',
      period: 'Summer 2024',
      description: 'Developed scalable web applications using React and Node.js, collaborated with cross-functional teams.',
      color: 'secondary',
    },
    {
      icon: Trophy,
      type: 'Achievement',
      title: 'Hackathon Winner',
      organization: 'National Coding Challenge',
      period: '2024',
      description: 'First place for building an AI-powered solution for sustainable agriculture.',
      color: 'accent',
    },
    {
      icon: Award,
      type: 'Certification',
      title: 'AWS Certified Developer',
      organization: 'Amazon Web Services',
      period: '2023',
      description: 'Certified in cloud architecture, serverless computing, and deployment strategies.',
      color: 'primary',
    },
    {
      icon: Briefcase,
      type: 'Freelance',
      title: 'Web Development Freelancer',
      organization: 'Self-Employed',
      period: '2022 - Present',
      description: 'Built custom websites and applications for clients across various industries.',
      color: 'secondary',
    },
    {
      icon: Award,
      type: 'Achievement',
      title: 'Dean\'s List Honor',
      organization: 'University Name',
      period: '2022, 2023',
      description: 'Recognized for academic excellence with GPA above 3.8.',
      color: 'accent',
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
    <section id="experience" className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

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
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-card border border-border rounded-2xl p-6 hover:border-primary transition-smooth group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl border-2 ${getColorClass(item.color)} group-hover:glow-primary transition-smooth`}>
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-medium text-muted-foreground mb-1">{item.type}</div>
                        <h3 className="font-display text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-smooth">
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

                {/* Center Dot */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-gradient-primary border-4 border-background z-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
