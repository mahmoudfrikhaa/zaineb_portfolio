import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSiteData } from '@/hooks/use-site-data';
import logo from '@/assets/Logo zaineb.svg';
import { usePerfMode } from '@/hooks/use-perf';

const PageLoader = () => {
  const { isLowPower } = usePerfMode();
  const { data } = useSiteData();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, isLowPower ? 1500 : 2500);

    return () => clearTimeout(timer);
  }, [isLowPower]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="relative flex flex-col items-center justify-center">
            {/* Animated Background Circles */}
            {!isLowPower && (
              <>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-40 h-40 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
                </motion.div>
                <motion.div
                  animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [360, 180, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-40 h-40 rounded-full bg-gradient-secondary opacity-20 blur-3xl" />
                </motion.div>
              </>
            )}

            {/* Logo Animation - CENTERED */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 1
              }}
              className="relative z-10 flex items-center justify-center mb-8"
            >
              <motion.img
                src={data?.site?.logo ?? '/Logo zaineb.svg'}
                alt="Loading..."
                className="w-40 h-40 object-contain"
                animate={isLowPower ? undefined : {
                  filter: [
                    'drop-shadow(0 0 20px hsl(237 42% 43% / 0.6))',
                    'drop-shadow(0 0 40px hsl(302 32% 45% / 0.8))',
                    'drop-shadow(0 0 20px hsl(237 42% 43% / 0.6))',
                  ]
                }}
                transition={isLowPower ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Loading Text - BELOW LOGO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center z-10"
            >
              <motion.p
                className="font-display text-xl gradient-text"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Loading Experience...
              </motion.p>
            </motion.div>

            {/* Loading Bar */}
            <motion.div
              className="w-64 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: isLowPower ? 1.5 : 2.5, ease: "easeInOut" }}
                className="h-1 bg-gradient-primary rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
