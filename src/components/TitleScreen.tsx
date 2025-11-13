import { Settings } from 'lucide-react';
import { Button } from './ui/button';
import { useTransition } from '../contexts/TransitionContext';
import { useState } from 'react';

interface TitleScreenProps {
  onStart: () => void;
}

export function TitleScreen({ onStart }: TitleScreenProps) {
  const { transitionConfig, setTransitionType } = useTransition();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1637368783271-179aa5e1a4f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwY2l0eSUyMG5pZ2h0JTIwYm9rZWh8ZW58MXx8fHwxNzYzMDIwOTMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)`
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-gray-900/55 to-black/60" />

      {/* Film Grain Texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
        }}
      />

      {/* Settings Button - Top Right */}
      <div className="absolute top-6 right-6 z-50">
        <Button
          variant="ghost"
          size="icon"
          className="glassmorphism hover:bg-white/10 transition-all"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings className="w-6 h-6 text-cyan-400" />
        </Button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-20 right-6 z-50 glassmorphism-strong rounded-xl p-4 space-y-3 min-w-[200px]">
          <div className="text-white text-sm font-medium mb-2">Transition Type</div>
          <div className="space-y-2">
            {(['fade', 'slide', 'scale', 'blur'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setTransitionType(type)}
                className={`
                  w-full text-left px-3 py-2 rounded-lg text-sm transition-all
                  ${transitionConfig.type === type
                    ? 'neon-border-blue text-cyan-300'
                    : 'text-gray-300 hover:bg-white/10'
                  }
                `}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content - Safe Zone */}
      <div className="relative z-10 h-screen flex flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center space-y-8 max-w-md w-full">

          {/* Game Title with Neon Glow */}
          <div className="text-center space-y-3">
            <h1
              className="text-6xl md:text-7xl font-black tracking-wider text-cyan-400"
              style={{
                textShadow: `
                  0 0 10px rgba(76, 199, 255, 1),
                  0 0 20px rgba(76, 199, 255, 0.8),
                  0 0 30px rgba(76, 199, 255, 0.6),
                  0 0 40px rgba(76, 199, 255, 0.4)
                `,
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                fontWeight: 900,
              }}
            >
              NEON MIXER
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg text-white/70 tracking-widest"
              style={{
                letterSpacing: '0.2em',
              }}
            >
              カクテルの世界へ
            </p>
          </div>

          {/* OPEN Button with Neon Style */}
          <button
            onClick={onStart}
            className="
              relative group
              w-full max-w-[280px] h-[60px]
              rounded-2xl
              bg-gradient-to-r from-cyan-500 to-blue-500
              hover:from-cyan-400 hover:to-blue-400
              text-white text-2xl font-semibold
              transition-all duration-300
              active:scale-95
            "
            style={{
              boxShadow: `
                0 0 20px rgba(76, 199, 255, 0.5),
                0 0 40px rgba(76, 199, 255, 0.3),
                inset 0 0 20px rgba(255, 255, 255, 0.1)
              `,
            }}
          >
            <span className="relative z-10">OPEN</span>
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow: `
                  0 0 30px rgba(76, 199, 255, 0.7),
                  0 0 60px rgba(76, 199, 255, 0.5)
                `,
              }}
            />
          </button>

        </div>

        {/* Version - Bottom Right */}
        <div className="absolute bottom-6 right-6 text-white/40 text-xs">
          Version 0.1.0
        </div>
      </div>
    </div>
  );
}
