import { Activity, Calendar, FileText, Heart } from 'lucide-react';

export function QuickActions() {
  const actions = [
    { icon: Activity, label: 'Log symptoms', color: 'bg-pink-50 text-pink-600' },
    { icon: Calendar, label: 'Appointments', color: 'bg-purple-50 text-purple-600' },
    { icon: FileText, label: 'Birth plan', color: 'bg-blue-50 text-blue-600' },
    { icon: Heart, label: 'Wellness', color: 'bg-red-50 text-red-600' },
  ];

  return (
    <div className="mb-6">
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-gray-50 transition-colors"
            >
              <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs text-gray-700 text-center leading-tight">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
