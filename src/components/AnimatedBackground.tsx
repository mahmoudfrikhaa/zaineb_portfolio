import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const AnimatedBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate particles
    const particleCount = 50;
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 2,
      });
    }
    
    setParticles(newParticles);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Black Background Base */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-radial opacity-60" />
      </div>

      {/* Large Animated Red Gradient Orbs */}
      <motion.div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
        style={{
          background: 'radial-gradient(circle, hsl(0 90% 50%) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-25"
        style={{
          background: 'radial-gradient(circle, hsl(0 100% 55%) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, -150, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-0 left-1/3 w-[550px] h-[550px] rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(0 85% 45%) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.1, 1.2, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Mouse-following red gradient */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(0 90% 50%) 0%, transparent 70%)',
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 100,
        }}
      />

      {/* Floating Particles - Red themed */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `hsl(${Math.random() * 15} ${80 + Math.random() * 20}% ${45 + Math.random() * 15}%)`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay">
        <svg className="w-full h-full">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Animated Lines - Red gradient */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(0 90% 50%)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="hsl(0 100% 55%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(0 85% 45%)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {[...Array(5)].map((_, i) => (
          <motion.path
            key={i}
            d={`M ${i * 300} 0 Q ${i * 300 + 150} ${200 + i * 100} ${i * 300 + 300} ${i * 150}`}
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default AnimatedBackground;
