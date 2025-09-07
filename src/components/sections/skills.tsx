"use client";

import SectionWrapper from '../shared/section-wrapper';
import Heading from '../shared/heading';
import { skills } from '@/lib/data';
import SkillCard from '../shared/skill-card';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <Heading title="My Skills" />
      <motion.div 
        className="flex flex-wrap justify-center gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {skills.map((skill, index) => (
          <motion.div key={index} variants={itemVariants}>
            <SkillCard icon={skill.icon} name={skill.name} />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
