import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  tx: number;
  ty: number;
  color: string;
  delay: number;
}

interface ParticleBurstProps {
  x: number;
  y: number;
  onComplete?: () => void;
}

export function ParticleBurst({ x, y, onComplete }: ParticleBurstProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Create particles
    const colors = [
      'rgba(76, 199, 255, 1)',   // cyan
      'rgba(59, 130, 246, 1)',   // blue
      'rgba(168, 85, 247, 1)',   // purple
      'rgba(236, 72, 153, 1)',   // pink
      'rgba(255, 255, 255, 1)',  // white
    ];

    const newParticles: Particle[] = [];
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const distance = 60 + Math.random() * 40;

      newParticles.push({
        id: i,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.1
      });
    }

    setParticles(newParticles);

    // Clean up after animation
    const timer = setTimeout(() => {
      onComplete?.();
    }, 1000);

    return () => clearTimeout(timer);
  }, [x, y, onComplete]);

  return (
    <div
      className="fixed pointer-events-none"
      style={{
        left: x,
        top: y,
        zIndex: 100,
      }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle-burst"
          style={{
            backgroundColor: particle.color,
            boxShadow: `0 0 10px ${particle.color}`,
            animationDelay: `${particle.delay}s`,
            // @ts-ignore - CSS custom properties
            '--tx': `${particle.tx}px`,
            '--ty': `${particle.ty}px`,
          }}
        />
      ))}
    </div>
  );
}
