"use client";

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const Ripple = ({ x, y, onComplete }: { x: number; y: number; onComplete: () => void }) => (
  <motion.div
    className="absolute pointer-events-none rounded-full border-2 border-accent"
    style={{
      top: y,
      left: x,
      translateX: '-50%',
      translateY: '-50%',
      width: '30px',
      height: '30px',
    }}
    initial={{ scale: 0.5, opacity: 1 }}
    animate={{ scale: 2, opacity: 0 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    onAnimationComplete={onComplete}
  />
);

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const removeRipple = useCallback((id: number) => {
    setRipples(prev => prev.filter(r => r.id !== id));
  }, []);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      const target = e.target as HTMLElement;
      if (target) {
        setIsPointer(
          window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer'
        );
      }
    };

    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples(prev => [...prev, newRipple]);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleClick);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleClick);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <AnimatePresence>
        {ripples.map(({ id, x, y }) => (
          <Ripple key={id} x={x} y={y} onComplete={() => removeRipple(id)} />
        ))}
      </AnimatePresence>
      <motion.div
        className="hidden md:block fixed top-0 left-0 pointer-events-none z-[101]"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
      >
        <motion.div
          className="w-3 h-3 rounded-full bg-accent -translate-x-1/2 -translate-y-1/2"
          style={{
            boxShadow: '0 0 12px hsl(var(--accent)), 0 0 20px hsl(var(--accent))',
          }}
          animate={{
            scale: isPointer ? 2.5 : 1,
            backgroundColor: isPointer ? 'hsla(var(--accent), 0.5)' : 'hsl(var(--accent))'
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
}
