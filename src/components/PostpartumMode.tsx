import { useState } from 'react';
import { Calendar, Heart, Baby, Syringe, Brain, Plus, Clock, TrendingUp, Check, AlertCircle, Phone, Sparkles } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AINurse } from './AINurse';
import { BabySymptomLogger } from './BabySymptomLogger';
import { PostpartumSymptomLogger } from './PostpartumSymptomLogger';
import logo from 'figma:asset/592f143304a29d7c71cbd3b4eb8ef0abf4fcc12a.png';

const breastfeedingImage = "https://images.unsplash.com/photo-1648375975494-30e0629799a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RoZXIlMjBicmVhc3RmZWVkaW5nJTIwYmFieXxlbnwxfHx8fDE3NjI4ODI0NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const babySleepImage = "https://images.unsplash.com/photo-1758541205910-483f1123ed93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwc2xlZXBpbmclMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NjI5NDQxODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const supportImage = "https://images.unsplash.com/photo-1758691462071-757bca955439?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwc3VwcG9ydCUyMHdvbWFufGVufDF8fHx8MTc2Mjk1MzAzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

interface FeedingSession {
  id: number;
  time: Date;
  duration: number;
  side: 'left' | 'right' | 'both';
}

interface Vaccination {
  id: number;
  name: string;
  dueDate: Date;
  completed: boolean;
  notes?: string;
}

const affirmations = [
  "You are doing an amazing job, mama! 💕",
  "Your body created and nourished a miracle. Be proud! 🌟",
  "It's okay to ask for help. You don't have to do it all alone. 🤝",
  "Your feelings are valid. Be gentle with yourself. 🌸",
  "Every day you're getting stronger. One day at a time. 💪",
  "You are exactly the mother your baby needs. 👶💗",
];

export function PostpartumMode() {
  const [activeView, setActiveView] = useState<'overview' | 'feeding' | 'infant' | 'vaccination' | 'mental'>('overview');
  const [feedingSessions, setFeedingSessions] = useState<FeedingSession[]>([
    { id: 1, time: new Date(Date.now() - 7200000), duration: 20, side: 'left' },
    { id: 2, time: new Date(Date.now() - 14400000), duration: 25, side: 'right' },
  ]);
  const [todayAffirmation] = useState(affirmations[Math.floor(Math.random() * affirmations.length)]);
  const [moodScore, setMoodScore] = useState<number | null>(null);
  const [showFeedingForm, setShowFeedingForm] = useState(false);
  const [showAINurse, setShowAINurse] = useState(false);
  const [showBabySymptoms, setShowBabySymptoms] = useState(false);
  const [showPostpartumSymptoms, setShowPostpartumSymptoms] = useState(false);

  const handleStartFeeding = () => {
    const newSession: FeedingSession = {
      id: feedingSessions.length + 1,
      time: new Date(),
      duration: 0,
      side: 'left',
    };
    setFeedingSessions([newSession, ...feedingSessions]);
    setShowFeedingForm(false);
  };

  const handleEmergencyAlert = () => {
    if (confirm('🚨 Are you experiencing an emergency? This will alert your emergency contacts and provide nearby hospital information.')) {
      alert('Emergency alert sent to your contacts!\n\n📍 Nearest Hospital: St. Mary\'s Medical Center\n📞 Emergency Hotline: 911');
    }
  };

  if (showAINurse) {
    return <AINurse onBack={() => setShowAINurse(false)} />;
  }

  if (showBabySymptoms) {
    return <BabySymptomLogger onBack={() => setShowBabySymptoms(false)} />;
  }

  if (showPostpartumSymptoms) {
    return <PostpartumSymptomLogger onBack={() => setShowPostpartumSymptoms(false)} />;
  }

  if (activeView === 'overview') {
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
            <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
              Postpartum Mode
            </span>
          </div>
        </div>

        {/* Welcome Banner */}
        <div className="px-6 py-4">
          <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-0 rounded-2xl p-4 relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                <ImageWithFallback
                  src={supportImage}
                  alt="Postpartum Care"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg mb-1">Welcome to Postpartum Care</h2>
                <p className="text-sm text-gray-700">
                  Track your recovery and your baby's health
                </p>
              </div>
            </div>
          </Card>
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

        {/* Daily Affirmation */}
        <div className="px-6 py-2">
          <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-0 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <Heart className="w-6 h-6 text-pink-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-600 mb-1">Today's Affirmation</p>
                <p className="text-sm text-gray-800">{todayAffirmation}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="px-6 py-4">
          <h2 className="text-lg mb-3">Today's Summary</h2>
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-white border-0 rounded-2xl p-4 shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <Baby className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-2xl text-blue-600 mb-1">{feedingSessions.length}</p>
              <p className="text-xs text-gray-600">Feeding sessions</p>
            </Card>

            <Card className="bg-white border-0 rounded-2xl p-4 shadow-sm">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-2xl text-green-600 mb-1">
                {feedingSessions.reduce((acc, s) => acc + s.duration, 0)} min
              </p>
              <p className="text-xs text-gray-600">Total feeding time</p>
            </Card>
          </div>
        </div>

        {/* Symptom Logging Cards */}
        <div className="px-6 py-4">
          <h2 className="text-lg mb-3">Health Monitoring</h2>
          <div className="space-y-3">
            {/* Mother's Symptoms */}
            <Card
              onClick={() => setShowPostpartumSymptoms(true)}
              className="bg-gradient-to-br from-pink-50 to-pink-100 border-0 rounded-2xl p-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm mb-1">Log Your Symptoms</h3>
                  <p className="text-xs text-gray-700">Track postpartum recovery</p>
                </div>
                <div className="text-2xl">→</div>
              </div>
            </Card>

            {/* Baby's Symptoms */}
            <Card
              onClick={() => setShowBabySymptoms(true)}
              className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 rounded-2xl p-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm mb-1">Log Baby's Symptoms</h3>
                  <p className="text-xs text-gray-700">Monitor infant health</p>
                </div>
                <div className="text-2xl">→</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="px-6 py-4">
          <h2 className="text-lg mb-3">Postpartum Tools</h2>
          <div className="space-y-3">
            {/* Breastfeeding Tracker */}
            <Card
              onClick={() => setActiveView('feeding')}
              className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 rounded-2xl p-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Baby className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm mb-1">Breastfeeding Tracker</h3>
                  <p className="text-xs text-gray-700">Log feeding sessions & patterns</p>
                </div>
                <div className="text-2xl">→</div>
              </div>
            </Card>

            {/* Infant Health Monitor */}
            <Card
              onClick={() => setActiveView('infant')}
              className="bg-gradient-to-br from-green-50 to-green-100 border-0 rounded-2xl p-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm mb-1">Infant Health Monitor</h3>
                  <p className="text-xs text-gray-700">Track weight, sleep & milestones</p>
                </div>
                <div className="text-2xl">→</div>
              </div>
            </Card>

            {/* Vaccination Schedule */}
            <Card
              onClick={() => setActiveView('vaccination')}
              className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 rounded-2xl p-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Syringe className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm mb-1">Vaccination Schedule</h3>
                  <p className="text-xs text-gray-700">Never miss an immunization</p>
                </div>
                <div className="text-2xl">→</div>
              </div>
            </Card>

            {/* Mental Health Tracker */}
            <Card
              onClick={() => setActiveView('mental')}
              className="bg-gradient-to-br from-pink-50 to-pink-100 border-0 rounded-2xl p-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-pink-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm mb-1">Mental Health & Wellness</h3>
                  <p className="text-xs text-gray-700">Track mood & get support</p>
                </div>
                <div className="text-2xl">→</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'feeding') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFE5ED] to-white pb-20">
        {/* Header */}
        <div className="bg-white shadow-sm px-6 py-4 sticky top-0 z-10">
          <button onClick={() => setActiveView('overview')} className="text-sm text-[#E85883] mb-2">
            ← Back to Overview
          </button>
          <h1 className="text-xl mb-1">Breastfeeding Tracker</h1>
          <p className="text-sm text-gray-600">{feedingSessions.length} sessions today</p>
        </div>

        {/* Hero Image */}
        <div className="px-6 py-4">
          <div className="h-40 rounded-2xl overflow-hidden">
            <ImageWithFallback
              src={breastfeedingImage}
              alt="Breastfeeding"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Quick Start */}
        <div className="px-6 py-2">
          <Button
            onClick={handleStartFeeding}
            className="w-full bg-[#E85883] text-white hover:bg-[#D14770] rounded-2xl py-6"
          >
            <Plus className="w-6 h-6 mr-2" />
            Start Feeding Session
          </Button>
        </div>

        {/* Today's Stats */}
        <div className="px-6 py-4">
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 rounded-2xl p-4">
            <h3 className="text-sm mb-3">Today's Feeding Stats</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-2xl text-[#E85883]">{feedingSessions.length}</p>
                <p className="text-xs text-gray-600">Sessions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-blue-600">
                  {feedingSessions.reduce((acc, s) => acc + s.duration, 0)}m
                </p>
                <p className="text-xs text-gray-600">Total Time</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-green-600">
                  {feedingSessions.length > 0
                    ? Math.round(
                        feedingSessions.reduce((acc, s) => acc + s.duration, 0) /
                          feedingSessions.length
                      )
                    : 0}
                  m
                </p>
                <p className="text-xs text-gray-600">Avg Duration</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Sessions */}
        <div className="px-6 py-4">
          <h2 className="text-lg mb-3">Recent Sessions</h2>
          {feedingSessions.length === 0 ? (
            <Card className="bg-white rounded-2xl p-6 text-center">
              <Baby className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No sessions logged yet</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {feedingSessions.map((session) => (
                <Card key={session.id} className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Baby className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm">
                          {session.time.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">{session.side} side</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-blue-600">{session.duration} min</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeView === 'infant') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFE5ED] to-white pb-20">
        {/* Header */}
        <div className="bg-white shadow-sm px-6 py-4 sticky top-0 z-10">
          <button onClick={() => setActiveView('overview')} className="text-sm text-[#E85883] mb-2">
            ← Back to Overview
          </button>
          <h1 className="text-xl mb-1">Infant Health Monitor</h1>
          <p className="text-sm text-gray-600">Track your baby's growth</p>
        </div>

        {/* Baby Info Card */}
        <div className="px-6 py-4">
          <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-0 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-4xl">👶</div>
              <div>
                <h3 className="text-sm">Baby's Age</h3>
                <p className="text-xs text-gray-600">2 weeks old</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Growth Metrics */}
        <div className="px-6 py-4">
          <h2 className="text-lg mb-3">Growth Tracking</h2>
          <div className="space-y-3">
            {/* Weight */}
            <Card className="bg-white border-0 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h3 className="text-sm">Weight</h3>
                </div>
                <Button className="text-xs bg-[#E85883] text-white hover:bg-[#D14770] rounded-full px-3 py-1">
                  Add Entry
                </Button>
              </div>
              <p className="text-2xl text-green-600 mb-1">7.5 lbs</p>
              <p className="text-xs text-gray-600">Last updated: Today</p>
            </Card>

            {/* Sleep */}
            <Card className="bg-white border-0 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm">Sleep Today</h3>
                </div>
                <Button className="text-xs bg-[#E85883] text-white hover:bg-[#D14770] rounded-full px-3 py-1">
                  Log Sleep
                </Button>
              </div>
              <p className="text-2xl text-blue-600 mb-1">14 hours</p>
              <p className="text-xs text-gray-600">5 naps logged</p>
            </Card>

            {/* Diapers */}
            <Card className="bg-white border-0 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Baby className="w-5 h-5 text-amber-600" />
                  <h3 className="text-sm">Diapers Today</h3>
                </div>
                <Button className="text-xs bg-[#E85883] text-white hover:bg-[#D14770] rounded-full px-3 py-1">
                  Add Change
                </Button>
              </div>
              <p className="text-2xl text-amber-600 mb-1">8 changes</p>
              <p className="text-xs text-gray-600">6 wet, 2 dirty</p>
            </Card>
          </div>
        </div>

        {/* Milestones */}
        <div className="px-6 py-4">
          <h2 className="text-lg mb-3">Developmental Milestones</h2>
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-0 rounded-2xl p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <p className="text-sm text-gray-700">First smile (expected: 6-8 weeks)</p>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <p className="text-sm text-gray-700">Holds head up (expected: 1-3 months)</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                <p className="text-sm text-gray-500">Grasps objects (expected: 3-4 months)</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (activeView === 'vaccination') {
    const vaccinations: Vaccination[] = [
      { id: 1, name: 'BCG (Bacillus Calmette-Guérin)', dueDate: new Date('2025-11-10'), completed: true },
      { id: 2, name: 'OPV 0 (Oral Polio Vaccine)', dueDate: new Date('2025-11-10'), completed: true },
      { id: 3, name: 'Hepatitis B (Birth dose)', dueDate: new Date('2025-11-10'), completed: true },
      { id: 4, name: 'OPV 1, Pentavalent 1, PCV 1', dueDate: new Date('2025-12-23'), completed: false },
      { id: 5, name: 'OPV 2, Pentavalent 2, PCV 2', dueDate: new Date('2026-01-20'), completed: false },
      { id: 6, name: 'OPV 3, Pentavalent 3, PCV 3, IPV', dueDate: new Date('2026-02-17'), completed: false },
      { id: 7, name: 'Vitamin A (1st dose)', dueDate: new Date('2026-05-09'), completed: false },
      { id: 8, name: 'Measles & Yellow Fever', dueDate: new Date('2026-08-09'), completed: false },
    ];
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFE5ED] to-white pb-20">
        {/* Header */}
        <div className="bg-white shadow-sm px-6 py-4 sticky top-0 z-10">
          <button onClick={() => setActiveView('overview')} className="text-sm text-[#E85883] mb-2">
            ← Back to Overview
          </button>
          <h1 className="text-xl mb-1">Vaccination Schedule</h1>
          <p className="text-sm text-gray-600">Keep your baby protected</p>
        </div>

        {/* Next Vaccination */}
        <div className="px-6 py-4">
          <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-0 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <Syringe className="w-6 h-6 text-purple-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-700 mb-1">Next Vaccination</p>
                <h3 className="text-sm mb-1">Hepatitis B (2nd dose)</h3>
                <p className="text-xs text-gray-600">
                  Due: {new Date('2025-12-10').toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Vaccination List */}
        <div className="px-6 py-4">
          <h2 className="text-lg mb-3">Vaccination Timeline</h2>
          <div className="space-y-3">
            {vaccinations.map((vaccine) => (
              <Card
                key={vaccine.id}
                className={`rounded-2xl p-4 ${
                  vaccine.completed
                    ? 'bg-green-50 border-green-200'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                        vaccine.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      {vaccine.completed && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm mb-1">{vaccine.name}</h3>
                      <p className="text-xs text-gray-600 mb-2">
                        Due: {vaccine.dueDate.toLocaleDateString()}
                      </p>
                      {vaccine.completed ? (
                        <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                          ✓ Completed
                        </span>
                      ) : (
                        <Button className="text-xs bg-[#E85883] text-white hover:bg-[#D14770] rounded-full px-3 py-1">
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'mental') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFE5ED] to-white pb-20">
        {/* Header */}
        <div className="bg-white shadow-sm px-6 py-4 sticky top-0 z-10">
          <button onClick={() => setActiveView('overview')} className="text-sm text-[#E85883] mb-2">
            ← Back to Overview
          </button>
          <h1 className="text-xl mb-1">Mental Health & Wellness</h1>
          <p className="text-sm text-gray-600">Your wellbeing matters</p>
        </div>

        {/* Affirmation */}
        <div className="px-6 py-4">
          <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-0 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <Heart className="w-6 h-6 text-pink-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-600 mb-1">Daily Affirmation</p>
                <p className="text-sm text-gray-800">{todayAffirmation}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Mood Tracker */}
        <div className="px-6 py-4">
          <h2 className="text-lg mb-3">How are you feeling today?</h2>
          <Card className="bg-white rounded-2xl p-4">
            <div className="grid grid-cols-5 gap-2 mb-4">
              {['😢', '😔', '😐', '🙂', '😊'].map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => setMoodScore(index + 1)}
                  className={`text-4xl py-4 rounded-xl transition-all ${
                    moodScore === index + 1
                      ? 'bg-[#E85883] scale-110'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            {moodScore && (
              <p className="text-xs text-center text-gray-600">
                Thanks for sharing! We're here to support you.
              </p>
            )}
          </Card>
        </div>

        {/* Support Resources */}
        <div className="px-6 py-4">
          <h2 className="text-lg mb-3">Support Resources</h2>
          <div className="space-y-3">
            <Card className="bg-blue-50 border-blue-200 rounded-xl p-4">
              <h3 className="text-sm mb-1">Postpartum Support Hotline</h3>
              <p className="text-xs text-gray-700 mb-2">
                Available 24/7 for emotional support
              </p>
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-full text-sm">
                Call 1-800-PPD-MOMS
              </Button>
            </Card>

            <Card className="bg-green-50 border-green-200 rounded-xl p-4">
              <h3 className="text-sm mb-1">Self-Care Tips</h3>
              <ul className="text-xs text-gray-700 space-y-1 mt-2">
                <li>• Rest when baby sleeps</li>
                <li>• Accept help from loved ones</li>
                <li>• Stay hydrated and eat well</li>
                <li>• Take short walks outdoors</li>
                <li>• Connect with other new moms</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Symptom Warning */}
        <div className="px-6 py-4">
          <Card className="bg-red-50 border-red-200 rounded-xl p-4">
            <h3 className="text-sm text-red-800 mb-2">When to seek help:</h3>
            <p className="text-xs text-red-700">
              If you experience severe mood changes, thoughts of harming yourself or baby, or feelings of hopelessness, please call your healthcare provider or the crisis hotline immediately.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}