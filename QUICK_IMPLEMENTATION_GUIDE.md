# 🚀 クイック実装ガイド

## 最も効果的な3つの改善（30分で実装可能）

---

## 1️⃣ グローパルス（呼吸するグロー）

### index.css に追加

```css
/* Glow pulse animation - 2-3 second cycle */
@keyframes glow-pulse-strong {
  0%, 100% {
    box-shadow:
      0 0 20px rgba(76, 199, 255, 0.5),
      0 0 30px rgba(76, 199, 255, 0.3),
      inset 0 0 20px rgba(255, 255, 255, 0.1);
  }
  50% {
    box-shadow:
      0 0 35px rgba(76, 199, 255, 0.8),
      0 0 60px rgba(76, 199, 255, 0.5),
      inset 0 0 25px rgba(255, 255, 255, 0.15);
  }
}

@keyframes glow-pulse-soft {
  0%, 100% {
    box-shadow: 0 0 15px rgba(76, 199, 255, 0.4);
  }
  50% {
    box-shadow: 0 0 30px rgba(76, 199, 255, 0.7);
  }
}

.glow-pulse-strong {
  animation: glow-pulse-strong 2.5s ease-in-out infinite;
}

.glow-pulse-soft {
  animation: glow-pulse-soft 2s ease-in-out infinite;
}
```

### 適用箇所

**TitleScreen.tsx のOPENボタン**
```tsx
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
    glow-pulse-strong  // ← 追加
  "
>
```

**CustomerArrivalScreen.tsx のCTAボタン**
```tsx
<motion.button
  className={`
    w-full max-w-[300px] h-[52px] md:h-[60px] rounded-xl
    text-white text-lg md:text-xl font-semibold
    transition-all duration-300
    ${selectedCustomerId !== null
      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 active:scale-95 glow-pulse-soft'  // ← 追加
      : 'bg-gray-500/30 cursor-not-allowed'
    }
  `}
>
```

**RatingScreen.tsx の確定ボタン**
```tsx
<button
  className={`
    w-full h-14 md:h-16 rounded-2xl
    font-semibold text-base md:text-lg tracking-wide
    transition-all duration-300
    ${selectedIngredientId
      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-105 glow-pulse-soft'  // ← 追加
      : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
    }
  `}
>
```

---

## 2️⃣ スキャンライン（CRTモニター風）

### index.css に追加

```css
/* Scanline effect */
@keyframes scan {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100vh);
  }
}

.scanline-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
}

.scanline {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    transparent 0%,
    rgba(0, 255, 255, 0.03) 49.9%,
    transparent 50%,
    rgba(0, 255, 255, 0.03) 50.1%,
    transparent 100%
  );
  background-size: 100% 4px;
  animation: scan 8s linear infinite;
  opacity: 0.5;
}

/* Optional: CRT flicker effect */
@keyframes flicker {
  0%, 100% { opacity: 0.98; }
  50% { opacity: 1; }
}

.crt-flicker {
  animation: flicker 0.15s infinite;
}
```

### App.tsx に追加（全画面共通）

```tsx
export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('title');

  // ... handlers ...

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Scanline Overlay - Add this */}
      <div className="scanline-overlay">
        <div className="scanline" />
      </div>

      <ScreenTransition screenKey={currentScreen}>
        {/* ... screens ... */}
      </ScreenTransition>
    </div>
  );
}
```

---

## 3️⃣ ネオンパーティクル（浮遊する光）

### 新しいコンポーネントを作成

**src/components/NeonParticles.tsx**

```tsx
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
}

export function NeonParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle colors (neon palette)
    const colors = [
      'rgba(76, 199, 255, 0.8)',   // cyan
      'rgba(59, 130, 246, 0.8)',   // blue
      'rgba(168, 85, 247, 0.8)',   // purple
      'rgba(236, 72, 153, 0.8)',   // pink
    ];

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 25; // Adjust for performance

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedY: -(Math.random() * 0.5 + 0.2),
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Update position
        particle.y += particle.speedY;
        particle.x += particle.speedX;

        // Reset if particle goes off screen
        if (particle.y < -10) {
          particle.y = canvas.height + 10;
          particle.x = Math.random() * canvas.width;
        }
        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;

        // Draw particle with glow
        ctx.save();
        ctx.globalAlpha = particle.opacity;

        // Outer glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 4
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'rgba(76, 199, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(
          particle.x - particle.size * 4,
          particle.y - particle.size * 4,
          particle.size * 8,
          particle.size * 8
        );

        // Inner core
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
}
```

### 各画面に追加

**TitleScreen.tsx**
```tsx
import { NeonParticles } from './NeonParticles';

export function TitleScreen({ onStart }: TitleScreenProps) {
  return (
    <div className="min-h-screen ...">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-gray-900/55 to-black/60" />

      {/* Film Grain Texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" ... />

      {/* Add Neon Particles */}
      <NeonParticles />

      {/* Main Content */}
      <div className="relative z-10 ...">
        ...
      </div>
    </div>
  );
}
```

同様に **CustomerArrivalScreen.tsx**, **RatingScreen.tsx** にも追加

---

## 📊 Before / After

### Before（現在）
```
- 静的なグロー
- 平坦な背景
- アニメーションは画面遷移のみ
```

### After（30分後）
```
✨ ボタンが呼吸するように光る（グローパルス）
✨ 画面全体にCRTモニター風のスキャンライン
✨ 浮遊する光のパーティクル（25個）
```

**体感的な変化**: 静的 → 動的、平面 → 立体、冷たい → 温かい

---

## ⚡ パフォーマンス最適化

### モバイル対応

```tsx
// NeonParticles.tsx - パーティクル数を減らす
const particleCount = window.innerWidth < 768 ? 15 : 25;

// prefers-reduced-motion への対応
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  return null; // アニメーション無効
}
```

### index.css に追加

```css
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  .glow-pulse-strong,
  .glow-pulse-soft,
  .scanline {
    animation: none !important;
  }
}
```

---

## 🎯 実装の順番

1. **5分**: index.css にアニメーションを追加
2. **5分**: 既存ボタンにclassを追加
3. **10分**: スキャンラインをApp.tsxに追加
4. **10分**: NeonParticles.tsx を作成
5. **5分**: 各画面に NeonParticles を配置

**合計**: 約35分

---

## 🔄 次のステップ

この3つを実装後、さらに強化したい場合：

### Phase 2（+1時間）
- グリッチエフェクト（画面遷移時）
- タイピングアニメーション（EXCELLENT文字）
- カード選択時のパーティクル爆発

### Phase 3（+2時間）
- ホバー時のネオントレイル
- 深度感・レイヤー効果
- 音響フィードバック

---

## 🎬 デモ用のgif録画推奨箇所

1. タイトル画面のOPENボタン（グローパルス）
2. 背景のパーティクル浮遊
3. スキャンラインの流れ

これらをキャプチャして比較すると効果が明確！

---

実装してみますか？ 🚀
