import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { useTransition, TransitionType } from '../contexts/TransitionContext';

interface ScreenTransitionProps {
  children: ReactNode;
  screenKey: string;
}

export function ScreenTransition({ children, screenKey }: ScreenTransitionProps) {
  const { transitionConfig } = useTransition();

  const getTransitionVariants = (type: TransitionType) => {
    const duration = transitionConfig.duration;

    switch (type) {
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration }
        };

      case 'slide':
        return {
          initial: { x: '100%', opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: '-100%', opacity: 0 },
          transition: { duration, ease: [0.4, 0, 0.2, 1] }
        };

      case 'scale':
        return {
          initial: { scale: 0.8, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 1.2, opacity: 0 },
          transition: { duration, ease: [0.4, 0, 0.2, 1] }
        };

      case 'blur':
        return {
          initial: { opacity: 0, filter: 'blur(10px)' },
          animate: { opacity: 1, filter: 'blur(0px)' },
          exit: { opacity: 0, filter: 'blur(10px)' },
          transition: { duration }
        };

      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration }
        };
    }
  };

  const variants = getTransitionVariants(transitionConfig.type);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={screenKey}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        transition={variants.transition}
        className="absolute inset-0"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
