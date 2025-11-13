import React, { useEffect, useRef } from 'react';

interface FlavorBarProps {
  label: string;
  value: number; // 0-100
  color: string;
  icon?: string;
}

const FLAVOR_LABELS: Record<string, string> = {
  sweet: '甘さ',
  sour: '酸味',
  bitter: '苦味',
  strong: '強さ',
};

const FLAVOR_COLORS: Record<string, { bg: string; glow: string }> = {
  sweet: { bg: 'bg-pink-500', glow: 'shadow-pink-500/50' },
  sour: { bg: 'bg-yellow-400', glow: 'shadow-yellow-400/50' },
  bitter: { bg: 'bg-orange-500', glow: 'shadow-orange-500/50' },
  strong: { bg: 'bg-red-500', glow: 'shadow-red-500/50' },
};

export const FlavorBar: React.FC<FlavorBarProps> = ({ label, value, color, icon }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (barRef.current && prevValueRef.current !== value) {
      // Trigger animation
      barRef.current.style.animation = 'none';
      setTimeout(() => {
        if (barRef.current) {
          barRef.current.style.animation = '';
        }
      }, 10);
      prevValueRef.current = value;
    }
  }, [value]);

  const colorConfig = FLAVOR_COLORS[color] || { bg: 'bg-blue-500', glow: 'shadow-blue-500/50' };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-300 flex items-center gap-1">
          {icon && <span>{icon}</span>}
          {FLAVOR_LABELS[label] || label}
        </span>
        <span className="text-gray-400">{Math.round(value)}</span>
      </div>
      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className={`absolute left-0 top-0 h-full ${colorConfig.bg} rounded-full transition-all duration-500 ease-out shadow-lg ${colorConfig.glow}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
};

interface FlavorBarsProps {
  sweet: number;
  sour: number;
  bitter: number;
  strong: number;
}

export const FlavorBars: React.FC<FlavorBarsProps> = ({ sweet, sour, bitter, strong }) => {
  return (
    <div className="space-y-2">
      <FlavorBar label="sweet" value={sweet} color="sweet" icon="🍬" />
      <FlavorBar label="sour" value={sour} color="sour" icon="🍋" />
      <FlavorBar label="bitter" value={bitter} color="bitter" icon="☕" />
      <FlavorBar label="strong" value={strong} color="strong" icon="🔥" />
    </div>
  );
};
