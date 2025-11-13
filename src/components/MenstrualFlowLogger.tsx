import { useState } from 'react';
import { ArrowLeft, Check, Droplet } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import logo from 'figma:asset/592f143304a29d7c71cbd3b4eb8ef0abf4fcc12a.png';

interface FlowLoggerProps {
  onBack: () => void;
  darkMode: boolean;
}

type FlowLevel = 'spotting' | 'light' | 'medium' | 'heavy';

export function MenstrualFlowLogger({ onBack, darkMode }: FlowLoggerProps) {
  const [selectedFlow, setSelectedFlow] = useState<FlowLevel | null>(null);
  const [notes, setNotes] = useState('');

  const flowLevels = [
    { 
      level: 'spotting' as FlowLevel, 
      name: 'Spotting', 
      description: 'Very light, a few drops',
      color: 'bg-pink-200',
      dots: 1
    },
    { 
      level: 'light' as FlowLevel, 
      name: 'Light', 
      description: 'Light flow, regular protection',
      color: 'bg-pink-300',
      dots: 2
    },
    { 
      level: 'medium' as FlowLevel, 
      name: 'Medium', 
      description: 'Normal flow, changing regularly',
      color: 'bg-pink-500',
      dots: 3
    },
    { 
      level: 'heavy' as FlowLevel, 
      name: 'Heavy', 
      description: 'Heavy flow, frequent changes',
      color: 'bg-pink-700',
      dots: 4
    },
  ];

  const handleSave = () => {
    if (!selectedFlow) return;
    
    alert(`Flow logged: ${selectedFlow}\n\n✓ Saved to your cycle history`);
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
        <h1 className={`text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>Log Flow</h1>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Flow Selection */}
      <div className="px-6 py-6">
        <h2 className={`text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>How heavy is your flow?</h2>
        <div className="space-y-3">
          {flowLevels.map((flow) => (
            <button
              key={flow.level}
              onClick={() => setSelectedFlow(flow.level)}
              className={`w-full rounded-2xl p-4 border-2 transition-all text-left ${
                selectedFlow === flow.level
                  ? 'border-[#E85883] bg-pink-50'
                  : darkMode
                  ? 'border-gray-700 bg-gray-800'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${flow.color}`}>
                    <Droplet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-sm mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {flow.name}
                    </h3>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {flow.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: flow.dots }).map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${flow.color}`} />
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Additional Notes */}
      <div className="px-6 py-4">
        <h3 className={`text-sm mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Additional Notes (Optional)
        </h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any details to remember..."
          rows={3}
          className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E85883] ${
            darkMode
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
              : 'bg-white border-gray-200 text-gray-900'
          }`}
        />
      </div>

      {/* Save Button */}
      <div className="px-6 py-4">
        <Button
          onClick={handleSave}
          disabled={!selectedFlow}
          className="w-full bg-[#E85883] text-white hover:bg-[#D14770] rounded-full py-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Check className="w-5 h-5 mr-2" />
          Save Flow
        </Button>
      </div>
    </div>
  );
}
