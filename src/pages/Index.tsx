import { lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import PageLoader from '@/components/PageLoader';
import AnimatedBackground from '@/components/AnimatedBackground';
import PageTransition from '@/components/PageTransition';

// Lazy load components that are below the fold
const About = lazy(() => import('@/components/About'));
const Skills = lazy(() => import('@/components/Skills'));
const Projects = lazy(() => import('@/components/Projects'));
const Experience = lazy(() => import('@/components/Experience'));
const Contact = lazy(() => import('@/components/Contact'));
const Footer = lazy(() => import('@/components/Footer'));

// Loading fallback component
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <PageTransition>
      <PageLoader />
      <AnimatedBackground />
      <div className="min-h-screen bg-background text-foreground relative">
        <Navigation />
        <main>
          <Hero />
          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Skills />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Experience />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </PageTransition>
  );
};

export default Index;
