import { useState } from 'react';
import { ArrowLeft, AlertTriangle, Check, Plus, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from 'figma:asset/592f143304a29d7c71cbd3b4eb8ef0abf4fcc12a.png';

const babyHealthImage = "https://images.unsplash.com/photo-1759802147238-5c18d1463bd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdib3JuJTIwYmFieSUyMGhlYWx0aHxlbnwxfHx8fDE3NjI5NTMwMzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

interface BabySymptom {
  id: number;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  dangerous: boolean;
  timestamp: Date;
  notes?: string;
}

const babySymptoms = [
  { name: 'Fussy/Crying', dangerous: false },
  { name: 'Mild Fever (99-100°F)', dangerous: false },
  { name: 'Diaper Rash', dangerous: false },
  { name: 'Gas/Colic', dangerous: false },
  { name: 'Stuffy Nose', dangerous: false },
  { name: 'High Fever (over 100.4°F)', dangerous: true },
  { name: 'Difficulty Breathing', dangerous: true },
  { name: 'Not Feeding Well', dangerous: true },
  { name: 'Excessive Vomiting', dangerous: true },
  { name: 'Lethargic/Unresponsive', dangerous: true },
  { name: 'Bluish Skin Color', dangerous: true },
  { name: 'Seizure/Convulsions', dangerous: true },
  { name: 'Severe Diarrhea', dangerous: true },
  { name: 'Continuous Crying (3+ hours)', dangerous: true },
];

export function BabySymptomLogger({ onBack }: { onBack: () => void }) {
  const [symptoms, setSymptoms] = useState<BabySymptom[]>([
    {
      id: 1,
      name: 'Fussy/Crying',
      severity: 'mild',
      dangerous: false,
      timestamp: new Date(Date.now() - 3600000),
    },
  ]);
  const [showAddSymptom, setShowAddSymptom] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<'mild' | 'moderate' | 'severe'>('mild');
  const [notes, setNotes] = useState('');

  const handleLogSymptom = () => {
    if (!selectedSymptom) return;

    const symptomData = babySymptoms.find(s => s.name === selectedSymptom);
    const newSymptom: BabySymptom = {
      id: symptoms.length + 1,
      name: selectedSymptom,
      severity: selectedSeverity,
      dangerous: symptomData?.dangerous || false,
      timestamp: new Date(),
      notes: notes || undefined,
    };

    setSymptoms([newSymptom, ...symptoms]);

    // If dangerous symptom, show URGENT alert with emergency action
    if (symptomData?.dangerous) {
      setTimeout(() => {
        const shouldCallEmergency = confirm(
          `🚨 URGENT MEDICAL ALERT\n\n"${selectedSymptom}" is a potentially serious symptom for infants.\n\n⚠️ IMMEDIATE ACTION REQUIRED:\n\n✓ Emergency contacts have been notified\n✓ Location shared with contacts\n✓ Nearest pediatric ER: St. Mary's Children's Hospital (1.2 miles)\n\n📞 Press OK to call 911 immediately\n📞 Press Cancel to call your pediatrician\n\nFor infants under 3 months with fever or difficulty breathing, ALWAYS seek immediate medical care.`
        );
        
        if (shouldCallEmergency) {
          alert('Calling 911...\n\nStay calm. Help is on the way.\n\nWhile waiting:\n• Keep baby comfortable\n• Monitor breathing\n• Note any changes\n• Have insurance info ready');
        } else {
          alert('Calling pediatrician...\n\nDr. Emily Chen: (415) 555-0199\n\nIf you cannot reach your pediatrician, go to the ER or call 911.');
        }
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
        <h1 className="text-xl">Baby's Health Log</h1>
        <p className="text-sm text-gray-600">Track your baby's symptoms</p>
      </div>

      {/* Baby Info Card */}
      <div className="px-6 py-4">
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 rounded-2xl p-4 overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200">
              <ImageWithFallback
                src={babyHealthImage}
                alt="Baby"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-sm mb-1">Baby Emma</h3>
              <p className="text-xs text-gray-600">2 weeks old</p>
              <p className="text-xs text-gray-500">Born: Nov 9, 2025</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Critical Warning Card */}
      <div className="px-6 py-4">
        <Card className="bg-red-50 border-red-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm text-red-800 mb-1">URGENT: Seek immediate care if baby has:</h3>
              <ul className="text-xs text-red-700 space-y-1">
                <li>• Fever over 100.4°F (especially under 3 months)</li>
                <li>• Difficulty breathing or bluish skin</li>
                <li>• Not feeding or lethargic</li>
                <li>• Persistent vomiting or severe diarrhea</li>
                <li>• Seizures or unusual movements</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Add Symptom Form */}
      {showAddSymptom && (
        <div className="px-6 py-4">
          <Card className="bg-white rounded-2xl p-4 shadow-lg">
            <h3 className="text-lg mb-4">Log Baby's Symptom</h3>
            
            {/* Symptom Selection */}
            <div className="mb-4">
              <label className="text-sm text-gray-700 mb-2 block">Select Symptom</label>
              <select
                value={selectedSymptom}
                onChange={(e) => setSelectedSymptom(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E85883]"
              >
                <option value="">Choose a symptom...</option>
                {babySymptoms.map((symptom, index) => (
                  <option key={index} value={symptom.name}>
                    {symptom.dangerous && '⚠️ '}{symptom.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Severity Selection */}
            <div className="mb-4">
              <label className="text-sm text-gray-700 mb-2 block">How severe?</label>
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

      {/* Emergency Contact */}
      <div className="px-6 py-4">
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 rounded-2xl p-4">
          <h3 className="text-sm mb-3">Pediatric Emergency Contacts</h3>
          <div className="space-y-2">
            <button className="w-full bg-white rounded-xl p-3 text-sm text-left flex items-center justify-between hover:shadow-md transition-shadow">
              <div>
                <p className="text-sm">Dr. Emily Chen (Pediatrician)</p>
                <p className="text-xs text-gray-600">(415) 555-0199</p>
              </div>
              <Phone className="w-4 h-4 text-[#E85883]" />
            </button>
            <button className="w-full bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-left flex items-center justify-between hover:shadow-md transition-shadow">
              <div>
                <p className="text-sm text-red-700">Emergency (911)</p>
                <p className="text-xs text-red-600">St. Mary's Children's Hospital</p>
              </div>
              <Phone className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
