import { useState } from 'react';
import { TitleScreen } from './components/TitleScreen';
import { CustomerArrivalScreen } from './screens/CustomerArrivalScreen';
import { DrinkMixerScreen } from './screens/DrinkMixerScreen';
import { RatingScreen } from './screens/RatingScreen';
import { ScreenTransition } from './components/ScreenTransition';

type Screen = 'title' | 'customerArrival' | 'mixer' | 'rating';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('title');

  const handleStart = () => {
    setCurrentScreen('customerArrival');
  };

  const handleCustomerSelected = () => {
    setCurrentScreen('mixer');
  };

  const handleBackToTitle = () => {
    setCurrentScreen('title');
  };

  const handleBackToCustomerArrival = () => {
    setCurrentScreen('customerArrival');
  };

  const handleServeComplete = () => {
    setCurrentScreen('rating');
  };

  const handleRatingConfirm = () => {
    // For now, go back to title. Could be extended to continue the game
    setCurrentScreen('title');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <ScreenTransition screenKey={currentScreen}>
        {currentScreen === 'title' ? (
          <TitleScreen onStart={handleStart} />
        ) : currentScreen === 'customerArrival' ? (
          <CustomerArrivalScreen
            onCustomerSelected={handleCustomerSelected}
            onBack={handleBackToTitle}
          />
        ) : currentScreen === 'mixer' ? (
          <DrinkMixerScreen
            onBack={handleBackToCustomerArrival}
            onServeComplete={handleServeComplete}
          />
        ) : (
          <RatingScreen
            onConfirm={handleRatingConfirm}
            onBack={() => setCurrentScreen('mixer')}
          />
        )}
      </ScreenTransition>
    </div>
  );
}
