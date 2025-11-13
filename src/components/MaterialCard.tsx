import React, { useState } from 'react';
import { Material, AmountLevel } from '../types';

interface MaterialCardProps {
  material: Material;
  selectedAmount?: AmountLevel;
  onSelect: (amount: AmountLevel) => void;
  disabled?: boolean;
}

const AMOUNT_LABELS: Record<AmountLevel, string> = {
  less: '少なめ',
  normal: '普通',
  more: '多め',
};

const TAG_LABELS: Record<string, string> = {
  sweet: '甘い',
  sour: '酸味',
  bitter: '苦味',
  aromatic: '香り',
  strong: '強い',
  refreshing: '爽やか',
};

const CATEGORY_COLORS: Record<string, string> = {
  spirit: 'neon-border-blue',
  citrus: 'neon-border-pink',
  syrup: 'neon-border-purple',
  bitter: 'border-red-500/60',
  liqueur: 'neon-border-pink',
  other: 'border-gray-500/60',
};

export const MaterialCard: React.FC<MaterialCardProps> = ({
  material,
  selectedAmount,
  onSelect,
  disabled = false,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const isSelected = selectedAmount !== undefined;
  const isOutOfStock = material.isSpecial && material.stockCount === 0;
  const isDisabled = disabled || isOutOfStock;

  const handleAmountClick = (amount: AmountLevel) => {
    if (isDisabled) return;
    onSelect(amount);
  };

  return (
    <div
      className={`
        glassmorphism rounded-2xl p-4 transition-all duration-300
        ${isSelected ? CATEGORY_COLORS[material.category] : 'border-white/10'}
        ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:scale-[1.02]'}
        ${isHovering && !isDisabled ? 'shadow-lg' : ''}
        ${isSelected ? 'float-up' : ''}
      `}
      onMouseEnter={() => !isDisabled && setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="text-4xl w-10 h-10 flex items-center justify-center">
          {material.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Name and Stock */}
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-white font-bold text-base truncate">
              {material.name}
            </h3>
            {material.isSpecial && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-neon-pink/20 text-neon-pink border border-neon-pink/40">
                Special
              </span>
            )}
            {material.isSpecial && material.stockCount !== undefined && (
              <span className="text-xs text-gray-400">
                x{material.stockCount}
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="flex gap-1 mb-3 flex-wrap">
            {material.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300 border border-white/20"
              >
                {TAG_LABELS[tag]}
              </span>
            ))}
          </div>

          {/* Amount Selection */}
          <div className="flex gap-1">
            {(['less', 'normal', 'more'] as AmountLevel[]).map((amount, index) => (
              <button
                key={amount}
                onClick={() => handleAmountClick(amount)}
                disabled={isDisabled}
                className={`
                  flex-1 py-1.5 text-xs font-medium transition-all duration-200
                  ${index === 0 ? 'rounded-l-lg' : ''}
                  ${index === 2 ? 'rounded-r-lg' : ''}
                  ${
                    selectedAmount === amount
                      ? 'bg-neon-blue/30 text-neon-blue border-2 border-neon-blue/60'
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                  }
                  ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {AMOUNT_LABELS[amount]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Out of Stock Overlay */}
      {isOutOfStock && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl">
          <span className="text-red-400 font-bold">在庫切れ</span>
        </div>
      )}
    </div>
  );
};
