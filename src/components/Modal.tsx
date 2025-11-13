import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        className="relative w-full sm:w-auto sm:min-w-[400px] sm:max-w-lg glassmorphism-strong rounded-t-3xl sm:rounded-3xl p-6 slide-up max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-xl">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

interface SelectableItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  selected?: boolean;
  onClick: () => void;
}

export const SelectableItem: React.FC<SelectableItemProps> = ({
  icon,
  title,
  subtitle,
  selected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full glassmorphism rounded-xl p-4 transition-all duration-200
        flex items-center gap-4 text-left
        ${selected ? 'neon-border-blue' : 'border-white/10 hover:border-white/30'}
      `}
    >
      <div className="text-3xl">{icon}</div>
      <div className="flex-1">
        <div className="text-white font-semibold">{title}</div>
        {subtitle && <div className="text-gray-400 text-sm">{subtitle}</div>}
      </div>
      {selected && (
        <div className="text-neon-blue text-xl">✓</div>
      )}
    </button>
  );
};
