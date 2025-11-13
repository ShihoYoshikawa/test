import { CloudRain, Star } from 'lucide-react';

interface TonightInfoProps {
  mood: 'rainy' | 'busy';
  description: string;
}

export function TonightInfo({ mood, description }: TonightInfoProps) {
  return (
    <div
      className="w-full h-[120px] md:h-[160px] rounded-2xl p-4 md:p-6 flex flex-col justify-center items-center gap-2 md:gap-3"
      style={{
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Icon and Title */}
      <div className="flex items-center gap-3">
        {mood === 'rainy' ? (
          <CloudRain className="w-6 h-6 text-cyan-400" />
        ) : (
          <Star className="w-6 h-6 text-cyan-400 fill-cyan-400" />
        )}
        <h2 className="text-xl font-semibold text-white/90" style={{ fontFamily: 'Inter' }}>
          Tonight's Mood
        </h2>
      </div>

      {/* Description */}
      <p className="text-sm text-white/70 text-center" style={{ fontFamily: 'Inter' }}>
        {description}
      </p>
    </div>
  );
}
