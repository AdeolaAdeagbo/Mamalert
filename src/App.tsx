import { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Onboarding } from './components/Onboarding';
import { SignIn } from './components/SignIn';
import { Dashboard } from './components/Dashboard';
import { PostpartumMode } from './components/PostpartumMode';
import { MenstrualMode } from './components/MenstrualMode';
import { Settings } from './components/Settings';

type Screen = 'splash' | 'onboarding' | 'signin' | 'dashboard';
type CareMode = 'pregnancy' | 'postpartum' | 'menstrual';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [careMode, setCareMode] = useState<CareMode>('pregnancy');
  const [darkMode, setDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleModeChange = (mode: CareMode) => {
    setCareMode(mode);
    setShowSettings(false);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Settings handler
  if (showSettings && currentScreen === 'dashboard') {
    return (
      <div className={`max-w-md mx-auto min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <Settings 
          onBack={() => setShowSettings(false)}
          currentMode={careMode}
          onModeChange={handleModeChange}
          darkMode={darkMode}
          onThemeToggle={toggleTheme}
        />
      </div>
    );
  }

  return (
    <div className={`max-w-md mx-auto min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {currentScreen === 'splash' && (
        <SplashScreen onComplete={() => setCurrentScreen('onboarding')} />
      )}
      
      {currentScreen === 'onboarding' && (
        <Onboarding onComplete={() => setCurrentScreen('signin')} />
      )}
      
      {currentScreen === 'signin' && (
        <SignIn onComplete={() => setCurrentScreen('dashboard')} />
      )}
      
      {currentScreen === 'dashboard' && (
        <>
          {careMode === 'pregnancy' && (
            <Dashboard 
              onModeChange={handleModeChange}
              darkMode={darkMode}
              onThemeToggle={toggleTheme}
            />
          )}
          {careMode === 'postpartum' && <PostpartumMode />}
          {careMode === 'menstrual' && (
            <MenstrualMode 
              darkMode={darkMode} 
              onOpenSettings={() => setShowSettings(true)}
            />
          )}
        </>
      )}
    </div>
  );
}