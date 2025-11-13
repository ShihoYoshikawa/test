import { SelectedMaterial, Glass, Technique } from '../types';
import { FlavorBar } from './FlavorBar';
import { motion, AnimatePresence } from 'framer-motion';

interface CurrentDrinkDisplayProps {
  selectedMaterials: SelectedMaterial[];
  selectedGlass?: Glass;
  selectedTechnique?: Technique;
  onGlassClick: () => void;
  onTechniqueClick: () => void;
}

export function CurrentDrinkDisplay({
  selectedMaterials,
  selectedGlass,
  selectedTechnique,
  onGlassClick,
  onTechniqueClick
}: CurrentDrinkDisplayProps) {
  const calculateFlavor = () => {
    const quantityMultiplier = {
      '少なめ': 0.5,
      '普通': 1,
      '多め': 1.5
    };

    const totals = selectedMaterials.reduce(
      (acc, { material, quantity }) => {
        const multiplier = quantityMultiplier[quantity];
        return {
          sweet: acc.sweet + material.flavorImpact.sweet * multiplier,
          sour: acc.sour + material.flavorImpact.sour * multiplier,
          bitter: acc.bitter + material.flavorImpact.bitter * multiplier,
          strength: acc.strength + material.flavorImpact.strength * multiplier
        };
      },
      { sweet: 0, sour: 0, bitter: 0, strength: 0 }
    );

    return totals;
  };

  const flavors = calculateFlavor();
  const hasSpecial = selectedMaterials.some(sm => sm.material.isSpecial);

  return (
    <div className="glassmorphism-strong rounded-3xl p-6 space-y-6 border-2 border-white/10">
      {/* Selected Materials Display */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-white">現在の構成</h2>
          {hasSpecial && (
            <span className="neon-text-pink text-xs">★ Special</span>
          )}
        </div>

        <div className="flex gap-3 min-h-[60px]">
          <AnimatePresence mode="popLayout">
            {selectedMaterials.map(({ material, quantity }) => (
              <motion.div
                key={material.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-14 h-14 rounded-full glassmorphism-strong neon-border-blue flex items-center justify-center text-2xl">
                  {material.icon}
                </div>
                <span className="text-xs text-cyan-300">{quantity}</span>
              </motion.div>
            ))}
            {[...Array(Math.max(0, 4 - selectedMaterials.length))].map((_, i) => (
              <div
                key={`empty-${i}`}
                className="w-14 h-14 rounded-full border-2 border-dashed border-gray-600/50 flex items-center justify-center"
              >
                <span className="text-gray-600 text-xs">+</span>
              </div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Glass and Technique */}
      <div className="flex gap-4 text-sm">
        <button
          onClick={onGlassClick}
          className="flex items-center gap-2 glassmorphism px-3 py-2 rounded-lg flex-1 hover:bg-white/10 transition-colors active:scale-95"
        >
          <span className="text-xl">{selectedGlass?.icon || '🥃'}</span>
          <span className="text-gray-300 text-xs">{selectedGlass?.name || 'グラス未選択'}</span>
        </button>
        <button
          onClick={onTechniqueClick}
          className="flex items-center gap-2 glassmorphism px-3 py-2 rounded-lg flex-1 hover:bg-white/10 transition-colors active:scale-95"
        >
          <span className="text-xl">{selectedTechnique?.icon || '🥄'}</span>
          <span className="text-gray-300 text-xs">{selectedTechnique?.name || '技法未選択'}</span>
        </button>
      </div>

      {/* Flavor Bars */}
      <div className="space-y-3">
        <FlavorBar label="甘さ" value={flavors.sweet} color="pink" />
        <FlavorBar label="酸味" value={flavors.sour} color="yellow" />
        <FlavorBar label="苦味" value={flavors.bitter} color="purple" />
        <FlavorBar label="強さ" value={flavors.strength} color="blue" />
      </div>
    </div>
  );
}
