"use client";

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { techIcons } from '../icons/tech-icons';
import { Badge } from '../ui/badge';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  imageUrl: string;
  aiHint: string;
  githubUrl: string;
  liveUrl: string;
}

export default function ProjectCard({
  title,
  description,
  tech,
  imageUrl,
  aiHint,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative w-full rounded-2xl glassmorphism group"
    >
      <div style={{ transform: 'translateZ(20px)' }} className="p-4 flex flex-col h-full">
        <div className="relative w-full h-48 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            data-ai-hint={aiHint}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
        </div>
        <div className="flex-grow pt-4">
          <h3 className="font-headline text-xl font-bold mb-2 text-primary">{title}</h3>
          <p className="text-foreground/80 text-sm mb-4">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((t) => {
            const Icon = techIcons[t];
            return (
              <Badge key={t} variant="secondary" className="flex items-center gap-1">
                {Icon && <Icon className="w-3 h-3" />}
                {t}
              </Badge>
            );
          })}
        </div>
        <div className="flex justify-end items-center gap-4">
          {githubUrl !== '#' && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors hover:glow-primary p-1 rounded-full">
              <Github size={24} />
            </a>
          )}
          {liveUrl !== '#' && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors hover:glow-primary p-1 rounded-full">
              <ExternalLink size={24} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
