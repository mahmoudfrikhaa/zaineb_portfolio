import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Projects = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Web', 'Embedded', 'IoT', 'AI'];

  // 3D Card effect hook
  const useCard3D = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);
    
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set(event.clientX - centerX);
      y.set(event.clientY - centerY);
    };
    
    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };
    
    return { rotateX, rotateY, handleMouseMove, handleMouseLeave };
  };

  const projects = [
    {
      title: 'Badge Express System',
      description: 'An autonomous badge dispensing machine integrating STM32 and Arduino for automated user identification.',
      fullDescription: 'A fully automated smart badge distribution system built from scratch, integrating mechanical design, embedded programming, and real-time control. The system uses STM32 (Nucleo-F446RE) for central control, an Arduino Mega + RAMPS 1.5 for motor management, and a GM67 barcode reader for user verification. The project also integrates a laser receiver and IR modules for safety detection.',
      tags: ['STM32', 'Arduino', 'RAMPS 1.5', 'C++', 'SolidWorks', 'SPI', 'UART'],
      gradient: 'from-red-600 to-black',
      category: 'Embedded',
      imageUrl: 'badge-express.png',
      features: [
        'Automatic badge dispensing mechanism',
        'Laser and IR-based object detection',
        'Barcode scanning and validation system',
        'Real-time communication between microcontrollers',
        'Mechanical 3D design modeled on SolidWorks'
      ],
    },
    {
      title: 'Smart Greenhouse IoT Dashboard',
      description: 'An intelligent greenhouse system integrating LoRa communication, Arduino, Raspberry Pi, and Flask for remote environmental monitoring and control.',
      fullDescription: 'During my summer internship, I designed and implemented a complete IoT-based Smart Greenhouse (Serre Intelligente) system capable of monitoring and controlling environmental parameters such as temperature, humidity, and soil moisture in real time. The system uses Arduino nodes equipped with DHT11 and soil moisture sensors to collect data, which is then transmitted wirelessly via LoRa modules to a Raspberry Pi gateway. The Raspberry Pi stores the data in a MySQL database and hosts a Flask-based dashboard for visualization, control, and analytics. The dashboard also integrates Firebase for cloud synchronization and remote access, enabling users to monitor the greenhouse and control actuators such as fans, lights, and irrigation pumps from anywhere.',
      tags: ['Flask', 'Python', 'Arduino', 'Raspberry Pi', 'MySQL', 'Firebase', 'LoRa', 'DHT11'],
      gradient: 'from-green-500 to-blue-600',
      category: 'IoT',
      imageUrl: 'smart-greenhouse.png',
      features: [
        'Wireless long-range communication using LoRa modules',
        'Real-time monitoring of temperature, humidity, and soil moisture',
        'Automatic actuation control for fans, irrigation, and lighting',
        'Data logging and analytics dashboard built with Flask',
        'MySQL local storage with timestamped records',
        'Remote access and synchronization via Firebase',
        'User-friendly web interface with live charts and system control'
      ],
    },
    {
      title: 'ESSE Lab Website',
      description: 'A multilingual dynamic website built for the ESSE Lab to showcase research, publications, and events.',
      fullDescription: 'Designed and developed a complete website for the ESSE Laboratory using WordPress, Elementor, and Advanced Custom Fields (ACF). The site enables lab members to manage projects, publications, and news efficiently. Mahmoud also configured Polylang for bilingual support and deployed the site on Azure for scalability.',
      tags: ['WordPress', 'Elementor', 'ACF', 'Polylang', 'Azure', 'HTML', 'CSS'],
      gradient: 'from-purple-600 to-red-500',
      category: 'Web',
      imageUrl: 'esse-lab.png',
      features: [
        'Bilingual content management (FR/EN)',
        'Custom ACF fields for dynamic updates',
        'Optimized responsive design',
        'Azure deployment with CDN optimization',
        'Team collaboration with role-based access'
      ],
    },
    {
      title: 'Laser Game',
      description: 'Interactive laser-based target system with scoring logic and real-time feedback.',
      fullDescription: 'Created a laser shooting game using STM32 and IR receivers. The system detects laser hits via sensors, displays scores, and provides visual feedback through LEDs. Designed for real-time responsiveness and entertainment applications.',
      tags: ['STM32', 'C', 'IR Sensors', 'Timers', 'Interrupts'],
      gradient: 'from-green-500 to-red-600',
      category: 'Embedded',
      imageUrl: 'laser-game.png',
      videoUrl: 'Jeu_Laser.mp4',
      features: [
        'Real-time hit detection',
        'Score tracking system',
        'LED-based visual feedback',
        'Interrupt-driven event handling',
        'Precise timing control'
      ],
    },
    {
      title: 'Intelligent Conversational Assistant with RAG',
      description: 'A full-stack conversational AI system leveraging Retrieval-Augmented Generation (RAG) and real-time web search for accurate, verified responses.',
      fullDescription: 'During my final-year internship at OneFold Tech, I designed and developed an intelligent conversational assistant capable of providing precise, up-to-date answers using both internal knowledge bases and real-time web data. The system is built on a hybrid retrieval architecture combining lexical and semantic search (FTS + pgvector) within PostgreSQL. It integrates a Flask backend, a React frontend, and a PostgreSQL database to handle user authentication, document uploads, hybrid search, and conversation history. Using RAG principles, the assistant retrieves relevant document chunks via embeddings generated by SentenceTransformers, fuses results using RRF and MMR algorithms, and orchestrates between RAG, Web Search, and standard LLM modes to optimize response quality, traceability, and latency.',
      tags: ['Flask', 'React', 'PostgreSQL', 'Python', 'SentenceTransformers', 'pgvector', 'LangChain', 'OpenAI'],
      gradient: 'from-blue-600 to-indigo-700',
      category: 'AI',
      imageUrl: 'rag-assistant.png',
      videoUrl: 'demo.mp4',
      features: [
        'Hybrid retrieval combining semantic (vector) and lexical (FTS) search',
        'Real-time orchestration between RAG, web search, and standard LLM modes',
        'Document upload and analysis pipeline with chunking and embeddings',
        'Interactive React interface with authentication and conversation history',
        'Flask REST API backend with PostgreSQL data management',
        'Dynamic and verified AI responses with cited sources',
        'Agile development workflow using Trello, Git, and collaborative reviews'
      ],
    },
    {
      title: 'RackManager (FreeLance)',
      description: 'A rack & asset management web app for datacenters—inventory by U-position, work orders, QR labels, and role-based access.',
      fullDescription: 'Designed and shipped a production-ready app with Angular 17 on the frontend and a Spring Boot 3 REST API secured by JWT (access/refresh). The system models sites, rows, racks, and devices with a visual U-map, supports work orders (install/move/remove), bulk CSV import/export, and QR deep links. Deployed with Docker Compose (app + DB + reverse proxy) and environment-based configs.',
      tags: ['Angular', 'TypeScript', 'Spring Boot', 'Java', 'JWT', 'PostgreSQL', 'Docker', 'Nginx'],
      gradient: 'from-emerald-500 to-sky-600',
      category: 'Web',
      imageUrl: 'rackmanager.png',
      features: [
        'Visual rack U-map with drag-to-slot and collision checks',
        'JWT auth (access/refresh) and route guards',
        'Fast search & filters with virtual scrolling',
        'Work orders with statuses, timestamps, and audit trail',
        'CSV import/export and bulk edits',
        'Responsive UI with Angular Forms and reusable components'
      ],
    },
    {
      title: 'ConvoZoom',
      description: 'AI-first real-estate platform that automates lead intake from CRM/web, engages prospects via a multilingual assistant, routes them to the right agent, and tracks the pipeline end-to-end to boost conversion and speed.',
      fullDescription: 'ConvoZoom streamlines the real-estate sales journey: new leads flow in from Bitrix24/Salesforce/web forms and appear in under a minute; an EN/AR AI greets them, asks qualifying questions, produces a structured summary, and recommends matching properties. Assignment rules pick the best agent (with manager override), instant alerts go out, and agents work from a dashboard with AI notes, chat logs, and documents. Leads advance through New → In Progress → Qualified → Won/Lost, with daily CSV analytics, tenant admin, full audit, and multi-tenant isolation. The vision extends to market-aware property matching (e.g., DLD data), immersive tours/AI avatar calls, and automated deal flows—reducing costs while increasing throughput.',
      tags: ['Angular', 'TypeScript', 'Node.js', 'Keycloak', 'Docker', 'Nginx', 'HTML', 'SCSS'],
      gradient: 'from-fuchsia-600 to-indigo-600',
      category: 'Web',
      imageUrl: 'convozoom.png',
      features: [
        'Keycloak SSO (OIDC) with role-based access (Admin/Host/Guest)',
        'Create/join rooms with short invite links',
        'Live chat with emojis and file attachments',
        'Screen sharing and device switching (camera/mic)',
        'Host controls: lobby, lock room, mute/remove participants',
        'Audit logs and basic usage stats',
        'Dockerized deployment with Nginx reverse proxy and HTTPS',
        'Responsive PWA-ready UI'
      ],
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProjectClick = (project: any) => {
    navigate('/project-details', { state: { project } });
  };

  const ProjectCard = ({ project, index }: { project: any; index: number }) => {
    const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useCard3D();
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -10, scale: 1.02 }}
        onClick={() => handleProjectClick(project)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary transition-spring cursor-pointer perspective-1000"
      >
        {/* Gradient Header */}
        <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
          {/* Project Image - Always Visible */}
          {project.imageUrl ? (
            <>
              <img
                src={`/${project.imageUrl}`}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-card/20 to-transparent" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
            </>
          )}
          
          {/* Category Badge */}
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-white/95 text-gray-900 backdrop-blur-sm font-medium px-3 py-1 shadow-lg border border-white/20">
              {project.category}
            </Badge>
          </div>
          
          {/* Animated gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            initial={false}
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4" style={{ transform: 'translateZ(20px)' }}>
          <h3 className="font-display text-xl font-semibold text-foreground group-hover:gradient-text transition-smooth">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag: string) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-3 py-1 bg-muted rounded-lg text-xs font-medium text-foreground border border-border group-hover:border-primary/50 transition-smooth"
              >
                {tag}
              </motion.span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-3 py-1 text-xs font-medium text-primary">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* Hover Indicator */}
          <div className="pt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-smooth">
            <span className="text-sm font-medium">View Details</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="projects" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Showcasing innovative solutions and creative implementations
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto mb-12 space-y-6"
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search projects by name, description, or technology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 bg-card border-border focus:border-primary transition-smooth"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 transition-spring ${
                  selectedCategory === category
                    ? 'bg-gradient-primary text-white hover:opacity-90'
                    : 'hover:bg-primary hover:text-white'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg">
              No projects found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
