import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SpecialIngredient } from '../types';
import { specialIngredients } from '../data/specialIngredients';
import { NeonParticles } from '../components/NeonParticles';

interface RatingScreenProps {
  onConfirm: (selectedIngredient: SpecialIngredient) => void;
  onBack: () => void;
}

export function RatingScreen({ onConfirm, onBack }: RatingScreenProps) {
  const [selectedIngredientId, setSelectedIngredientId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleConfirm = () => {
    if (selectedIngredientId) {
      const selectedIngredient = specialIngredients.find(ing => ing.id === selectedIngredientId);
      if (selectedIngredient) {
        onConfirm(selectedIngredient);
      }
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % specialIngredients.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + specialIngredients.length) % specialIngredients.length);
  };

  const handleSwipe = (direction: number) => {
    if (direction < 0) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  const ratingData = {
    flavor: 'Perfect',
    presentation: 'Great Choice',
    mood: 'Excellent'
  };

  const IngredientCard = ({ ingredient, isVisible = true }: { ingredient: SpecialIngredient; isVisible?: boolean }) => (
    <button
      onClick={() => isVisible && setSelectedIngredientId(ingredient.id)}
      className={`
        w-full
        glassmorphism rounded-3xl p-6
        border-2 transition-all duration-300
        ${selectedIngredientId === ingredient.id
          ? 'border-cyan-400 bg-cyan-400/10 scale-105'
          : 'border-white/20 hover:border-cyan-400/50 hover:scale-102'
        }
        ${!isVisible ? 'pointer-events-none' : ''}
      `}
      style={selectedIngredientId === ingredient.id ? {
        boxShadow: '0 0 40px rgba(76, 199, 255, 0.4), inset 0 0 20px rgba(76, 199, 255, 0.1)'
      } : {}}
    >
      {/* Icon */}
      <div className="text-6xl mb-4 text-center">
        {ingredient.icon}
      </div>

      {/* Title */}
      <h3 className="text-white font-semibold text-lg mb-2 text-center">
        {ingredient.name}
      </h3>

      {/* Description */}
      <p className="text-white/60 text-sm mb-3 text-center leading-relaxed">
        {ingredient.description}
      </p>

      {/* Effect */}
      <div className="glassmorphism-strong rounded-lg p-2">
        <p className="text-cyan-400 text-xs font-medium text-center">
          {ingredient.effect}
        </p>
      </div>
    </button>
  );

  return (
    <div className="h-screen bg-cover bg-center relative overflow-y-auto">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/src/components/figma/images/night_bar_interior_with_neon_lights_1.png')" }}
      />

      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/70 via-gray-900/60 to-black/70" />

      {/* Neon Particles */}
      <NeonParticles />

      {/* Back Button */}
      <button
        onClick={onBack}
        className="fixed top-4 left-4 z-50 glassmorphism rounded-xl p-3 hover:bg-white/20 transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-cyan-400" />
      </button>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-8 md:py-12 pb-32">

        {/* EXCELLENT Header with Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
            type: "spring",
            bounce: 0.4
          }}
          className="text-center mb-6 md:mb-8"
        >
          <h1
            className="text-4xl md:text-6xl font-black text-cyan-400 tracking-wider"
            style={{
              textShadow: '0 0 30px rgba(76, 199, 255, 0.8), 0 0 60px rgba(76, 199, 255, 0.4)',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            EXCELLENT
          </h1>
        </motion.div>

        {/* Cocktail Shot + Rating Panel - Desktop: horizontal, Mobile: vertical */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full max-w-4xl mb-8 md:mb-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">

            {/* Cocktail Shot */}
            <div className="relative flex-shrink-0">
              <div className="w-40 h-40 md:w-48 md:h-48 relative flex items-center justify-center">
                {/* Glow effect */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(76, 199, 255, 0.3) 0%, transparent 70%)',
                    filter: 'blur(40px)'
                  }}
                />
                {/* Cocktail Glass Icon */}
                <div className="relative z-10 text-7xl md:text-8xl">
                  🍸
                </div>
              </div>
              <p className="text-center text-cyan-400/80 text-xs md:text-sm mt-2 tracking-wide">
                Tonight's Best Creation
              </p>
            </div>

            {/* Rating Panel - Mobile: 3 columns horizontal, Desktop: vertical */}
            <div className="w-full md:w-auto">
              <div className="grid grid-cols-3 md:grid-cols-1 gap-3 md:gap-4 px-2 md:px-0">
                <div className="glassmorphism rounded-xl md:rounded-2xl p-3 md:p-4 text-center border border-white/20">
                  <p className="text-white/60 text-xs md:text-sm mb-1">Flavor Match</p>
                  <p className="text-cyan-400 font-semibold text-sm md:text-lg">{ratingData.flavor}</p>
                </div>
                <div className="glassmorphism rounded-xl md:rounded-2xl p-3 md:p-4 text-center border border-white/20">
                  <p className="text-white/60 text-xs md:text-sm mb-1">Presentation</p>
                  <p className="text-cyan-400 font-semibold text-sm md:text-lg">{ratingData.presentation}</p>
                </div>
                <div className="glassmorphism rounded-xl md:rounded-2xl p-3 md:p-4 text-center border border-white/20">
                  <p className="text-white/60 text-xs md:text-sm mb-1">Mood Match</p>
                  <p className="text-cyan-400 font-semibold text-sm md:text-lg">{ratingData.mood}</p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Reward Panel */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full max-w-4xl mb-8"
        >
          <div className="text-center mb-6">
            <h2 className="text-white text-lg md:text-2xl font-semibold mb-2">
              特別な材料を1つ選んでください
            </h2>
            <p className="text-white/60 text-xs md:text-sm">
              夜が終わるまで使用可能
            </p>
          </div>

          {/* Desktop: 3 cards side by side */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 md:gap-8 px-4">
            {specialIngredients.map((ingredient, index) => (
              <motion.div
                key={ingredient.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              >
                <IngredientCard ingredient={ingredient} />
              </motion.div>
            ))}
          </div>

          {/* Mobile: Swipeable Carousel (like CustomerArrivalScreen) */}
          <div className="md:hidden w-full max-w-[360px] mx-auto relative">
            {/* Left Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 z-20"
              style={{ opacity: 0.3 }}
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 z-20"
              style={{ opacity: 0.3 }}
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            {/* Swipeable Card Container */}
            <div className="relative overflow-visible">
              <motion.div
                key={currentIndex}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, { offset }) => {
                  const swipeThreshold = 50;
                  if (Math.abs(offset.x) > swipeThreshold) {
                    handleSwipe(offset.x);
                  }
                }}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="cursor-grab active:cursor-grabbing"
                onTap={() => setSelectedIngredientId(specialIngredients[currentIndex].id)}
              >
                <IngredientCard ingredient={specialIngredients[currentIndex]} />
              </motion.div>

              {/* Peek of next card */}
              <div
                className="absolute right-0 top-0 w-[10%] h-full pointer-events-none overflow-hidden"
                style={{
                  transform: 'translateX(100%)',
                  opacity: 0.3,
                }}
              >
                <div className="w-[360px] h-full" style={{ transform: 'translateX(-90%)' }}>
                  <IngredientCard
                    ingredient={specialIngredients[(currentIndex + 1) % specialIngredients.length]}
                    isVisible={false}
                  />
                </div>
              </div>
            </div>

            {/* Carousel Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {specialIngredients.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background:
                      index === currentIndex
                        ? 'rgba(76, 199, 255, 1)'
                        : 'rgba(255, 255, 255, 0.2)',
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Confirm Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="w-full max-w-md px-4"
        >
          <button
            onClick={handleConfirm}
            disabled={!selectedIngredientId}
            className={`
              w-full h-14 md:h-16 rounded-2xl
              font-semibold text-base md:text-lg tracking-wide
              transition-all duration-300
              ${selectedIngredientId
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-105 glow-pulse-soft'
                : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
              }
            `}
            style={selectedIngredientId ? {
              boxShadow: '0 0 30px rgba(76, 199, 255, 0.5), 0 10px 30px rgba(0, 0, 0, 0.3)'
            } : {}}
          >
            この材料に決める
          </button>
        </motion.div>

      </div>
    </div>
  );
}
