import { Home, Calendar, BarChart3, User } from 'lucide-react';

export function BottomNav() {
  const navItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Calendar, label: 'Cycle', active: false },
    { icon: BarChart3, label: 'Insights', active: false },
    { icon: User, label: 'Profile', active: false },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around px-4 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`flex flex-col items-center gap-1 py-2 px-4 transition-colors ${
                  item.active
                    ? 'text-purple-600'
                    : 'text-gray-400'
                }`}
              >
                <Icon className="w-6 h-6" strokeWidth={item.active ? 2.5 : 2} />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
