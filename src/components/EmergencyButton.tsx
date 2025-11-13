import { AlertCircle } from 'lucide-react';
import { useState } from 'react';

export function EmergencyButton() {
  const [isPulsing, setIsPulsing] = useState(true);

  return (
    <button
      onClick={() => setIsPulsing(false)}
      className="fixed bottom-24 right-6 w-14 h-14 bg-red-500 hover:bg-red-600 active:scale-95 rounded-full shadow-lg flex items-center justify-center text-white transition-all z-50 group"
      aria-label="Emergency Alert"
    >
      <div className={`absolute inset-0 rounded-full bg-red-500 ${isPulsing ? 'animate-ping opacity-75' : ''}`}></div>
      <AlertCircle className="w-7 h-7 relative z-10" strokeWidth={2.5} />
      
      {/* Tooltip */}
      <div className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Emergency SOS
        <div className="absolute top-1/2 -translate-y-1/2 left-full w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-gray-900"></div>
      </div>
    </button>
  );
}
