import { useState } from 'react';
import { ArrowLeft, Check, Heart, Smile, Meh, Frown, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import logo from 'figma:asset/592f143304a29d7c71cbd3b4eb8ef0abf4fcc12a.png';

interface MoodTrackerProps {
  onBack: () => void;
  darkMode: boolean;
}

export function MenstrualMoodTracker({ onBack, darkMode }: MoodTrackerProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const moods = [
    { id: 'happy', name: 'Happy', icon: Smile, color: 'bg-green-100 text-green-600' },
    { id: 'calm', name: 'Calm', icon: Heart, color: 'bg-blue-100 text-blue-600' },
    { id: 'neutral', name: 'Neutral', icon: Meh, color: 'bg-gray-100 text-gray-600' },
    { id: 'sad', name: 'Sad', icon: Frown, color: 'bg-purple-100 text-purple-600' },
    { id: 'irritable', name: 'Irritable', icon: Zap, color: 'bg-red-100 text-red-600' },
  ];

  const emotions = [
    'Energetic', 'Anxious', 'Tired', 'Stressed', 'Motivated',
    'Emotional', 'Confident', 'Overwhelmed', 'Peaceful', 'Sensitive'
  ];

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSave = () => {
    if (!selectedMood) return;
    
    alert(`Mood logged: ${selectedMood}\nEmotions: ${selectedSymptoms.join(', ') || 'None'}\n\n✓ Saved to your daily log`);
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
        <h1 className={`text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>Track Mood</h1>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          How are you feeling today?
        </p>
      </div>

      {/* Mood Selection */}
      <div className="px-6 py-6">
        <h2 className={`text-sm mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Overall Mood</h2>
        <div className="grid grid-cols-5 gap-3">
          {moods.map((mood) => {
            const Icon = mood.icon;
            return (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all ${
                  selectedMood === mood.id
                    ? 'scale-110 ring-2 ring-[#E85883]'
                    : ''
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${mood.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {mood.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Emotions */}
      <div className="px-6 py-4">
        <h2 className={`text-sm mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          What emotions are you experiencing?
        </h2>
        <div className="flex flex-wrap gap-2">
          {emotions.map((emotion) => (
            <button
              key={emotion}
              onClick={() => toggleSymptom(emotion)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedSymptoms.includes(emotion)
                  ? 'bg-[#E85883] text-white'
                  : darkMode
                  ? 'bg-gray-800 text-gray-300 border border-gray-700'
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              {emotion}
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="px-6 py-4">
        <h3 className={`text-sm mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Notes (Optional)
        </h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="What's on your mind?"
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
          disabled={!selectedMood}
          className="w-full bg-[#E85883] text-white hover:bg-[#D14770] rounded-full py-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Check className="w-5 h-5 mr-2" />
          Save Mood
        </Button>
      </div>
    </div>
  );
}
