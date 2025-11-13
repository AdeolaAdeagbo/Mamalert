import { useState } from 'react';
import { ArrowLeft, Plus, TrendingUp, Scale } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import logo from 'figma:asset/592f143304a29d7c71cbd3b4eb8ef0abf4fcc12a.png';

interface WeightTrackerDetailProps {
  onBack: () => void;
  darkMode?: boolean;
}

interface WeightEntry {
  date: string;
  weight: number;
  week: number;
}

export function WeightTrackerDetail({ onBack, darkMode = false }: WeightTrackerDetailProps) {
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([
    { date: '2024-09-15', weight: 65, week: 12 },
    { date: '2024-10-01', weight: 67, week: 16 },
    { date: '2024-10-15', weight: 69, week: 18 },
    { date: '2024-11-01', weight: 71, week: 22 },
    { date: '2024-11-13', weight: 73, week: 24 },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newWeight, setNewWeight] = useState('');
  const [currentWeek] = useState(24);

  const handleAddWeight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWeight) return;

    const newEntry: WeightEntry = {
      date: new Date().toISOString().split('T')[0],
      weight: parseFloat(newWeight),
      week: currentWeek
    };

    setWeightEntries([...weightEntries, newEntry]);
    setNewWeight('');
    setShowForm(false);
  };

  const startingWeight = weightEntries[0]?.weight || 0;
  const currentWeight = weightEntries[weightEntries.length - 1]?.weight || 0;
  const totalGain = currentWeight - startingWeight;
  const recommendedGain = `${currentWeek * 0.5}kg - ${currentWeek * 0.7}kg`;

  return (
    <div className={`min-h-screen pb-20 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-[#FFE5ED] to-white'}`}>
      {/* Header */}
      <div className={`shadow-sm px-6 py-4 sticky top-0 z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-center justify-between mb-2">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className={`w-6 h-6 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`} />
          </button>
          <img src={logo} alt="MamaAlert" className="h-6" />
          <button
            onClick={() => setShowForm(true)}
            className="p-2 bg-[#E85883] rounded-full hover:bg-[#D14770] transition-colors"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>
        <h1 className={`text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>Weight Tracker</h1>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Week {currentWeek}</p>
      </div>

      {/* Summary Cards */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <Card className={`rounded-2xl p-4 border-0 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <p className="text-2xl text-[#E85883] mb-1">{currentWeight}kg</p>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Current</p>
          </Card>
          <Card className={`rounded-2xl p-4 border-0 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <p className="text-2xl text-green-600 mb-1">+{totalGain}kg</p>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Gain</p>
          </Card>
          <Card className={`rounded-2xl p-4 border-0 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <p className="text-2xl text-purple-600 mb-1">{startingWeight}kg</p>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Starting</p>
          </Card>
        </div>

        <Card className={`rounded-2xl p-4 border-0 ${
          darkMode ? 'bg-gradient-to-br from-blue-900 to-purple-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
        }`}>
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className={`text-sm mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Recommended Gain at Week {currentWeek}
              </h3>
              <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {recommendedGain}
              </p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                You're on track! Keep up the healthy habits.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Weight History */}
      <div className="px-6 py-4">
        <h2 className={`text-lg mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Weight History</h2>
        <div className="space-y-3">
          {weightEntries.slice().reverse().map((entry, index) => (
            <Card key={index} className={`rounded-2xl p-4 border-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-pink-900' : 'bg-pink-100'
                  }`}>
                    <Scale className="w-6 h-6 text-[#E85883]" />
                  </div>
                  <div>
                    <h3 className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Week {entry.week}
                    </h3>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {new Date(entry.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {entry.weight}kg
                  </p>
                  {index < weightEntries.length - 1 && (
                    <p className="text-xs text-green-600">
                      +{(entry.weight - weightEntries[weightEntries.length - index - 2].weight).toFixed(1)}kg
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Weight Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <Card className={`w-full max-w-sm rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Log Today's Weight
            </h2>
            <form onSubmit={handleAddWeight} className="space-y-4">
              <div>
                <label className={`text-sm mb-2 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  placeholder="73.5"
                  className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E85883] ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'
                  }`}
                />
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#E85883] text-white hover:bg-[#D14770] rounded-full"
                >
                  Save
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
