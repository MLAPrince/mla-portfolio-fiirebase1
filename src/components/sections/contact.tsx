
"use client";

import React, { useEffect, useRef, useState } from 'react';
import SectionWrapper from '../shared/section-wrapper';
import Heading from '../shared/heading';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { submitContactForm } from '@/actions/contact';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import ContactBackground from '../3d/contact-background';

const socialLinks = [
  { icon: Github, href: 'https://github.com/MLAPrince' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/mohiudeen-52bb35175' },
  { icon: Mail, href: 'mailto:hafizismail298@gmail.com' },
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full font-bold text-lg hover:glow-primary transition-all duration-300">
      {pending ? (
        <>
          <div className="w-5 h-5 border-2 border-background rounded-full border-t-transparent animate-spin mr-2"></div>
          Sending...
        </>
      ) : (
        <>
          Send Message <Send className="ml-2" />
        </>
      )}
    </Button>
  );
}

export default function Contact() {
  const initialState = { success: false, message: '' };
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        setShowSuccess(true);
        formRef.current?.reset();
        setTimeout(() => setShowSuccess(false), 5000); // Hide success message after 5s
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: state.message,
        });
      }
    }
  }, [state, toast]);

  return (
    <SectionWrapper id="contact" className="relative">
      <ContactBackground />
      <div className="relative z-10">
        <Heading title="Get In Touch" />
        <div className="grid md:grid-cols-5 gap-10">
          <div className="md:col-span-3">
            <Card className="glassmorphism">
              <CardContent className="p-6 md:p-8 relative">
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute inset-0 z-10 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg"
                    >
                      <div className="text-center p-4">
                        <h3 className="font-headline text-2xl font-bold mb-2 text-primary">Success!</h3>
                        <p className="text-foreground/90">{state.message}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <form ref={formRef} action={formAction} className="space-y-6">
                  <Input name="name" type="text" placeholder="Your Name" required className="bg-background/50 text-base" />
                  <Input name="email" type="email" placeholder="Your Email" required className="bg-background/50 text-base" />
                  <Textarea name="message" placeholder="Your Message" required rows={6} className="bg-background/50 text-base" />
                  <SubmitButton />
                </form>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2 flex flex-col justify-center items-center md:items-start">
              <h3 className="font-headline text-2xl font-bold mb-4 text-primary">Connect with me</h3>
              <p className="text-foreground/80 mb-6 text-center md:text-left">
                I'm open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <div className="flex gap-6">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/80 hover:text-accent transition-colors hover:glow-accent"
                    initial={{ y: 0 }}
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror', delay: index * 0.2 }}
                  >
                    <link.icon size={32} />
                  </motion.a>
                ))}
              </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
