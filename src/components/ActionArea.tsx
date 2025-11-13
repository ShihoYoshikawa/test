import React from 'react';

interface ActionAreaProps {
  onBack: () => void;
  onReset: () => void;
  onGlassSelect: () => void;
  onTechniqueSelect: () => void;
  onNext: () => void;
  canProceed: boolean;
}

export const ActionArea: React.FC<ActionAreaProps> = ({
  onBack,
  onReset,
  onGlassSelect,
  onTechniqueSelect,
  onNext,
  canProceed,
}) => {
  return (
    <div className="glassmorphism-strong rounded-t-3xl p-4 space-y-3">
      {/* Top Row: Glass and Technique */}
      <div className="flex gap-2">
        <button
          onClick={onGlassSelect}
          className="flex-1 glassmorphism rounded-xl py-3 px-4 text-white font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2"
        >
          <span className="text-xl">🥃</span>
          <span>グラス選択</span>
        </button>
        <button
          onClick={onTechniqueSelect}
          className="flex-1 glassmorphism rounded-xl py-3 px-4 text-white font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2"
        >
          <span className="text-xl">🧊</span>
          <span>技法選択</span>
        </button>
      </div>

      {/* Bottom Row: Back, Reset, Next */}
      <div className="flex gap-2">
        <button
          onClick={onBack}
          className="glassmorphism rounded-xl py-3 px-4 text-gray-300 font-medium hover:bg-white/10 transition-all"
        >
          ← 戻る
        </button>
        <button
          onClick={onReset}
          className="glassmorphism rounded-xl py-3 px-4 text-gray-300 font-medium hover:bg-white/10 transition-all"
        >
          リセット
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`
            flex-1 rounded-xl py-3 px-6 font-bold text-lg transition-all
            ${
              canProceed
                ? 'neon-border-blue bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 glow-pulse'
                : 'bg-white/5 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          次へ →
        </button>
      </div>
    </div>
  );
};
