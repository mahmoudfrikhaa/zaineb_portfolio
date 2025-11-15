import { motion } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSiteData } from '@/hooks/use-site-data';

const Footer = () => {
  const { data } = useSiteData();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-card border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Footer Content */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="font-display text-2xl font-bold gradient-text mb-4">{data?.footer?.brandName ?? 'Zaineb'}</h3>
              <p className="text-muted-foreground text-sm">
                {data?.footer?.tagline ?? 'Embedded Systems & Web Engineer crafting innovative and intelligent solutions.'}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
              <nav className="space-y-2">
                {(data?.footer?.quickLinks ?? ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact']).map((link: string) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="block text-sm text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {link}
                  </a>
                ))}
              </nav>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-display font-semibold text-foreground mb-4">Stay Updated</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Get notified about my latest projects, articles, and research updates.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button size="sm" className="bg-gradient-primary">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border mb-8" />

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              © {currentYear} {data?.footer?.brandName ?? 'Zaineb'}. {data?.footer?.copyright ?? 'All rights reserved'} • Made with <Heart className="h-4 w-4 text-red-500" />
            </p>

            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Button
          onClick={scrollToTop}
          size="icon"
          className="rounded-full bg-gradient-primary glow-primary hover:scale-110 transition-smooth"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </motion.div>
    </footer>
  );
};

export default Footer;
