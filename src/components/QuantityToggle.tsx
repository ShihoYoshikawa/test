import { Quantity } from '../types';

interface QuantityToggleProps {
  value: Quantity;
  onChange: (quantity: Quantity) => void;
}

const quantities: Quantity[] = ['少なめ', '普通', '多め'];

export function QuantityToggle({ value, onChange }: QuantityToggleProps) {
  return (
    <div className="inline-flex rounded-lg glassmorphism overflow-hidden">
      {quantities.map((qty, index) => (
        <button
          key={qty}
          onClick={() => onChange(qty)}
          className={`
            px-3 py-1.5 text-xs transition-all duration-200
            ${index !== 0 ? 'border-l border-white/10' : ''}
            ${
              value === qty
                ? 'bg-cyan-500/30 text-cyan-300 neon-border-blue'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
            }
          `}
        >
          {qty}
        </button>
      ))}
    </div>
  );
}
