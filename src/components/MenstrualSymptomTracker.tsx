import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from './ui/button';
import logo from 'figma:asset/592f143304a29d7c71cbd3b4eb8ef0abf4fcc12a.png';

interface SymptomTrackerProps {
  onBack: () => void;
  darkMode: boolean;
}

export function MenstrualSymptomTracker({ onBack, darkMode }: SymptomTrackerProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const symptomCategories = {
    'Physical': [
      'Cramps', 'Bloating', 'Headache', 'Back Pain', 'Breast Tenderness',
      'Fatigue', 'Nausea', 'Acne', 'Dizziness'
    ],
    'Emotional': [
      'Mood Swings', 'Irritability', 'Anxiety', 'Depression', 'Crying Spells'
    ],
    'Other': [
      'Food Cravings', 'Insomnia', 'Hot Flashes', 'Constipation', 'Diarrhea'
    ]
  };

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSave = () => {
    if (selectedSymptoms.length === 0) return;
    
    alert(`Symptoms logged: ${selectedSymptoms.join(', ')}\n\n✓ Saved to your cycle log`);
    onBack();
  };

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
        <h1 className={`text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>Log Symptoms</h1>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Select all that apply
        </p>
      </div>

      {/* Symptoms by Category */}
      <div className="px-6 py-6 space-y-6">
        {Object.entries(symptomCategories).map(([category, symptoms]) => (
          <div key={category}>
            <h2 className={`text-sm mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {category}
            </h2>
            <div className="flex flex-wrap gap-2">
              {symptoms.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => toggleSymptom(symptom)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    selectedSymptoms.includes(symptom)
                      ? 'bg-[#E85883] text-white'
                      : darkMode
                      ? 'bg-gray-800 text-gray-300 border border-gray-700'
                      : 'bg-white text-gray-700 border border-gray-200'
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Notes */}
      <div className="px-6 py-4">
        <h3 className={`text-sm mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Additional Notes (Optional)
        </h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any additional details..."
          rows={3}
          className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E85883] ${
            darkMode
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
              : 'bg-white border-gray-200 text-gray-900'
          }`}
        />
      </div>

      {/* Selected Count */}
      {selectedSymptoms.length > 0 && (
        <div className="px-6 py-2">
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {selectedSymptoms.length} symptom{selectedSymptoms.length !== 1 ? 's' : ''} selected
          </p>
        </div>
      )}

      {/* Save Button */}
      <div className="px-6 py-4">
        <Button
          onClick={handleSave}
          disabled={selectedSymptoms.length === 0}
          className="w-full bg-[#E85883] text-white hover:bg-[#D14770] rounded-full py-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Check className="w-5 h-5 mr-2" />
          Save Symptoms
        </Button>
      </div>
    </div>
  );
}
