import { Github, Linkedin, Mail } from 'lucide-react';
import Logo from '../shared/logo';

const socialLinks = [
  { icon: Github, href: 'https://github.com/MLAPrince' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/mohiudeen-52bb35175' },
  { icon: Mail, href: 'mailto:hafizismail298@gmail.com' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 border-t border-border/20 glassmorphism">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Logo />
        <p className="text-sm text-foreground/70">
          © {currentYear} Mohiudeen. All Rights Reserved.
        </p>
        <div className="flex gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors hover:glow-primary"
            >
              <link.icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
