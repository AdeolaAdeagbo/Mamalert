import { ArrowLeft, Apple, Droplets, Coffee, Moon } from 'lucide-react';
import { Card } from './ui/card';
import logo from 'figma:asset/592f143304a29d7c71cbd3b4eb8ef0abf4fcc12a.png';

interface NutritionDetailProps {
  onBack: () => void;
  darkMode?: boolean;
}

export function NutritionDetail({ onBack, darkMode = false }: NutritionDetailProps) {
  const nutrients = [
    { name: 'Folic Acid', amount: '600-800 mcg/day', sources: ['Leafy greens', 'Fortified cereals', 'Beans'], icon: '🥬' },
    { name: 'Iron', amount: '27 mg/day', sources: ['Red meat', 'Spinach', 'Lentils'], icon: '🥩' },
    { name: 'Calcium', amount: '1000 mg/day', sources: ['Milk', 'Yogurt', 'Cheese'], icon: '🥛' },
    { name: 'Protein', amount: '75-100 g/day', sources: ['Chicken', 'Fish', 'Eggs', 'Beans'], icon: '🍗' },
    { name: 'Omega-3', amount: '200-300 mg/day', sources: ['Salmon', 'Walnuts', 'Flaxseeds'], icon: '🐟' },
    { name: 'Vitamin D', amount: '600 IU/day', sources: ['Fortified milk', 'Eggs', 'Sunlight'], icon: '☀️' },
  ];

  const avoidFoods = [
    'Raw or undercooked meat/eggs',
    'Unpasteurized dairy products',
    'High-mercury fish (shark, swordfish)',
    'Unwashed fruits/vegetables',
    'Deli meats (unless heated)',
    'Raw sprouts',
    'Excessive caffeine (limit to 200mg/day)',
    'Alcohol'
  ];

  const healthyMeals = [
    {
      meal: 'Breakfast',
      suggestions: ['Oatmeal with berries and nuts', 'Greek yogurt parfait', 'Whole grain toast with avocado']
    },
    {
      meal: 'Lunch',
      suggestions: ['Grilled chicken salad', 'Quinoa bowl with vegetables', 'Lentil soup with whole grain bread']
    },
    {
      meal: 'Dinner',
      suggestions: ['Baked salmon with sweet potato', 'Stir-fry with tofu and brown rice', 'Lean beef with roasted vegetables']
    },
    {
      meal: 'Snacks',
      suggestions: ['Fresh fruit', 'Nuts and seeds', 'Hummus with vegetables', 'Cheese and crackers']
    }
  ];

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
        <h1 className={`text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>Nutrition Guide</h1>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Eating well for you and baby
        </p>
      </div>

      {/* Key Nutrients */}
      <div className="px-6 py-4">
        <h2 className={`text-lg mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Essential Nutrients</h2>
        <div className="space-y-3">
          {nutrients.map((nutrient, index) => (
            <Card key={index} className={`rounded-2xl p-4 border-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-start gap-3">
                <div className="text-3xl">{nutrient.icon}</div>
                <div className="flex-1">
                  <h3 className={`text-sm mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {nutrient.name}
                  </h3>
                  <p className="text-xs text-[#E85883] mb-2">{nutrient.amount}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {nutrient.sources.join(', ')}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Meal Ideas */}
      <div className="px-6 py-4">
        <h2 className={`text-lg mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Healthy Meal Ideas</h2>
        <div className="space-y-3">
          {healthyMeals.map((mealType, index) => (
            <Card key={index} className={`rounded-2xl p-4 border-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className={`text-sm mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {mealType.meal}
              </h3>
              <ul className={`text-xs space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {mealType.suggestions.map((suggestion, i) => (
                  <li key={i}>• {suggestion}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>

      {/* Foods to Avoid */}
      <div className="px-6 py-4">
        <h2 className={`text-lg mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Foods to Avoid</h2>
        <Card className={`rounded-2xl p-4 border-0 ${darkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
          <ul className={`text-sm space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {avoidFoods.map((food, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span>{food}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Hydration */}
      <div className="px-6 py-4">
        <h2 className={`text-lg mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Hydration</h2>
        <Card className={`rounded-2xl p-4 border-0 ${
          darkMode ? 'bg-gradient-to-br from-blue-900 to-cyan-900' : 'bg-gradient-to-br from-blue-50 to-cyan-50'
        }`}>
          <div className="flex items-start gap-3">
            <Droplets className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className={`text-sm mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Drink Plenty of Water
              </h3>
              <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Aim for 8-12 glasses (2-3 liters) of water daily. Proper hydration helps with:
              </p>
              <ul className={`text-xs mt-2 space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li>• Amniotic fluid levels</li>
                <li>• Digestion and preventing constipation</li>
                <li>• Reducing swelling</li>
                <li>• Regulating body temperature</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Tips */}
      <div className="px-6 py-4">
        <h2 className={`text-lg mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Nutrition Tips</h2>
        <div className="space-y-3">
          <Card className={`rounded-2xl p-4 border-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-start gap-3">
              <Apple className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Eat small, frequent meals throughout the day to help with nausea and maintain energy
                </p>
              </div>
            </div>
          </Card>
          <Card className={`rounded-2xl p-4 border-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-start gap-3">
              <Coffee className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Limit caffeine to 200mg per day (about one 12 oz cup of coffee)
                </p>
              </div>
            </div>
          </Card>
          <Card className={`rounded-2xl p-4 border-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-start gap-3">
              <Moon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Take your prenatal vitamin with food to reduce nausea
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
