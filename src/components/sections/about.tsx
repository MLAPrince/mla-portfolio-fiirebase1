import Image from 'next/image';
import SectionWrapper from '../shared/section-wrapper';
import Heading from '../shared/heading';
import { Card, CardContent } from '../ui/card';
import { CheckCircle } from 'lucide-react';

const interests = [
  "Web Development",
  "Software Development",
  "Machine Learning",
  "AI",
  "Mobile Apps"
];

export default function About() {
  return (
    <SectionWrapper id="about">
      <Heading title="About Me" />
      <Card className="glassmorphism">
        <CardContent className="p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
            <div className="relative w-full max-w-xs mx-auto md:max-w-none h-64 md:h-80 rounded-2xl overflow-hidden group">
              <Image
                src="https://picsum.photos/400/600"
                alt="Mohiudeen"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                data-ai-hint="portrait man"
                sizes="(max-width: 768px) 80vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent"></div>
            </div>
            <div className="md:col-span-2">
              <h3 className="font-headline text-2xl md:text-3xl font-bold mb-4 text-primary">Education & Interests</h3>
              <div className="mb-6">
                <p className="font-semibold text-lg text-foreground">BS Bioinformatics</p>
                <p className="text-foreground/80">University of Agriculture Faisalabad</p>
                <p className="text-foreground/70 text-sm">Sep 2021 – May 2025</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-foreground mb-3">My Interests</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {interests.map((interest) => (
                    <div key={interest} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-accent" />
                      <span className="text-foreground/90">{interest}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}
