import { useState } from 'react';
import { TitleScreen } from './components/TitleScreen';
import { CustomerArrivalScreen } from './screens/CustomerArrivalScreen';
import { DrinkMixerScreen } from './screens/DrinkMixerScreen';
import { ScreenTransition } from './components/ScreenTransition';

type Screen = 'title' | 'customerArrival' | 'mixer';

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
        ) : (
          <DrinkMixerScreen onBack={handleBackToCustomerArrival} />
        )}
      </ScreenTransition>
    </div>
  );
}
