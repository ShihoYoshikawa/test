import { Star } from 'lucide-react';

interface CustomerCardProps {
  imagePath: string;
  description: string;
  budget: number;
  expectation: number; // 1-5
  moods: string[];
  quote: string;
  isSelected: boolean;
  onClick: () => void;
}

export function CustomerCard({
  imagePath,
  description,
  budget,
  expectation,
  moods,
  quote,
  isSelected,
  onClick,
}: CustomerCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative
        w-full md:w-[420px] h-[520px] md:h-[540px]
        rounded-[20px]
        backdrop-blur-[12px]
        cursor-pointer
        transition-all duration-300
        ${
          isSelected
            ? 'scale-105 border-2 border-cyan-400'
            : 'border border-white/20'
        }
      `}
      style={{
        background: 'rgba(255, 255, 255, 0.12)',
        boxShadow: isSelected
          ? '0 0 30px rgba(76, 199, 255, 0.6), 0 0 20px rgba(0, 0, 0, 0.3)'
          : '0 0 20px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Neon Glow Effect when selected */}
      {isSelected && (
        <div
          className="absolute inset-0 rounded-[20px] pointer-events-none"
          style={{
            boxShadow: '0 0 12px rgba(76, 199, 255, 0.8)',
          }}
        />
      )}

      {/* Card Content - Vertical Layout */}
      <div className="flex flex-col items-center gap-3 p-5 h-full">
        {/* Person Silhouette Icon */}
        <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden">
          <div
            className="absolute inset-0 rounded-full border-2 border-cyan-400/20"
            style={{
              boxShadow: '0 0 12px rgba(76, 199, 255, 0.6)',
            }}
          />
          <img
            src={imagePath}
            alt="Customer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Character Description */}
        <div className="text-center">
          <p className="text-sm font-medium text-white/80" style={{ fontFamily: 'Inter' }}>
            {description}
          </p>
        </div>

        {/* Budget */}
        <div className="text-center">
          <p className="text-base font-semibold text-cyan-400" style={{ fontFamily: 'Inter' }}>
            ¥{budget.toLocaleString()}
          </p>
        </div>

        {/* Expectation (Stars) */}
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={18}
              className={star <= expectation ? 'fill-cyan-400 text-cyan-400' : 'fill-white/20 text-white/20'}
            />
          ))}
        </div>

        {/* Mood Tags */}
        <div className="flex flex-wrap gap-2 justify-center">
          {moods.map((mood, index) => (
            <div
              key={index}
              className="px-2 py-1 rounded-xl text-xs font-medium text-white/90"
              style={{
                background: 'rgba(76, 199, 255, 0.2)',
                fontFamily: 'Inter',
              }}
            >
              {mood}
            </div>
          ))}
        </div>

        {/* Quote Bubble - Flex grow to push to available space */}
        <div className="flex-1 flex items-end w-full mt-2">
          <div className="relative w-full">
            {/* Triangle pointer */}
            <div
              className="absolute -top-2 left-8 w-0 h-0"
              style={{
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderBottom: '8px solid rgba(255, 255, 255, 0.12)',
              }}
            />

            {/* Bubble content */}
            <div
              className="rounded-2xl p-4"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <p className="text-sm text-white/80 leading-relaxed" style={{ fontFamily: 'Inter' }}>
                {quote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
