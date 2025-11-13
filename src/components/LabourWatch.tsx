import { useState } from 'react';
import { ArrowLeft, AlertCircle, Clock, Activity, Zap, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import logo from 'figma:asset/592f143304a29d7c71cbd3b4eb8ef0abf4fcc12a.png';

interface LabourWatchProps {
  onBack: () => void;
  darkMode?: boolean;
}

export function LabourWatch({ onBack, darkMode = false }: LabourWatchProps) {
  const [contractions, setContractions] = useState<{ time: Date; duration: number }[]>([]);
  const [isTimingContraction, setIsTimingContraction] = useState(false);
  const [contractionStart, setContractionStart] = useState<Date | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);

  const symptoms = [
    { id: 'regular-contractions', name: 'Regular contractions (5 mins apart)', critical: true },
    { id: 'water-broke', name: 'Water broke', critical: true },
    { id: 'bleeding', name: 'Heavy bleeding', critical: true },
    { id: 'severe-pain', name: 'Severe abdominal pain', critical: true },
    { id: 'decreased-movement', name: 'Decreased baby movement', critical: true },
    { id: 'back-pain', name: 'Lower back pain', critical: false },
    { id: 'pressure', name: 'Pelvic pressure', critical: false },
    { id: 'nausea', name: 'Nausea', critical: false },
    { id: 'bloody-show', name: 'Bloody show (mucus plug)', critical: false },
  ];

  const toggleSymptom = (symptomId: string) => {
    const symptom = symptoms.find(s => s.id === symptomId);
    const newSymptoms = selectedSymptoms.includes(symptomId)
      ? selectedSymptoms.filter(s => s !== symptomId)
      : [...selectedSymptoms, symptomId];
    
    setSelectedSymptoms(newSymptoms);

    // Check if critical symptoms are selected
    const criticalSelected = newSymptoms.filter(id => 
      symptoms.find(s => s.id === id)?.critical
    );

    if (criticalSelected.length >= 2 && !showEmergencyAlert) {
      setShowEmergencyAlert(true);
    }
  };

  const startContraction = () => {
    setIsTimingContraction(true);
    setContractionStart(new Date());
  };

  const stopContraction = () => {
    if (contractionStart) {
      const duration = Math.floor((new Date().getTime() - contractionStart.getTime()) / 1000);
      setContractions([...contractions, { time: contractionStart, duration }]);
      setIsTimingContraction(false);
      setContractionStart(null);
    }
  };

  const getContractionFrequency = () => {
    if (contractions.length < 2) return null;
    
    const recentContractions = contractions.slice(-5);
    const intervals = [];
    
    for (let i = 1; i < recentContractions.length; i++) {
      const interval = Math.floor(
        (recentContractions[i].time.getTime() - recentContractions[i - 1].time.getTime()) / 60000
      );
      intervals.push(interval);
    }
    
    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    return Math.round(avgInterval);
  };

  const avgFrequency = getContractionFrequency();
  const avgDuration = contractions.length > 0
    ? Math.round(contractions.reduce((sum, c) => sum + c.duration, 0) / contractions.length)
    : 0;

  const sendEmergencyAlert = () => {
    alert('🚨 EMERGENCY ALERT SENT!\n\n✓ Notifying emergency contacts\n✓ Sharing your location\n✓ Calling ambulance service\n\nHelp is on the way!');
    setShowEmergencyAlert(false);
  };

  if (showEmergencyAlert) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-6">
        <Card className="rounded-2xl p-6 border-2 border-red-500 max-w-md">
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-xl text-gray-900 mb-2">Critical Labour Symptoms Detected</h2>
            <p className="text-sm text-gray-600 mb-6">
              You've logged multiple critical symptoms. We recommend immediate medical attention.
            </p>
            <div className="space-y-3">
              <Button
                onClick={sendEmergencyAlert}
                className="w-full bg-red-600 text-white hover:bg-red-700 rounded-full py-6"
              >
                <AlertCircle className="w-5 h-5 mr-2" />
                Send Emergency Alert
              </Button>
              <Button
                onClick={() => setShowEmergencyAlert(false)}
                className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full py-3"
              >
                I'll Call Myself
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

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
        <h1 className={`text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>Labour Watch</h1>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Track contractions & symptoms
        </p>
      </div>

      {/* Contraction Timer */}
      <div className="px-6 py-4">
        <h2 className={`text-lg mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Contraction Timer</h2>
        <Card className={`rounded-2xl p-6 border-0 text-center ${
          darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700' : 'bg-gradient-to-br from-pink-50 to-purple-50'
        }`}>
          {isTimingContraction ? (
            <>
              <Clock className="w-12 h-12 text-[#E85883] mx-auto mb-3 animate-pulse" />
              <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Timing contraction...
              </p>
              <Button
                onClick={stopContraction}
                className="bg-red-600 text-white hover:bg-red-700 rounded-full px-8"
              >
                Stop
              </Button>
            </>
          ) : (
            <>
              <Activity className="w-12 h-12 text-[#E85883] mx-auto mb-3" />
              <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Press when contraction starts
              </p>
              <Button
                onClick={startContraction}
                className="bg-[#E85883] text-white hover:bg-[#D14770] rounded-full px-8"
              >
                Start Timer
              </Button>
            </>
          )}
        </Card>
      </div>

      {/* Contraction Stats */}
      {contractions.length > 0 && (
        <div className="px-6 py-4">
          <h2 className={`text-lg mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Contraction Pattern</h2>
          <div className="grid grid-cols-3 gap-3">
            <Card className={`rounded-2xl p-4 border-0 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <p className="text-2xl text-[#E85883] mb-1">{contractions.length}</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total</p>
            </Card>
            <Card className={`rounded-2xl p-4 border-0 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <p className="text-2xl text-purple-600 mb-1">{avgFrequency || '-'}</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Mins Apart</p>
            </Card>
            <Card className={`rounded-2xl p-4 border-0 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <p className="text-2xl text-blue-600 mb-1">{avgDuration}s</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg Duration</p>
            </Card>
          </div>

          {avgFrequency && avgFrequency <= 5 && (
            <Card className="rounded-2xl p-4 border-0 mt-3 bg-red-50">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm text-red-900 mb-1">Time to Go!</h3>
                  <p className="text-xs text-red-700">
                    Contractions are 5 minutes apart or less. Contact your healthcare provider.
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Recent Contractions */}
      {contractions.length > 0 && (
        <div className="px-6 py-4">
          <h3 className={`text-sm mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Contractions</h3>
          <Card className={`rounded-2xl p-3 border-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="space-y-2">
              {contractions.slice(-5).reverse().map((contraction, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {contraction.time.toLocaleTimeString()}
                  </span>
                  <span className="text-[#E85883]">{contraction.duration}s</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Labour Symptoms */}
      <div className="px-6 py-4">
        <h2 className={`text-lg mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Labour Symptoms</h2>
        <p className={`text-xs mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Select all symptoms you're experiencing
        </p>
        <div className="space-y-2">
          {symptoms.map((symptom) => (
            <button
              key={symptom.id}
              onClick={() => toggleSymptom(symptom.id)}
              className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all ${
                selectedSymptoms.includes(symptom.id)
                  ? symptom.critical
                    ? 'bg-red-50 border-2 border-red-500'
                    : 'bg-pink-50 border-2 border-[#E85883]'
                  : darkMode
                  ? 'bg-gray-800 border-2 border-gray-700'
                  : 'bg-white border-2 border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {symptom.critical && <AlertCircle className="w-5 h-5 text-red-600" />}
                <span className={`text-sm ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {symptom.name}
                </span>
              </div>
              {selectedSymptoms.includes(symptom.id) && (
                <CheckCircle2 className={`w-5 h-5 ${
                  symptom.critical ? 'text-red-600' : 'text-[#E85883]'
                }`} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* When to Go to Hospital */}
      <div className="px-6 py-4">
        <Card className={`rounded-2xl p-4 border-0 ${
          darkMode ? 'bg-gradient-to-br from-blue-900 to-purple-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
        }`}>
          <h3 className={`text-sm mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            When to Go to Hospital (5-1-1 Rule)
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <Zap className={`w-4 h-4 flex-shrink-0 mt-0.5 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Contractions are <strong>5 minutes apart</strong>
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Zap className={`w-4 h-4 flex-shrink-0 mt-0.5 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Each lasting <strong>1 minute</strong>
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Zap className={`w-4 h-4 flex-shrink-0 mt-0.5 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                For at least <strong>1 hour</strong>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
