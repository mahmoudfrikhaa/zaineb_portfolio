import { motion } from 'framer-motion';
import { usePerfMode } from '@/hooks/use-perf';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const { isLowPower } = usePerfMode();
  return (
    <motion.div
      initial={isLowPower ? { opacity: 0 } : { opacity: 0, filter: 'blur(10px)', y: 20 }}
      animate={isLowPower ? { opacity: 1 } : { opacity: 1, filter: 'blur(0px)', y: 0 }}
      exit={isLowPower ? { opacity: 0 } : { opacity: 0, filter: 'blur(10px)', y: -20 }}
      transition={isLowPower ? { duration: 0.25, ease: 'easeOut' } : {
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9],
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
