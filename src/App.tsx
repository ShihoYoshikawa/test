import { useState } from 'react';
import { TitleScreen } from './components/TitleScreen';
import { DrinkMixerScreen } from './screens/DrinkMixerScreen';
import { ScreenTransition } from './components/ScreenTransition';

type Screen = 'title' | 'mixer';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('title');

  const handleStart = () => {
    setCurrentScreen('mixer');
  };

  const handleBack = () => {
    setCurrentScreen('title');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <ScreenTransition screenKey={currentScreen}>
        {currentScreen === 'title' ? (
          <TitleScreen onStart={handleStart} />
        ) : (
          <DrinkMixerScreen onBack={handleBack} />
        )}
      </ScreenTransition>
    </div>
  );
}
