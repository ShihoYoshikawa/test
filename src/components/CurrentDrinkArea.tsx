import React from 'react';
import { SelectedMaterial, Glass, Technique } from '../types';
import { FlavorBars } from './FlavorBar';

interface CurrentDrinkAreaProps {
  selectedMaterials: SelectedMaterial[];
  glass?: Glass;
  technique?: Technique;
}

const AMOUNT_LABELS: Record<string, string> = {
  less: '少',
  normal: '普',
  more: '多',
};

export const CurrentDrinkArea: React.FC<CurrentDrinkAreaProps> = ({
  selectedMaterials,
  glass,
  technique,
}) => {
  // Calculate combined flavor profile
  const calculateFlavorProfile = () => {
    const profile = { sweet: 0, sour: 0, bitter: 0, strong: 0 };

    selectedMaterials.forEach(({ material, amount }) => {
      const multiplier = amount === 'less' ? 0.5 : amount === 'more' ? 1.5 : 1.0;
      profile.sweet += material.flavorProfile.sweet * multiplier;
      profile.sour += material.flavorProfile.sour * multiplier;
      profile.bitter += material.flavorProfile.bitter * multiplier;
      profile.strong += material.flavorProfile.strong * multiplier;
    });

    // Normalize to 0-100 range (assuming max 4 materials with "more" = max 600)
    const normalize = (value: number) => Math.min(100, (value / 6));

    return {
      sweet: normalize(profile.sweet),
      sour: normalize(profile.sour),
      bitter: normalize(profile.bitter),
      strong: normalize(profile.strong),
    };
  };

  const flavorProfile = calculateFlavorProfile();
  const hasSpecialMaterial = selectedMaterials.some(sm => sm.material.isSpecial);

  return (
    <div className="glassmorphism-strong rounded-2xl p-4 space-y-4">
      {/* Selected Materials Display */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-bold text-lg">カレントドリンク</h2>
          {hasSpecialMaterial && (
            <span className="text-xs px-3 py-1 rounded-full bg-neon-pink/20 text-neon-pink border border-neon-pink/40 animate-pulse">
              ✨ Special
            </span>
          )}
        </div>

        <div className="flex gap-2 mb-4">
          {/* Material Slots */}
          {[0, 1, 2, 3].map((index) => {
            const selected = selectedMaterials[index];
            return (
              <div
                key={index}
                className={`
                  flex-1 aspect-square rounded-xl flex flex-col items-center justify-center
                  transition-all duration-300
                  ${
                    selected
                      ? 'glassmorphism neon-border-blue'
                      : 'bg-white/5 border border-white/20'
                  }
                `}
              >
                {selected ? (
                  <>
                    <div className="text-2xl mb-1">{selected.material.icon}</div>
                    <div className="text-xs text-neon-blue font-medium">
                      {AMOUNT_LABELS[selected.amount]}
                    </div>
                  </>
                ) : (
                  <div className="text-4xl text-white/20">+</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Glass and Technique */}
        <div className="flex gap-2">
          <div
            className={`
              flex-1 rounded-lg p-2 flex items-center justify-center gap-2
              ${glass ? 'glassmorphism' : 'bg-white/5'}
            `}
          >
            {glass ? (
              <>
                <span className="text-lg">{glass.icon}</span>
                <span className="text-xs text-gray-300">{glass.name}</span>
              </>
            ) : (
              <span className="text-xs text-gray-500">グラス未選択</span>
            )}
          </div>
          <div
            className={`
              flex-1 rounded-lg p-2 flex items-center justify-center gap-2
              ${technique ? 'glassmorphism' : 'bg-white/5'}
            `}
          >
            {technique ? (
              <>
                <span className="text-lg">{technique.icon}</span>
                <span className="text-xs text-gray-300">{technique.name}</span>
              </>
            ) : (
              <span className="text-xs text-gray-500">技法未選択</span>
            )}
          </div>
        </div>
      </div>

      {/* Flavor Bars */}
      <div>
        <h3 className="text-white font-semibold text-sm mb-2">Flavor Profile</h3>
        <FlavorBars
          sweet={flavorProfile.sweet}
          sour={flavorProfile.sour}
          bitter={flavorProfile.bitter}
          strong={flavorProfile.strong}
        />
      </div>
    </div>
  );
};
