import { useState } from 'react';
import { ArrowLeft, AlertTriangle, Check, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from 'figma:asset/592f143304a29d7c71cbd3b4eb8ef0abf4fcc12a.png';

const postpartumCareImage = "https://images.unsplash.com/photo-1759802147227-d9b32bd34996?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RoZXIlMjBwb3N0cGFydHVtJTIwY2FyZXxlbnwxfHx8fDE3NjI5NTMwMzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

interface PostpartumSymptom {
  id: number;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  dangerous: boolean;
  timestamp: Date;
  notes?: string;
}

const postpartumSymptoms = [
  { name: 'Mild Cramping', dangerous: false },
  { name: 'Breast Tenderness', dangerous: false },
  { name: 'Fatigue', dangerous: false },
  { name: 'Mood Changes', dangerous: false },
  { name: 'Constipation', dangerous: false },
  { name: 'Night Sweats', dangerous: false },
  { name: 'Heavy Bleeding (soaking pad in 1 hour)', dangerous: true },
  { name: 'Severe Headache', dangerous: true },
  { name: 'Fever over 100.4°F', dangerous: true },
  { name: 'Severe Abdominal Pain', dangerous: true },
  { name: 'Chest Pain or Shortness of Breath', dangerous: true },
  { name: 'Red/Swollen/Painful Leg', dangerous: true },
  { name: 'Severe Depression/Anxiety', dangerous: true },
  { name: 'Thoughts of Harming Self/Baby', dangerous: true },
  { name: 'Infected C-Section/Episiotomy Site', dangerous: true },
];

export function PostpartumSymptomLogger({ onBack }: { onBack: () => void }) {
  const [symptoms, setSymptoms] = useState<PostpartumSymptom[]>([
    {
      id: 1,
      name: 'Mild Cramping',
      severity: 'mild',
      dangerous: false,
      timestamp: new Date(Date.now() - 7200000),
    },
    {
      id: 2,
      name: 'Night Sweats',
      severity: 'mild',
      dangerous: false,
      timestamp: new Date(Date.now() - 86400000),
    },
  ]);
  const [showAddSymptom, setShowAddSymptom] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<'mild' | 'moderate' | 'severe'>('mild');
  const [notes, setNotes] = useState('');

  const handleLogSymptom = () => {
    if (!selectedSymptom) return;

    const symptomData = postpartumSymptoms.find(s => s.name === selectedSymptom);
    const newSymptom: PostpartumSymptom = {
      id: symptoms.length + 1,
      name: selectedSymptom,
      severity: selectedSeverity,
      dangerous: symptomData?.dangerous || false,
      timestamp: new Date(),
      notes: notes || undefined,
    };

    setSymptoms([newSymptom, ...symptoms]);

    // If dangerous symptom, show alert
    if (symptomData?.dangerous) {
      setTimeout(() => {
        alert(
          `🚨 URGENT POSTPARTUM ALERT\n\n"${selectedSymptom}" requires immediate medical attention.\n\n⚠️ ACTION REQUIRED:\n\n✓ Emergency contacts notified\n✓ Location shared\n✓ Nearest hospital: St. Mary's Medical Center (1.2 miles)\n\n📞 Call your OB-GYN immediately: (415) 668-1000\n📞 If severe, call 911\n\nPostpartum complications can be serious. Don't wait - seek care now.`
        );
      }, 300);
    }

    // Reset form
    setShowAddSymptom(false);
    setSelectedSymptom('');
    setSelectedSeverity('mild');
    setNotes('');
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
        <h1 className="text-xl">Postpartum Symptom Log</h1>
        <p className="text-sm text-gray-600">Track your recovery symptoms</p>
      </div>

      {/* Recovery Timeline */}
      <div className="px-6 py-4">
        <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-0 rounded-2xl p-4 overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200">
              <ImageWithFallback
                src={postpartumCareImage}
                alt="Postpartum Care"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-sm mb-1">Your Recovery Journey</h3>
              <p className="text-xs text-gray-600">2 weeks postpartum</p>
              <p className="text-xs text-gray-500">Delivery: Nov 9, 2025</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Warning Card */}
      <div className="px-6 py-4">
        <Card className="bg-red-50 border-red-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm text-red-800 mb-1">Seek immediate care for:</h3>
              <ul className="text-xs text-red-700 space-y-1">
                <li>• Heavy bleeding (soaking pad in 1 hour)</li>
                <li>• Severe headache or vision changes</li>
                <li>• Chest pain or difficulty breathing</li>
                <li>• Red, swollen, painful leg</li>
                <li>• Thoughts of harming yourself or baby</li>
                <li>• Signs of infection (fever, foul discharge)</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Add Symptom Form */}
      {showAddSymptom && (
        <div className="px-6 py-4">
          <Card className="bg-white rounded-2xl p-4 shadow-lg">
            <h3 className="text-lg mb-4">Log Your Symptom</h3>
            
            {/* Symptom Selection */}
            <div className="mb-4">
              <label className="text-sm text-gray-700 mb-2 block">Select Symptom</label>
              <select
                value={selectedSymptom}
                onChange={(e) => setSelectedSymptom(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E85883]"
              >
                <option value="">Choose a symptom...</option>
                {postpartumSymptoms.map((symptom, index) => (
                  <option key={index} value={symptom.name}>
                    {symptom.dangerous && '⚠️ '}{symptom.name}
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

            {/* Notes */}
            <div className="mb-4">
              <label className="text-sm text-gray-700 mb-2 block">Notes (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional details..."
                rows={3}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E85883]"
              />
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
                <div className="flex items-start justify-between mb-2">
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
                    {symptom.notes && (
                      <p className="text-xs text-gray-600 mt-2">{symptom.notes}</p>
                    )}
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
