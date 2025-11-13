import { ArrowLeft, Moon, Sun, Baby, Calendar, Heart, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';
import logo from 'figma:asset/592f143304a29d7c71cbd3b4eb8ef0abf4fcc12a.png';

interface SettingsProps {
  onBack: () => void;
  currentMode: 'pregnancy' | 'postpartum' | 'menstrual';
  onModeChange: (mode: 'pregnancy' | 'postpartum' | 'menstrual') => void;
  darkMode: boolean;
  onThemeToggle: () => void;
}

export function Settings({ onBack, currentMode, onModeChange, darkMode, onThemeToggle }: SettingsProps) {
  return (
    <div className={`min-h-screen pb-20 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-[#FFE5ED] to-white'}`}>
      {/* Header */}
      <div className={`shadow-sm px-6 py-4 sticky top-0 z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-center justify-between mb-2">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className={`w-6 h-6 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`} />
          </button>
          <img src={logo} alt="MamaAlert" className="h-6" />
          <div className="w-10" />
        </div>
        <h1 className={`text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>Settings</h1>
      </div>

      {/* Theme Toggle */}
      <div className="px-6 py-4">
        <h2 className={`text-lg mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Appearance</h2>
        <Card className={`rounded-2xl p-4 border-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? (
                <Moon className="w-5 h-5 text-purple-400" />
              ) : (
                <Sun className="w-5 h-5 text-amber-500" />
              )}
              <div>
                <h3 className={`text-sm mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {darkMode ? 'Dark Mode' : 'Light Mode'}
                </h3>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {darkMode ? 'Easy on the eyes' : 'Bright and clear'}
                </p>
              </div>
            </div>
            <button
              onClick={onThemeToggle}
              className={`w-14 h-8 rounded-full transition-colors ${
                darkMode ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-7' : 'translate-x-1'
                } mt-1`}
              />
            </button>
          </div>
        </Card>
      </div>

      {/* Care Mode Selection */}
      <div className="px-6 py-4">
        <h2 className={`text-lg mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Care Mode</h2>
        <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Select the mode that fits your current health journey
        </p>

        <div className="space-y-3">
          {/* Menstrual Tracking Mode */}
          <button
            onClick={() => onModeChange('menstrual')}
            className={`w-full rounded-2xl p-4 transition-all ${
              currentMode === 'menstrual'
                ? darkMode
                  ? 'bg-pink-900 border-2 border-pink-500'
                  : 'bg-gradient-to-br from-pink-100 to-purple-100 border-2 border-pink-500'
                : darkMode
                ? 'bg-gray-800 border border-gray-700'
                : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-pink-900' : 'bg-pink-100'
                }`}>
                  <Calendar className="w-6 h-6 text-pink-600" />
                </div>
                <div className="text-left">
                  <h3 className={`text-sm mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Menstrual Tracking
                  </h3>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Track periods, ovulation & fertility
                  </p>
                </div>
              </div>
              {currentMode === 'menstrual' && (
                <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </button>

          {/* Pregnancy Mode */}
          <button
            onClick={() => onModeChange('pregnancy')}
            className={`w-full rounded-2xl p-4 transition-all ${
              currentMode === 'pregnancy'
                ? darkMode
                  ? 'bg-purple-900 border-2 border-purple-500'
                  : 'bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-500'
                : darkMode
                ? 'bg-gray-800 border border-gray-700'
                : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-purple-900' : 'bg-purple-100'
                }`}>
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-left">
                  <h3 className={`text-sm mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Pregnancy Mode
                  </h3>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Track pregnancy journey & fetal health
                  </p>
                </div>
              </div>
              {currentMode === 'pregnancy' && (
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </button>

          {/* Postpartum Mode */}
          <button
            onClick={() => onModeChange('postpartum')}
            className={`w-full rounded-2xl p-4 transition-all ${
              currentMode === 'postpartum'
                ? darkMode
                  ? 'bg-blue-900 border-2 border-blue-500'
                  : 'bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-blue-500'
                : darkMode
                ? 'bg-gray-800 border border-gray-700'
                : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-blue-900' : 'bg-blue-100'
                }`}>
                  <Baby className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className={`text-sm mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Postpartum Mode
                  </h3>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Track recovery & baby's health
                  </p>
                </div>
              </div>
              {currentMode === 'postpartum' && (
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Mode Info */}
      <div className="px-6 py-4">
        <Card className={`rounded-xl p-4 border-0 ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-blue-50 border-blue-200'
        }`}>
          <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-blue-800'}`}>
            <strong>Note:</strong> Switching modes will change your dashboard to show relevant features for your current health journey. Your data is saved across all modes.
          </p>
        </Card>
      </div>
    </div>
  );
}
