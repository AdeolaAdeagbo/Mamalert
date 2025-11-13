import { Bell, Settings } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white px-4 pt-12 pb-4 border-b border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-gray-900">Hi, Sarah</h1>
          <p className="text-gray-500 text-sm mt-0.5">How are you feeling today?</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
