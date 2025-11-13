import { createContext, useContext, useState, ReactNode } from 'react';

export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';

interface TransitionConfig {
  type: TransitionType;
  duration: number;
}

interface TransitionContextType {
  transitionConfig: TransitionConfig;
  setTransitionType: (type: TransitionType) => void;
  setTransitionDuration: (duration: number) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [transitionConfig, setTransitionConfig] = useState<TransitionConfig>({
    type: 'fade',
    duration: 0.6,
  });

  const setTransitionType = (type: TransitionType) => {
    setTransitionConfig(prev => ({ ...prev, type }));
  };

  const setTransitionDuration = (duration: number) => {
    setTransitionConfig(prev => ({ ...prev, duration }));
  };

  return (
    <TransitionContext.Provider value={{ transitionConfig, setTransitionType, setTransitionDuration }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
}
