import { useState } from 'react';
import { Calendar, Droplet, Heart, TrendingUp, Sparkles, Plus, Activity, Moon, Sun, Settings, User } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AINurse } from './AINurse';
import { MenstrualFlowLogger } from './MenstrualFlowLogger';
import { MenstrualMoodTracker } from './MenstrualMoodTracker';
import { MenstrualSymptomTracker } from './MenstrualSymptomTracker';
import logo from 'figma:asset/592f143304a29d7c71cbd3b4eb8ef0abf4fcc12a.png';

const wellnessImage = "https://images.unsplash.com/photo-1611072395767-8766d298994b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhlYWx0aCUyMHdlbGxuZXNzfGVufDF8fHx8MTc2MzAyOTM2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

interface MenstrualModeProps {
  darkMode: boolean;
  onOpenSettings: () => void;
}

export function MenstrualMode({ darkMode, onOpenSettings }: MenstrualModeProps) {
  const [showAINurse, setShowAINurse] = useState(false);
  const [showFlowLogger, setShowFlowLogger] = useState(false);
  const [showMoodTracker, setShowMoodTracker] = useState(false);
  const [showSymptomTracker, setShowSymptomTracker] = useState(false);
  const [currentCycleDay] = useState(14); // Day 14 of cycle
  const [cycleLength] = useState(28);
  const [periodLength] = useState(5);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Calculate cycle phases
  const nextPeriodDate = new Date();
  nextPeriodDate.setDate(nextPeriodDate.getDate() + (cycleLength - currentCycleDay));
  
  const ovulationDate = new Date();
  ovulationDate.setDate(ovulationDate.getDate() + (14 - currentCycleDay));

  const getCurrentPhase = () => {
    if (currentCycleDay <= periodLength) return 'menstrual';
    if (currentCycleDay <= 13) return 'follicular';
    if (currentCycleDay >= 13 && currentCycleDay <= 15) return 'ovulation';
    return 'luteal';
  };

  const phase = getCurrentPhase();

  const phaseInfo = {
    menstrual: {
      name: 'Menstrual Phase',
      color: 'red',
      icon: <Droplet className="w-6 h-6 text-red-500" />,
      bg: darkMode ? 'bg-red-900' : 'bg-red-50',
      description: 'Your period is here. Focus on rest and self-care.'
    },
    follicular: {
      name: 'Follicular Phase',
      color: 'green',
      icon: <Sun className="w-6 h-6 text-green-500" />,
      bg: darkMode ? 'bg-green-900' : 'bg-green-50',
      description: 'Rising energy levels. Great time for new activities.'
    },
    ovulation: {
      name: 'Ovulation Phase',
      color: 'pink',
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      bg: darkMode ? 'bg-pink-900' : 'bg-pink-50',
      description: 'Peak fertility window. You may feel most energetic.'
    },
    luteal: {
      name: 'Luteal Phase',
      color: 'purple',
      icon: <Moon className="w-6 h-6 text-purple-500" />,
      bg: darkMode ? 'bg-purple-900' : 'bg-purple-50',
      description: 'Progesterone rises. Practice extra self-care.'
    }
  };

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  
  // Create calendar grid
  const calendarDays = [];
  const today = new Date();
  const isCurrentMonth = currentMonth.getMonth() === today.getMonth() && 
                         currentMonth.getFullYear() === today.getFullYear();
  
  // Add empty cells for days before the month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Determine day type (period, ovulation, etc.)
  const getDayType = (day: number) => {
    if (!isCurrentMonth) return null;
    
    const dayOfMonth = today.getDate();
    const diff = day - dayOfMonth;
    const cycleDayForDate = (currentCycleDay + diff) % cycleLength;
    
    if (cycleDayForDate <= periodLength && cycleDayForDate > 0) return 'period';
    if (cycleDayForDate >= 13 && cycleDayForDate <= 15) return 'ovulation';
    if (cycleDayForDate >= 10 && cycleDayForDate <= 18) return 'fertile';
    return null;
  };

  if (showAINurse) {
    return <AINurse onBack={() => setShowAINurse(false)} />;
  }

  if (showFlowLogger) {
    return <MenstrualFlowLogger onBack={() => setShowFlowLogger(false)} darkMode={darkMode} />;
  }

  if (showMoodTracker) {
    return <MenstrualMoodTracker onBack={() => setShowMoodTracker(false)} darkMode={darkMode} />;
  }

  if (showSymptomTracker) {
    return <MenstrualSymptomTracker onBack={() => setShowSymptomTracker(false)} darkMode={darkMode} />;
  }

  return (
    <div className={`min-h-screen pb-20 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-[#FFE5ED] to-white'}`}>
      {/* Header */}
      <div className="px-6 pt-4 pb-2 flex items-center justify-between">
        <img src={logo} alt="MamaAlert" className="h-8" />
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowAINurse(true)}
            className="p-2 bg-gradient-to-br from-[#E85883] to-[#F186A8] rounded-full hover:shadow-md transition-shadow"
          >
            <Sparkles className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={onOpenSettings}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Settings className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
          </button>
        </div>
      </div>

      {/* Greeting */}
      <div className="px-6 py-4">
        <h2 className={`text-2xl mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Hello, Sarah!</h2>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Day {currentCycleDay} of your cycle
        </p>
      </div>

      {/* Cycle Overview Card */}
      <div className="px-6 py-2">
        <Card className={`rounded-2xl p-5 border-0 ${
          darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700' : 'bg-gradient-to-br from-pink-50 to-purple-50'
        }`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200">
              <ImageWithFallback
                src={wellnessImage}
                alt="Wellness"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className={`text-sm mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Current Phase</h3>
              <div className="flex items-center gap-2">
                {phaseInfo[phase].icon}
                <span className={darkMode ? 'text-white' : 'text-gray-900'}>{phaseInfo[phase].name}</span>
              </div>
            </div>
          </div>
          
          {/* Cycle Progress Bar */}
          <div className={`w-full h-2 rounded-full mb-2 ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
            <div
              className="h-2 bg-gradient-to-r from-[#E85883] to-[#F186A8] rounded-full transition-all"
              style={{ width: `${(currentCycleDay / cycleLength) * 100}%` }}
            />
          </div>
          <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {phaseInfo[phase].description}
          </p>
        </Card>
      </div>

      {/* Predictions */}
      <div className="px-6 py-4">
        <h2 className={`text-lg mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Cycle Calendar</h2>
        
        {/* Month Header */}
        <Card className={`rounded-2xl p-4 border-0 mb-3 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
                className={`px-3 py-1 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                ←
              </button>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
                className={`px-3 py-1 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                →
              </button>
            </div>
          </div>
          
          {/* Day Names */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <div key={i} className={`text-center text-xs py-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              if (!day) {
                return <div key={index} className="aspect-square" />;
              }
              
              const dayType = getDayType(day);
              const isToday = isCurrentMonth && day === today.getDate();
              
              return (
                <div
                  key={index}
                  className={`aspect-square flex items-center justify-center rounded-lg text-sm relative ${
                    isToday
                      ? 'ring-2 ring-[#E85883]'
                      : ''
                  } ${
                    dayType === 'period'
                      ? 'bg-red-100 text-red-700'
                      : dayType === 'ovulation'
                      ? 'bg-pink-100 text-pink-700'
                      : dayType === 'fertile'
                      ? 'bg-purple-50 text-purple-600'
                      : darkMode
                      ? 'text-gray-300'
                      : 'text-gray-700'
                  }`}
                >
                  {day}
                  {dayType === 'period' && (
                    <div className="absolute bottom-0.5 w-1 h-1 rounded-full bg-red-500" />
                  )}
                  {dayType === 'ovulation' && (
                    <div className="absolute bottom-0.5 w-1 h-1 rounded-full bg-pink-500" />
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="flex gap-4 mt-4 text-xs justify-center flex-wrap">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-red-100" />
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Period</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-purple-50" />
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Fertile</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-pink-100" />
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Ovulation</span>
            </div>
          </div>
        </Card>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className={`rounded-2xl p-4 border-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-red-900' : 'bg-red-100'
              }`}>
                <Droplet className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex-1">
                <h3 className={`text-sm mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Next Period</h3>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {nextPeriodDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  in {cycleLength - currentCycleDay} days
                </p>
              </div>
            </div>
          </Card>

          <Card className={`rounded-2xl p-4 border-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-pink-900' : 'bg-pink-100'
              }`}>
                <Heart className="w-6 h-6 text-pink-500" />
              </div>
              <div className="flex-1">
                <h3 className={`text-sm mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Fertile Window</h3>
                {phase === 'ovulation' ? (
                  <p className={`text-xs ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}>
                    Active now!
                  </p>
                ) : (
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {ovulationDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Log Symptoms & Mood */}
      <div className="px-6 py-4">
        <h2 className={`text-lg mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Daily Tracking</h2>
        <div className="grid grid-cols-2 gap-3">
          <Card 
            onClick={() => setShowFlowLogger(true)}
            className={`rounded-2xl p-4 border-0 cursor-pointer hover:shadow-md transition-shadow ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              darkMode ? 'bg-red-900' : 'bg-red-100'
            }`}>
              <Droplet className="w-5 h-5 text-red-500" />
            </div>
            <h3 className={`text-sm mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Log Flow</h3>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Track bleeding</p>
          </Card>

          <Card 
            onClick={() => setShowSymptomTracker(true)}
            className={`rounded-2xl p-4 border-0 cursor-pointer hover:shadow-md transition-shadow ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              darkMode ? 'bg-purple-900' : 'bg-purple-100'
            }`}>
              <Activity className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className={`text-sm mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Symptoms</h3>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Log how you feel</p>
          </Card>

          <Card 
            onClick={() => setShowMoodTracker(true)}
            className={`rounded-2xl p-4 border-0 cursor-pointer hover:shadow-md transition-shadow ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              darkMode ? 'bg-blue-900' : 'bg-blue-100'
            }`}>
              <Heart className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className={`text-sm mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Mood</h3>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Track emotions</p>
          </Card>

          <Card className={`rounded-2xl p-4 border-0 cursor-pointer hover:shadow-md transition-shadow ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              darkMode ? 'bg-pink-900' : 'bg-pink-100'
            }`}>
              <Plus className="w-5 h-5 text-pink-500" />
            </div>
            <h3 className={`text-sm mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>More</h3>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Custom tracking</p>
          </Card>
        </div>
      </div>

      {/* Cycle Stats */}
      <div className="px-6 py-4">
        <h2 className={`text-lg mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Cycle Insights</h2>
        <Card className={`rounded-2xl p-4 border-0 ${
          darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700' : 'bg-gradient-to-br from-purple-50 to-pink-50'
        }`}>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className={`text-2xl text-[#E85883] mb-1`}>{cycleLength}</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg Cycle</p>
            </div>
            <div className="text-center">
              <p className={`text-2xl text-purple-600 mb-1`}>{periodLength}</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Period Days</p>
            </div>
            <div className="text-center">
              <p className={`text-2xl text-green-600 mb-1`}>95%</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Regular</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Health Tips */}
      <div className="px-6 py-4">
        <h2 className={`text-lg mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Phase-Specific Tips</h2>
        <Card className={`rounded-xl p-4 border-0 ${
          darkMode ? 'bg-gray-800' : phaseInfo[phase].bg
        }`}>
          <div className="flex items-start gap-3">
            <TrendingUp className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
              darkMode ? 'text-purple-400' : 'text-purple-600'
            }`} />
            <div>
              <h3 className={`text-sm mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Tips for {phaseInfo[phase].name}
              </h3>
              <ul className={`text-xs space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {phase === 'menstrual' && (
                  <>
                    <li>• Stay hydrated and rest well</li>
                    <li>• Use heating pad for cramps</li>
                    <li>• Eat iron-rich foods</li>
                  </>
                )}
                {phase === 'follicular' && (
                  <>
                    <li>• Great time to start new projects</li>
                    <li>• High-intensity workouts are easier</li>
                    <li>• Social energy is high</li>
                  </>
                )}
                {phase === 'ovulation' && (
                  <>
                    <li>• Peak fertility - track if trying to conceive</li>
                    <li>• You may feel most confident</li>
                    <li>• Great time for important conversations</li>
                  </>
                )}
                {phase === 'luteal' && (
                  <>
                    <li>• Focus on gentle, restorative activities</li>
                    <li>• Practice extra self-care</li>
                    <li>• Listen to your body's needs</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}