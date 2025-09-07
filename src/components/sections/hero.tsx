"use client";

import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import HeroBackground from '../3d/hero-background';
import { useEffect, useState } from 'react';

const subtitles = ["Aspiring Software Engineer", "MERN Developer", "Tech Enthusiast"];

const Typewriter = () => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    const typingSpeed = isDeleting ? 75 : 150;
    const currentSubtitle = subtitles[index];

    const handleTyping = () => {
      setText(
        isDeleting
          ? currentSubtitle.substring(0, text.length - 1)
          : currentSubtitle.substring(0, text.length + 1)
      );

      if (!isDeleting && text === currentSubtitle) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % subtitles.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, index]);
  
  return (
    <h2 className="font-headline text-2xl md:text-3xl text-foreground/80 min-h-[40px]">
      {text}
      <span className="animate-pulse text-primary">|</span>
    </h2>
  );
};


export default function Hero() {
  return (
    <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground />
      <div className="relative z-10 text-center px-4">
        <motion.h1 
          className="font-headline font-bold text-6xl md:text-8xl lg:text-9xl text-neon"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Mohiudeen
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-4"
        >
          <Typewriter />
        </motion.div>
        <motion.div 
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Button asChild size="lg" className="font-bold text-lg hover:glow-primary transition-all duration-300">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">View Resume</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-bold text-lg border-2 border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300">
            <Link href="#contact">Contact Me</Link>
          </Button>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }}
      >
        <Link href="#about" aria-label="Scroll down">
          <ArrowDown className="w-8 h-8 text-primary" />
        </Link>
      </motion.div>
    </section>
  );
}
