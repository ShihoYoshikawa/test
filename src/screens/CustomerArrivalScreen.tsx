import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TonightInfo } from '../components/TonightInfo';
import { CustomerCard } from '../components/CustomerCard';

interface Customer {
  id: number;
  imagePath: string;
  description: string;
  budget: number;
  expectation: number;
  moods: string[];
  quote: string;
}

interface CustomerArrivalScreenProps {
  onCustomerSelected: () => void;
  onBack: () => void;
}

const customers: Customer[] = [
  {
    id: 1,
    imagePath: '/assets/person/person1.png',
    description: 'ナルシストな若手営業',
    budget: 1500,
    expectation: 1,
    moods: ['疲労', '自信'],
    quote: 'こんな寂れた酒場じゃ味には期待できないね',
  },
  {
    id: 2,
    imagePath: '/assets/person/person2.png',
    description: '冷静なキャリア職',
    budget: 2000,
    expectation: 2,
    moods: ['集中', '冷静'],
    quote: '今日は自分に合う一杯だけが欲しいの',
  },
];

export function CustomerArrivalScreen({ onCustomerSelected, onBack }: CustomerArrivalScreenProps) {
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEntranceAnimation, setShowEntranceAnimation] = useState(true);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEntranceAnimation(false);
      // Auto-select first customer after entrance animation
      setSelectedCustomerId(customers[0].id);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % customers.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + customers.length) % customers.length);
  };

  const handleSwipe = (direction: number) => {
    if (direction < 0) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center bg-no-repeat relative overflow-y-auto"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1637368783271-179aa5e1a4f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwY2l0eSUyMG5pZ2h0JTIwYm9rZWh8ZW58MXx8fHwxNzYzMDIwOTMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)`,
      }}
    >
      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-gray-900/55 to-black/60 pointer-events-none" />

      {/* Film Grain Texture */}
      <div
        className="fixed inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Back Button */}
      <button
        onClick={onBack}
        className="fixed top-4 left-4 md:top-6 md:left-6 z-50 glassmorphism hover:bg-white/10 transition-all rounded-full p-2"
      >
        <ChevronLeft className="w-6 h-6 text-cyan-400" />
      </button>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-16 md:py-12 pb-24">
        {/* Tonight Info */}
        <div className="w-full max-w-4xl mb-4 md:mb-8">
          <TonightInfo mood="rainy" description="雨の夜、落ち着いた客が多い" />
        </div>

        {/* Customer Cards Container - Reserve space to prevent layout shift */}
        <div className="w-full flex flex-col items-center">

          {/* Entrance Animation Overlay */}
          <AnimatePresence>
            {showEntranceAnimation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute z-20 inset-0 flex items-center justify-center"
                style={{ pointerEvents: 'none' }}
              >
                <div
                  className="w-32 h-32 rounded-full"
                  style={{
                    background: 'rgba(76, 199, 255, 0.2)',
                    boxShadow: '0 0 40px rgba(76, 199, 255, 0.4)',
                    backdropFilter: 'blur(20px)',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Customer Cards - Always rendered to prevent layout shift */}
          <>
            {/* Desktop Layout (>= 768px) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showEntranceAnimation ? 0 : 1 }}
              transition={{ duration: 0.3, delay: showEntranceAnimation ? 0 : 0.3 }}
              className="hidden md:flex gap-8 mb-12 justify-center"
            >
              {customers.map((customer) => (
                <CustomerCard
                  key={customer.id}
                  imagePath={customer.imagePath}
                  description={customer.description}
                  budget={customer.budget}
                  expectation={customer.expectation}
                  moods={customer.moods}
                  quote={customer.quote}
                  isSelected={selectedCustomerId === customer.id}
                  onClick={() => setSelectedCustomerId(customer.id)}
                />
              ))}
            </motion.div>

            {/* Mobile Layout (< 768px) - Swipeable Carousel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showEntranceAnimation ? 0 : 1 }}
              transition={{ duration: 0.3, delay: showEntranceAnimation ? 0 : 0.3 }}
              className="md:hidden w-full max-w-[360px] mb-6 relative"
            >
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
                  onTap={() => setSelectedCustomerId(customers[currentIndex].id)}
                >
                  <CustomerCard
                    imagePath={customers[currentIndex].imagePath}
                    description={customers[currentIndex].description}
                    budget={customers[currentIndex].budget}
                    expectation={customers[currentIndex].expectation}
                    moods={customers[currentIndex].moods}
                    quote={customers[currentIndex].quote}
                    isSelected={selectedCustomerId === customers[currentIndex].id}
                    onClick={() => setSelectedCustomerId(customers[currentIndex].id)}
                  />
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
                    <CustomerCard
                      imagePath={customers[(currentIndex + 1) % customers.length].imagePath}
                      description={customers[(currentIndex + 1) % customers.length].description}
                      budget={customers[(currentIndex + 1) % customers.length].budget}
                      expectation={customers[(currentIndex + 1) % customers.length].expectation}
                      moods={customers[(currentIndex + 1) % customers.length].moods}
                      quote={customers[(currentIndex + 1) % customers.length].quote}
                      isSelected={false}
                      onClick={() => {}}
                    />
                  </div>
                </div>
              </div>

              {/* Carousel Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {customers.map((_, index) => (
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
            </motion.div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: showEntranceAnimation ? 0 : 1 }}
              transition={{ duration: 0.3, delay: showEntranceAnimation ? 0 : 0.3 }}
              onClick={onCustomerSelected}
              disabled={selectedCustomerId === null}
              className={`
                w-full max-w-[300px] h-[52px] md:h-[60px] rounded-xl
                text-white text-lg md:text-xl font-semibold
                transition-all duration-300
                ${
                  selectedCustomerId !== null
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 active:scale-95'
                    : 'bg-gray-500/30 cursor-not-allowed'
                }
              `}
              style={{
                boxShadow:
                  selectedCustomerId !== null
                    ? '0 0 20px rgba(76, 199, 255, 0.5)'
                    : 'none',
              }}
            >
              この客にする
            </motion.button>
          </>
        </div>
      </div>
    </div>
  );
}
