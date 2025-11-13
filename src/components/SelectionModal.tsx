import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface SelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onExitComplete?: () => void;
}

export function SelectionModal({ isOpen, onClose, title, children, onExitComplete }: SelectionModalProps) {
  // Snapshot of children to prevent re-renders during exit animation
  const childrenSnapshot = useRef<React.ReactNode>(null);
  const isFirstOpen = useRef(true);

  // Capture children when modal opens
  useEffect(() => {
    if (isOpen) {
      childrenSnapshot.current = children;
      isFirstOpen.current = false;
    }
  }, [isOpen, children]);

  const handleExitComplete = () => {
    // Clear snapshot after animation completes
    childrenSnapshot.current = null;
    onExitComplete?.();
  };

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={handleExitComplete}
    >
      {isOpen && (
        <div key={`modal-${title}`}>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          />
          <motion.div
            key="content"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] slide-up"
          >
            <div className="glassmorphism-strong rounded-t-3xl p-6 border-t-2 border-x-2 border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="neon-text-blue">{title}</h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full glassmorphism flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="overflow-y-auto max-h-[60vh]">
                {childrenSnapshot.current || children}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
