import { motion } from 'framer-motion';

interface FlavorBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color: 'blue' | 'pink' | 'purple' | 'yellow';
}

const colorClasses = {
  blue: 'bg-cyan-400',
  pink: 'bg-pink-400',
  purple: 'bg-purple-400',
  yellow: 'bg-amber-400'
};

const glowClasses = {
  blue: 'shadow-[0_0_10px_rgba(0,229,255,0.6)]',
  pink: 'shadow-[0_0_10px_rgba(255,0,229,0.6)]',
  purple: 'shadow-[0_0_10px_rgba(168,85,247,0.6)]',
  yellow: 'shadow-[0_0_10px_rgba(251,191,36,0.6)]'
};

export function FlavorBar({ label, value, maxValue = 10, color }: FlavorBarProps) {
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">{label}</span>
        <span className="text-xs text-gray-300">{value}</span>
      </div>
      <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
        <motion.div
          className={`h-full ${colorClasses[color]} ${glowClasses[color]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
