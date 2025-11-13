import { Material, Quantity } from '../types';
import { QuantityToggle } from './QuantityToggle';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';

interface MaterialCardProps {
  material: Material;
  selectedQuantity?: Quantity;
  onSelect: (quantity: Quantity) => void;
  disabled?: boolean;
}

const categoryColors = {
  spirit: 'from-orange-500/20 to-red-500/20',
  citrus: 'from-yellow-500/20 to-green-500/20',
  syrup: 'from-pink-500/20 to-purple-500/20',
  bitter: 'from-gray-500/20 to-slate-500/20',
  other: 'from-blue-500/20 to-cyan-500/20'
};

export function MaterialCard({ material, selectedQuantity, onSelect, disabled }: MaterialCardProps) {
  const isSelected = !!selectedQuantity;
  const isOutOfStock = material.stock === 0;

  return (
    <motion.div
      layout
      whileHover={!disabled && !isOutOfStock ? { y: -4 } : {}}
      className={`
        relative p-4 rounded-2xl transition-all duration-300
        ${isSelected ? 'glassmorphism-strong neon-border-blue' : 'glassmorphism'}
        ${disabled || isOutOfStock ? 'opacity-40' : 'hover:shadow-xl'}
        bg-gradient-to-br ${categoryColors[material.category]}
      `}
    >
      {material.isSpecial && (
        <div className="absolute top-2 right-2">
          <Badge variant="outline" className="neon-text-pink border-pink-500/50 bg-pink-500/10 text-xs">
            Special
          </Badge>
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center text-2xl">
            {material.icon}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-white">{material.name}</h3>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {material.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="text-xs text-gray-400">
              {material.stock === 'unlimited' ? (
                <span className="text-green-400">∞</span>
              ) : (
                <span className={material.stock === 0 ? 'text-red-400' : 'text-yellow-400'}>
                  ×{material.stock}
                </span>
              )}
            </div>

            {!disabled && !isOutOfStock && (
              <QuantityToggle
                value={selectedQuantity || '普通'}
                onChange={onSelect}
              />
            )}

            {isOutOfStock && (
              <span className="text-xs text-red-400">在庫切れ</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
