import { useState } from 'react';
import { ArrowLeft, AlertTriangle, Check, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import logo from 'figma:asset/592f143304a29d7c71cbd3b4eb8ef0abf4fcc12a.png';

interface Symptom {
  id: number;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  dangerous: boolean;
  timestamp: Date;
}

const commonSymptoms = [
  { name: 'Headache', dangerous: false },
  { name: 'Nausea', dangerous: false },
  { name: 'Back Pain', dangerous: false },
  { name: 'Swelling', dangerous: false },
  { name: 'Fatigue', dangerous: false },
  { name: 'Severe Headache', dangerous: true },
  { name: 'Vision Changes', dangerous: true },
  { name: 'Vaginal Bleeding', dangerous: true },
  { name: 'Severe Abdominal Pain', dangerous: true },
  { name: 'Decreased Fetal Movement', dangerous: true },
  { name: 'Chest Pain', dangerous: true },
  { name: 'Difficulty Breathing', dangerous: true },
  { name: 'Severe Swelling', dangerous: true },
];

export function SymptomLogger({ onBack }: { onBack: () => void }) {
  const [symptoms, setSymptoms] = useState<Symptom[]>([
    {
      id: 1,
      name: 'Mild Headache',
      severity: 'mild',
      dangerous: false,
      timestamp: new Date(Date.now() - 86400000), // Yesterday
    },
    {
      id: 2,
      name: 'Back Pain',
      severity: 'moderate',
      dangerous: false,
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
    },
  ]);
  const [showAddSymptom, setShowAddSymptom] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<'mild' | 'moderate' | 'severe'>('mild');

  const handleLogSymptom = () => {
    if (!selectedSymptom) return;

    const symptomData = commonSymptoms.find(s => s.name === selectedSymptom);
    const newSymptom: Symptom = {
      id: symptoms.length + 1,
      name: selectedSymptom,
      severity: selectedSeverity,
      dangerous: symptomData?.dangerous || false,
      timestamp: new Date(),
    };

    setSymptoms([newSymptom, ...symptoms]);

    // If dangerous symptom, show alert
    if (symptomData?.dangerous) {
      setTimeout(() => {
        alert(`⚠️ URGENT ALERT\n\n"${selectedSymptom}" is a potentially serious symptom.\n\n🚨 Action Required:\n• Call your healthcare provider immediately\n• Emergency contacts have been notified\n• Nearest hospital: St. Mary's Medical Center\n\nIf this is an emergency, call 911 now.`);
      }, 300);
    }

    // Reset form
    setShowAddSymptom(false);
    setSelectedSymptom('');
    setSelectedSeverity('mild');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild':
        return 'bg-green-100 text-green-700';
      case 'moderate':
        return 'bg-amber-100 text-amber-700';
      case 'severe':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE5ED] to-white pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-2">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <img src={logo} alt="MamaAlert" className="h-6" />
          <button
            onClick={() => setShowAddSymptom(true)}
            className="p-2 bg-[#E85883] rounded-full"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>
        <h1 className="text-xl">Symptom Logger</h1>
        <p className="text-sm text-gray-600">Track your pregnancy symptoms</p>
      </div>

      {/* Warning Card */}
      <div className="px-6 py-4">
        <Card className="bg-red-50 border-red-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm text-red-800 mb-1">When to seek immediate care:</h3>
              <p className="text-xs text-red-700">
                Severe headache, vision changes, vaginal bleeding, severe pain, decreased fetal movement, chest pain, or difficulty breathing.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Add Symptom Form */}
      {showAddSymptom && (
        <div className="px-6 py-4">
          <Card className="bg-white rounded-2xl p-4 shadow-lg">
            <h3 className="text-lg mb-4">Log New Symptom</h3>
            
            {/* Symptom Selection */}
            <div className="mb-4">
              <label className="text-sm text-gray-700 mb-2 block">Select Symptom</label>
              <select
                value={selectedSymptom}
                onChange={(e) => setSelectedSymptom(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E85883]"
              >
                <option value="">Choose a symptom...</option>
                {commonSymptoms.map((symptom, index) => (
                  <option key={index} value={symptom.name}>
                    {symptom.name} {symptom.dangerous ? '⚠️' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Severity Selection */}
            <div className="mb-4">
              <label className="text-sm text-gray-700 mb-2 block">Severity Level</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSelectedSeverity('mild')}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    selectedSeverity === 'mild'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 bg-white text-gray-700'
                  }`}
                >
                  <span className="text-xs">Mild</span>
                </button>
                <button
                  onClick={() => setSelectedSeverity('moderate')}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    selectedSeverity === 'moderate'
                      ? 'border-amber-500 bg-amber-50 text-amber-700'
                      : 'border-gray-200 bg-white text-gray-700'
                  }`}
                >
                  <span className="text-xs">Moderate</span>
                </button>
                <button
                  onClick={() => setSelectedSeverity('severe')}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    selectedSeverity === 'severe'
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 bg-white text-gray-700'
                  }`}
                >
                  <span className="text-xs">Severe</span>
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={() => setShowAddSymptom(false)}
                className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full"
              >
                Cancel
              </Button>
              <Button
                onClick={handleLogSymptom}
                className="flex-1 bg-[#E85883] text-white hover:bg-[#D14770] rounded-full"
              >
                <Check className="w-4 h-4 mr-2" />
                Log Symptom
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Symptoms List */}
      <div className="px-6 py-4">
        <h2 className="text-lg mb-3">Recent Symptoms</h2>
        {symptoms.length === 0 ? (
          <Card className="bg-white rounded-2xl p-6 text-center">
            <p className="text-gray-500">No symptoms logged yet</p>
            <p className="text-sm text-gray-400 mt-2">Tap + to add a symptom</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {symptoms.map((symptom) => (
              <Card key={symptom.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm">{symptom.name}</h3>
                      {symptom.dangerous && (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      {symptom.timestamp.toLocaleDateString()} at{' '}
                      {symptom.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${getSeverityColor(
                      symptom.severity
                    )}`}
                  >
                    {symptom.severity}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="px-6 py-4">
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 rounded-2xl p-4">
          <h3 className="text-sm mb-3">This Week's Summary</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-2xl text-[#E85883]">{symptoms.length}</p>
              <p className="text-xs text-gray-600">Total</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-amber-600">
                {symptoms.filter((s) => s.severity === 'moderate').length}
              </p>
              <p className="text-xs text-gray-600">Moderate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-red-600">
                {symptoms.filter((s) => s.dangerous).length}
              </p>
              <p className="text-xs text-gray-600">Critical</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
