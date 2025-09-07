"use client";

import React, { useEffect, useRef } from 'react';
import SectionWrapper from '../shared/section-wrapper';
import Heading from '../shared/heading';
import { Card, CardContent } from '../ui/card';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '../ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { Quote } from 'lucide-react';

const testimonials = [
  { text: "Reference/Review Coming Soon.", author: "Future Collaborator" },
  { text: "An excellent and dedicated developer. Highly recommended.", author: "Future Client" },
  { text: "Working with Mohiudeen was a great experience. Very professional.", author: "Future Colleague" },
];

export default function Testimonials() {
  const [api, setApi] = React.useState<CarouselApi>()
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  useEffect(() => {
    if (!api) {
      return
    }
  }, [api])

  return (
    <SectionWrapper id="testimonials">
      <Heading title="Testimonials" />
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full max-w-2xl mx-auto"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="glassmorphism overflow-hidden">
                  <CardContent className="flex flex-col items-center justify-center p-8 text-center relative">
                    <Quote className="absolute top-4 left-4 w-10 h-10 text-primary/30" />
                    <p className="text-lg md:text-xl font-medium text-foreground/90 z-10">
                      "{testimonial.text}"
                    </p>
                    <p className="mt-4 font-headline text-base text-accent z-10">
                      - {testimonial.author}
                    </p>
                     <Quote className="absolute bottom-4 right-4 w-10 h-10 text-primary/30 transform scale-x-[-1]" />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </SectionWrapper>
  );
}
