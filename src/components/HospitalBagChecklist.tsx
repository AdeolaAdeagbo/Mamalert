import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Circle, Briefcase } from 'lucide-react';
import { Card } from './ui/card';
import logo from 'figma:asset/592f143304a29d7c71cbd3b4eb8ef0abf4fcc12a.png';

interface ChecklistItem {
  id: string;
  name: string;
  checked: boolean;
}

interface HospitalBagChecklistProps {
  onBack: () => void;
  darkMode?: boolean;
}

export function HospitalBagChecklist({ onBack, darkMode = false }: HospitalBagChecklistProps) {
  const [categories, setCategories] = useState({
    forMom: [
      { id: '1', name: 'Government-issued ID', checked: false },
      { id: '2', name: 'Insurance card', checked: false },
      { id: '3', name: 'Birth plan copies', checked: false },
      { id: '4', name: 'Maternity pads', checked: false },
      { id: '5', name: 'Comfortable going-home outfit', checked: false },
      { id: '6', name: 'Nursing bras', checked: false },
      { id: '7', name: 'Toiletries (toothbrush, shampoo, etc.)', checked: false },
      { id: '8', name: 'Phone charger', checked: false },
      { id: '9', name: 'Slippers/comfortable shoes', checked: false },
      { id: '10', name: 'Robe or comfortable clothes', checked: false },
    ],
    forBaby: [
      { id: '11', name: 'Car seat (must have to leave)', checked: false },
      { id: '12', name: 'Going-home outfit', checked: false },
      { id: '13', name: 'Baby blanket', checked: false },
      { id: '14', name: 'Diapers (hospital usually provides)', checked: false },
      { id: '15', name: 'Baby wipes', checked: false },
      { id: '16', name: 'Pacifiers (if using)', checked: false },
      { id: '17', name: 'Baby mittens', checked: false },
      { id: '18', name: 'Onesies (2-3)', checked: false },
    ],
    forPartner: [
      { id: '19', name: 'Snacks and drinks', checked: false },
      { id: '20', name: 'Change of clothes', checked: false },
      { id: '21', name: 'Phone charger', checked: false },
      { id: '22', name: 'Entertainment (book, tablet)', checked: false },
      { id: '23', name: 'Camera', checked: false },
    ],
    extras: [
      { id: '24', name: 'Massage oil', checked: false },
      { id: '25', name: 'Music playlist', checked: false },
      { id: '26', name: 'Pillow from home', checked: false },
      { id: '27', name: 'Breast pump', checked: false },
      { id: '28', name: 'Nipple cream', checked: false },
    ]
  });

  const toggleItem = (category: keyof typeof categories, itemId: string) => {
    setCategories(prev => ({
      ...prev,
      [category]: prev[category].map(item =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    }));
  };

  const getCategoryProgress = (items: ChecklistItem[]) => {
    const checked = items.filter(item => item.checked).length;
    return { checked, total: items.length, percentage: (checked / items.length) * 100 };
  };

  const totalProgress = () => {
    const allItems = [
      ...categories.forMom,
      ...categories.forBaby,
      ...categories.forPartner,
      ...categories.extras
    ];
    return getCategoryProgress(allItems);
  };

  const progress = totalProgress();

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
        <h1 className={`text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>Hospital Bag Checklist</h1>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {progress.checked} of {progress.total} items packed
        </p>
      </div>

      {/* Overall Progress */}
      <div className="px-6 py-4">
        <Card className={`rounded-2xl p-5 border-0 ${
          darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700' : 'bg-gradient-to-br from-pink-50 to-purple-50'
        }`}>
          <div className="flex items-center gap-4 mb-3">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-pink-900' : 'bg-pink-100'
            }`}>
              <Briefcase className="w-8 h-8 text-[#E85883]" />
            </div>
            <div className="flex-1">
              <h3 className={`text-sm mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Overall Progress
              </h3>
              <div className={`w-full h-3 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
                <div
                  className="h-3 bg-gradient-to-r from-[#E85883] to-[#F186A8] rounded-full transition-all"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl text-[#E85883]">{Math.round(progress.percentage)}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* For Mom */}
      <div className="px-6 py-4">
        <h2 className={`text-lg mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          For Mom ({getCategoryProgress(categories.forMom).checked}/{categories.forMom.length})
        </h2>
        <Card className={`rounded-2xl p-4 border-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="space-y-3">
            {categories.forMom.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleItem('forMom', item.id)}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {item.checked ? (
                  <CheckCircle2 className="w-6 h-6 text-[#E85883] flex-shrink-0" />
                ) : (
                  <Circle className={`w-6 h-6 flex-shrink-0 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                )}
                <span className={`text-sm text-left ${
                  item.checked
                    ? darkMode ? 'text-gray-500 line-through' : 'text-gray-400 line-through'
                    : darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* For Baby */}
      <div className="px-6 py-4">
        <h2 className={`text-lg mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          For Baby ({getCategoryProgress(categories.forBaby).checked}/{categories.forBaby.length})
        </h2>
        <Card className={`rounded-2xl p-4 border-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="space-y-3">
            {categories.forBaby.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleItem('forBaby', item.id)}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {item.checked ? (
                  <CheckCircle2 className="w-6 h-6 text-[#E85883] flex-shrink-0" />
                ) : (
                  <Circle className={`w-6 h-6 flex-shrink-0 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                )}
                <span className={`text-sm text-left ${
                  item.checked
                    ? darkMode ? 'text-gray-500 line-through' : 'text-gray-400 line-through'
                    : darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* For Partner */}
      <div className="px-6 py-4">
        <h2 className={`text-lg mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          For Partner ({getCategoryProgress(categories.forPartner).checked}/{categories.forPartner.length})
        </h2>
        <Card className={`rounded-2xl p-4 border-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="space-y-3">
            {categories.forPartner.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleItem('forPartner', item.id)}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {item.checked ? (
                  <CheckCircle2 className="w-6 h-6 text-[#E85883] flex-shrink-0" />
                ) : (
                  <Circle className={`w-6 h-6 flex-shrink-0 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                )}
                <span className={`text-sm text-left ${
                  item.checked
                    ? darkMode ? 'text-gray-500 line-through' : 'text-gray-400 line-through'
                    : darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Extras */}
      <div className="px-6 py-4">
        <h2 className={`text-lg mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Nice to Have ({getCategoryProgress(categories.extras).checked}/{categories.extras.length})
        </h2>
        <Card className={`rounded-2xl p-4 border-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="space-y-3">
            {categories.extras.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleItem('extras', item.id)}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {item.checked ? (
                  <CheckCircle2 className="w-6 h-6 text-[#E85883] flex-shrink-0" />
                ) : (
                  <Circle className={`w-6 h-6 flex-shrink-0 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                )}
                <span className={`text-sm text-left ${
                  item.checked
                    ? darkMode ? 'text-gray-500 line-through' : 'text-gray-400 line-through'
                    : darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
