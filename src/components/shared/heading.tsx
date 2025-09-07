import { cn } from '@/lib/utils';

interface HeadingProps {
  title: string;
  className?: string;
}

export default function Heading({ title, className }: HeadingProps) {
  return (
    <h2 className={cn("text-4xl md:text-5xl font-bold text-center mb-12 lg:mb-16 font-headline text-neon", className)}>
      {title}
    </h2>
  );
}
