import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { SpecialIngredient } from '../types';
import { specialIngredients } from '../data/specialIngredients';

interface RatingScreenProps {
  onConfirm: (selectedIngredient: SpecialIngredient) => void;
  onBack: () => void;
}

export function RatingScreen({ onConfirm, onBack }: RatingScreenProps) {
  const [selectedIngredientId, setSelectedIngredientId] = useState<string | null>(null);

  const handleConfirm = () => {
    if (selectedIngredientId) {
      const selectedIngredient = specialIngredients.find(ing => ing.id === selectedIngredientId);
      if (selectedIngredient) {
        onConfirm(selectedIngredient);
      }
    }
  };

  const ratingData = {
    flavor: 'Perfect',
    presentation: 'Great Choice',
    mood: 'Excellent'
  };

  return (
    <div className="h-screen bg-cover bg-center relative overflow-y-auto">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/src/components/figma/images/night_bar_interior_with_neon_lights_1.png')" }}
      />

      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/70 via-gray-900/60 to-black/70" />

      {/* Back Button */}
      <button
        onClick={onBack}
        className="fixed top-4 left-4 z-50 glassmorphism rounded-xl p-3 hover:bg-white/20 transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-cyan-400" />
      </button>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-12 pb-32">

        {/* EXCELLENT Header with Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
            type: "spring",
            bounce: 0.4
          }}
          className="text-center mb-8 mt-8"
        >
          <h1
            className="text-5xl md:text-6xl font-black text-cyan-400 tracking-wider"
            style={{
              textShadow: '0 0 30px rgba(76, 199, 255, 0.8), 0 0 60px rgba(76, 199, 255, 0.4)',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            EXCELLENT
          </h1>
        </motion.div>

        {/* Cocktail Shot */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative mb-10"
        >
          <div className="w-48 h-48 md:w-56 md:h-56 relative flex items-center justify-center">
            {/* Glow effect */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(76, 199, 255, 0.3) 0%, transparent 70%)',
                filter: 'blur(40px)'
              }}
            />
            {/* Cocktail Glass Icon */}
            <div className="relative z-10 text-8xl md:text-9xl">
              🍸
            </div>
          </div>
          <p className="text-center text-cyan-400/80 text-sm mt-4 tracking-wide">
            Tonight's Best Creation
          </p>
        </motion.div>

        {/* Rating Panel */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full max-w-2xl mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
            <div className="glassmorphism rounded-2xl p-4 text-center border border-white/20">
              <p className="text-white/60 text-sm mb-1">Flavor Match</p>
              <p className="text-cyan-400 font-semibold text-lg">{ratingData.flavor}</p>
            </div>
            <div className="glassmorphism rounded-2xl p-4 text-center border border-white/20">
              <p className="text-white/60 text-sm mb-1">Presentation</p>
              <p className="text-cyan-400 font-semibold text-lg">{ratingData.presentation}</p>
            </div>
            <div className="glassmorphism rounded-2xl p-4 text-center border border-white/20">
              <p className="text-white/60 text-sm mb-1">Mood Match</p>
              <p className="text-cyan-400 font-semibold text-lg">{ratingData.mood}</p>
            </div>
          </div>
        </motion.div>

        {/* Reward Panel */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="w-full max-w-4xl mb-8"
        >
          <div className="text-center mb-6">
            <h2 className="text-white text-xl md:text-2xl font-semibold mb-2">
              特別な材料を1つ選んでください
            </h2>
            <p className="text-white/60 text-sm">
              夜が終わるまで使用可能
            </p>
          </div>

          {/* Special Ingredient Cards - Desktop: 3 columns, Mobile: Scroll */}
          <div className="w-full overflow-x-auto pb-4 px-4 md:px-0">
            <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 min-w-max md:min-w-0">
              {specialIngredients.map((ingredient, index) => (
                <motion.button
                  key={ingredient.id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  onClick={() => setSelectedIngredientId(ingredient.id)}
                  className={`
                    w-72 md:w-auto flex-shrink-0
                    glassmorphism rounded-3xl p-6
                    border-2 transition-all duration-300
                    ${selectedIngredientId === ingredient.id
                      ? 'border-cyan-400 bg-cyan-400/10 scale-105'
                      : 'border-white/20 hover:border-cyan-400/50 hover:scale-102'
                    }
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
                </motion.button>
              ))}
            </div>
          </div>

          {/* Mobile scroll indicator */}
          <div className="md:hidden flex justify-center gap-2 mt-4">
            {specialIngredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className={`h-2 rounded-full transition-all ${
                  selectedIngredientId === ingredient.id
                    ? 'w-8 bg-cyan-400'
                    : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Confirm Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="w-full max-w-md px-4"
        >
          <button
            onClick={handleConfirm}
            disabled={!selectedIngredientId}
            className={`
              w-full h-16 rounded-2xl
              font-semibold text-lg tracking-wide
              transition-all duration-300
              ${selectedIngredientId
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-105'
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
