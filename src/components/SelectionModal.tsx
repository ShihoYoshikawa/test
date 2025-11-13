import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function SelectionModal({ isOpen, onClose, title, children }: SelectionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
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
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
