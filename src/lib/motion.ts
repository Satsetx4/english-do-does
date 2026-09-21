import type { Transition, Variants } from 'framer-motion';

// Natural Spring Physics as per User Identity rules (stiffness 300-400, damping 25-30)
export const springPhysics: Transition = {
  type: 'spring',
  stiffness: 380,
  damping: 28,
  mass: 0.8,
};

export const snappyTransition: Transition = {
  duration: 0.18,
  ease: [0.16, 1, 0.3, 1],
};

export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springPhysics,
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.14 },
  },
};

export const popVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springPhysics,
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.12 },
  },
};

export const containerStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

export const cardTap = {
  scale: 0.98,
  y: 1,
};

export const cardHover = {
  y: -3,
  transition: { duration: 0.16 },
};
