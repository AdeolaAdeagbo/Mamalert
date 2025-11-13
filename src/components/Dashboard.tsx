import { useState } from 'react';
import { Calendar, Info, Bell, Heart, Shield, Activity, Users, FileText, User, AlertCircle, Phone, Clock, BookOpen, MapPin, Plus, Sparkles, Baby, Scale, Apple, Briefcase, Timer } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AINurse } from './AINurse';
import { SymptomLogger } from './SymptomLogger';
import { FindCare } from './FindCare';
import { EmergencyContacts } from './EmergencyContacts';
import { PostpartumMode } from './PostpartumMode';
import { Profile } from './Profile';
import { Settings } from './Settings';
import { FetalTracker } from './FetalTracker';
import { AppointmentManager } from './AppointmentManager';
import { HospitalBagChecklist } from './HospitalBagChecklist';
import { LabourWatch } from './LabourWatch';
import { WeightTrackerDetail } from './WeightTrackerDetail';
import { NutritionDetail } from './NutritionDetail';
import fetalImage from 'figma:asset/60d1da78814a3b9b775a09a2f9a44c0936b31778.png';
import logo from 'figma:asset/592f143304a29d7c71cbd3b4eb8ef0abf4fcc12a.png';

interface DashboardProps {
  onModeChange: (mode: 'pregnancy' | 'postpartum' | 'menstrual') => void;
  darkMode: boolean;
  onThemeToggle: () => void;
}

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dates = [20, 21, 22, 23, 24, 25, 26];

const insightCards = [
  { title: 'Track your symptoms daily', bgColor: 'bg-[#FFE5ED]', icon: '📝' },
  { title: 'Stay hydrated throughout the day', bgColor: 'bg-[#E8F5E9]', icon: '💧' },
  { title: 'Prepare your hospital bag', bgColor: 'bg-[#FFF3E0]', icon: '🎒' },
  { title: 'Practice breathing exercises', bgColor: 'bg-[#E3F2FD]', icon: '🧘‍♀️' },
  { title: 'Rest when baby rests', bgColor: 'bg-[#F3E5F5]', icon: '😴' },
  { title: 'Connect with other moms', bgColor: 'bg-[#FCE4EC]', icon: '👥' },
];

export function Dashboard({ onModeChange, darkMode, onThemeToggle }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('today');
  const [kickCount, setKickCount] = useState(0);
  const [showKickCounter, setShowKickCounter] = useState(false);
  const [showAINurse, setShowAINurse] = useState(false);
  const [showSymptomLogger, setShowSymptomLogger] = useState(false);
  const [showFindCare, setShowFindCare] = useState(false);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const [showPostpartumMode, setShowPostpartumMode] = useState(false);
  const [isPostpartumMode, setIsPostpartumMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showFetalTracker, setShowFetalTracker] = useState(false);
  const [showAppointmentManager, setShowAppointmentManager] = useState(false);
  const [showHospitalBag, setShowHospitalBag] = useState(false);
  const [showLabourWatch, setShowLabourWatch] = useState(false);
  const [showWeightTracker, setShowWeightTracker] = useState(false);
  const [showNutritionGuide, setShowNutritionGuide] = useState(false);
  const [currentWeek] = useState(38); // Current pregnancy week

  const handleEmergencyAlert = () => {
    if (confirm('🚨 Are you experiencing an emergency? This will alert your emergency contacts and provide nearby hospital information.')) {
      alert('Emergency alert sent to your contacts!\n\n📍 Nearest Hospital: St. Mary\'s Medical Center\n📞 Emergency Hotline: 911');
    }
  };

  const handleInsightCardClick = (index: number) => {
    switch (index) {
      case 0: // Track your symptoms daily
        setShowSymptomLogger(true);
        break;
      case 1: // Stay hydrated throughout the day
        setShowNutritionGuide(true);
        break;
      case 2: // Prepare your hospital bag
        if (currentWeek >= 36) {
          setShowHospitalBag(true);
        }
        break;
      case 3: // Practice breathing exercises
        setShowLabourWatch(true);
        break;
      case 4: // Rest when baby rests
        setShowWeightTracker(true);
        break;
      case 5: // Connect with other moms
        alert('Community feature coming soon! 👥');
        break;
    }
  };

  const recordKick = () => {
    setKickCount(prev => prev + 1);
  };

  const resetKickCounter = () => {
    setKickCount(0);
    setShowKickCounter(false);
  };

  if (showAINurse) {
    return <AINurse onBack={() => setShowAINurse(false)} />;
  }

  if (showSymptomLogger || activeTab === 'symptoms') {
    return <SymptomLogger onBack={() => {
      setShowSymptomLogger(false);
      setActiveTab('today');
    }} />;
  }

  if (showFindCare) {
    return <FindCare onBack={() => setShowFindCare(false)} />;
  }

  if (showEmergencyContacts) {
    return <EmergencyContacts onBack={() => setShowEmergencyContacts(false)} />;
  }

  if (showSettings) {
    return <Settings 
      onBack={() => setShowSettings(false)}
      currentMode='pregnancy'
      onModeChange={onModeChange}
      darkMode={darkMode}
      onThemeToggle={onThemeToggle}
    />;
  }

  if (showFetalTracker) {
    return <FetalTracker onBack={() => setShowFetalTracker(false)} darkMode={darkMode} />;
  }

  if (showAppointmentManager) {
    return <AppointmentManager onBack={() => setShowAppointmentManager(false)} darkMode={darkMode} />;
  }

  if (showHospitalBag) {
    return <HospitalBagChecklist onBack={() => setShowHospitalBag(false)} darkMode={darkMode} />;
  }

  if (showLabourWatch) {
    return <LabourWatch onBack={() => setShowLabourWatch(false)} darkMode={darkMode} />;
  }

  if (showWeightTracker) {
    return <WeightTrackerDetail onBack={() => setShowWeightTracker(false)} darkMode={darkMode} />;
  }

  if (showNutritionGuide) {
    return <NutritionDetail onBack={() => setShowNutritionGuide(false)} darkMode={darkMode} />;
  }

  if (activeTab === 'profile') {
    return <Profile 
      onBack={() => setActiveTab('today')} 
      onSwitchToPostpartum={() => onModeChange('postpartum')}
      onOpenSettings={() => setShowSettings(true)}
    />;
  }

  if (isPostpartumMode) {
    return <PostpartumMode />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE5ED] to-white pb-20">
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
          <button className="p-2">
            <Calendar className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Date Display */}
      <div className="text-center py-2">
        <p className="text-gray-700">Nov 9, 2025</p>
      </div>

      {/* Week Calendar */}
      <div className="px-6 py-3">
        <div className="flex justify-between items-center">
          {weekDays.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <p className="text-xs text-gray-500 mb-2">{day}</p>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  dates[index] === 24
                    ? 'bg-white text-[#E85883] shadow-md'
                    : 'text-gray-600'
                }`}
              >
                {dates[index]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fetal Tracker Card */}
      <div className="px-6 py-4">
        <div className="bg-gradient-to-br from-[#FFD4E5] to-[#FFF0F5] rounded-3xl overflow-hidden shadow-lg">
          {/* Fetal Image */}
          <div className="flex justify-center items-center py-8 px-6">
            <img
              src={fetalImage}
              alt="Fetal development"
              className="w-64 h-64 object-contain"
            />
          </div>

          {/* Pregnancy Info */}
          <div className="text-center pb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <h2 className="text-2xl text-[#A0522D]">38 weeks, 1 day</h2>
              <Info className="w-5 h-5 text-[#A0522D]" />
            </div>
            <p className="text-sm text-gray-600 mb-3">Your baby is the size of a watermelon 🍉</p>
            <div className="flex gap-2 justify-center mb-3">
              <Button 
                className="bg-white text-[#E85883] hover:bg-gray-50 rounded-full px-6 shadow-md"
                onClick={() => setShowFetalTracker(true)}
              >
                Full Tracker
              </Button>
              <Button 
                className="bg-white text-[#E85883] hover:bg-gray-50 rounded-full px-6 shadow-md"
                onClick={() => setShowKickCounter(!showKickCounter)}
              >
                {showKickCounter ? 'Hide Counter' : 'Quick Count'}
              </Button>
            </div>
            
            {/* Kick Counter */}
            {showKickCounter && (
              <div className="mt-4 mx-6 p-4 bg-white rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm">Kick Count Today</p>
                  <button 
                    onClick={resetKickCounter}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Reset
                  </button>
                </div>
                <div className="text-4xl text-[#E85883] mb-3">{kickCount} kicks</div>
                <Button 
                  onClick={recordKick}
                  className="w-full bg-[#E85883] hover:bg-[#D14770] text-white rounded-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Record Kick
                </Button>
                <p className="text-xs text-gray-500 mt-2">Aim for 10 kicks within 2 hours</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Emergency Alert Button */}
      <div className="px-6 py-2">
        <button 
          onClick={handleEmergencyAlert}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl p-4 flex items-center justify-center gap-3 shadow-lg hover:from-red-600 hover:to-red-700 transition-all"
        >
          <AlertCircle className="w-6 h-6" />
          <span className="text-lg">Emergency Alert</span>
          <Phone className="w-5 h-5" />
        </button>
      </div>

      {/* Feature Cards */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl">Your Health Dashboard</h2>
          <button className="text-xs text-[#E85883] hover:underline">View All</button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Appointment Reminder Card */}
          <Card 
            onClick={() => setShowAppointmentManager(true)}
            className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 rounded-2xl p-4 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-3">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-sm mb-1">Next Visit</h3>
            <p className="text-xs text-gray-600 mb-1">Nov 15, 10:00 AM</p>
            <p className="text-xs text-blue-700">Dr. Sarah Johnson</p>
          </Card>

          {/* Daily Health Tip Card */}
          <Card 
            onClick={() => setShowNutritionGuide(true)}
            className="bg-gradient-to-br from-green-50 to-green-100 border-0 rounded-2xl p-4 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-3">
              <Apple className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-sm mb-1">Nutrition Guide</h3>
            <p className="text-xs text-gray-700">Healthy eating for pregnancy</p>
          </Card>

          {/* Weight Tracker Card */}
          <Card 
            onClick={() => setShowWeightTracker(true)}
            className="bg-gradient-to-br from-amber-50 to-amber-100 border-0 rounded-2xl p-4 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-3">
              <Scale className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-sm mb-1">Weight Tracker</h3>
            <p className="text-xs text-gray-700 mb-1">Current: 73kg</p>
            <p className="text-xs text-amber-700">+8kg gained</p>
          </Card>

          {/* Hospital Bag - Only show when close to term (week 36+) */}
          {currentWeek >= 36 && (
            <Card 
              onClick={() => setShowHospitalBag(true)}
              className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 rounded-2xl p-4 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-3">
                <Briefcase className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-sm mb-1">Hospital Bag</h3>
              <p className="text-xs text-gray-700 mb-1">80% complete</p>
              <p className="text-xs text-purple-700">Check your list</p>
            </Card>
          )}
        </div>
      </div>

      {/* Labour Watch - Only show when very close to term (week 37+) */}
      {currentWeek >= 37 && (
        <div className="px-6 py-4">
          <div 
            onClick={() => setShowLabourWatch(true)}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl p-5 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <Timer className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1">Labour Watch</h3>
                <p className="text-sm opacity-90">Track contractions & symptoms</p>
              </div>
              <div className="text-2xl">→</div>
            </div>
          </div>
        </div>
      )}

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 py-3">
        <div className="w-2 h-2 rounded-full bg-gray-800"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      </div>

      {/* My Daily Insights */}
      <div className="px-6 py-4">
        <h2 className="text-xl mb-4">My daily insights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {insightCards.map((card, index) => (
            <Card
              key={index}
              className={`${card.bgColor} h-[160px] rounded-2xl border-0 p-4 flex flex-col`}
              onClick={() => handleInsightCardClick(index)}
            >
              <p className="text-sm mb-auto">{card.title}</p>
              <div className="text-4xl opacity-50 mt-auto">{card.icon}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Access Menu */}
      <div className="px-6 py-4">
        <h2 className="text-xl mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setShowFindCare(true)}
            className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow text-left"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-sm mb-1">Find Care</h3>
            <p className="text-xs text-gray-600">Nearby hospitals</p>
          </button>

          <button
            onClick={() => setShowEmergencyContacts(true)}
            className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow text-left"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-sm mb-1">Emergency Contacts</h3>
            <p className="text-xs text-gray-600">2 contacts added</p>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-3 sm:px-6 py-3 max-w-md mx-auto">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setActiveTab('today')}
            className={`flex flex-col items-center gap-1 min-w-0 flex-1 ${
              activeTab === 'today' ? 'text-[#E85883]' : 'text-gray-400'
            }`}
          >
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-[10px] sm:text-xs">Today</span>
          </button>

          <button
            onClick={() => setActiveTab('symptoms')}
            className={`flex flex-col items-center gap-1 min-w-0 flex-1 ${
              activeTab === 'symptoms' ? 'text-[#E85883]' : 'text-gray-400'
            }`}
          >
            <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-[10px] sm:text-xs">Log</span>
          </button>

          <button
            onClick={() => setActiveTab('insights')}
            className={`flex flex-col items-center gap-1 min-w-0 flex-1 ${
              activeTab === 'insights' ? 'text-[#E85883]' : 'text-gray-400'
            }`}
          >
            <Activity className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-[10px] sm:text-xs">Insights</span>
          </button>

          <button
            onClick={() => setActiveTab('records')}
            className={`flex flex-col items-center gap-1 min-w-0 flex-1 ${
              activeTab === 'records' ? 'text-[#E85883]' : 'text-gray-400'
            }`}
          >
            <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-[10px] sm:text-xs">Records</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 relative min-w-0 flex-1 ${
              activeTab === 'profile' ? 'text-[#E85883]' : 'text-gray-400'
            }`}
          >
            <User className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-[10px] sm:text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}