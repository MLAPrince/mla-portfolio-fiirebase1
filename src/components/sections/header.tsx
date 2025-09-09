"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Logo from '@/components/shared/logo';
import ThemeToggle from '@/components/shared/theme-toggle';
import ScrollProgress from '@/components/shared/scroll-progress';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  // { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  // { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <ScrollProgress />
      <header
        className={cn(
          'fixed top-0 z-40 w-full transition-all duration-300',
           scrolled ? 'py-2' : 'py-4'
        )}
      >
        <div
          className={cn(
            'absolute inset-0 w-full h-full transition-all duration-300',
            scrolled ? 'glassmorphism' : ''
          )}
        />
        <nav className="container mx-auto flex items-center justify-between relative z-10 px-4">
          <Logo />
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} passHref>
                <motion.span
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group"
                  whileHover="hover"
                >
                  {link.name}
                  <motion.div
                    className="absolute bottom-[-4px] left-0 h-0.5 bg-primary"
                    initial={{ width: 0 }}
                    variants={{ hover: { width: '100%' } }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.span>
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger className="md:hidden p-2">
                <Menu />
                <span className="sr-only">Open menu</span>
              </SheetTrigger>
              <SheetContent side="right" className="glassmorphism p-6">
                 <div className="flex flex-col items-center justify-center h-full gap-8">
                    {navLinks.map((link) => (
                      <Link key={link.name} href={link.href} passHref>
                        <span
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-2xl font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {link.name}
                        </span>
                      </Link>
                    ))}
                 </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </>
  );
}
