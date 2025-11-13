export function PregnancyProgress() {
  const progress = 60; // 24 weeks out of 40 weeks

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border border-purple-100">
      <div className="flex items-center gap-4">
        {/* Progress Ring */}
        <div className="relative w-20 h-20 flex-shrink-0">
          <svg className="w-20 h-20 transform -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="34"
              stroke="#f3e8ff"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="40"
              cy="40"
              r="34"
              stroke="url(#gradient)"
              strokeWidth="6"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 34}`}
              strokeDashoffset={`${2 * Math.PI * 34 * (1 - progress / 100)}`}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">🍈</span>
          </div>
        </div>

        {/* Progress Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-gray-800">Week 24</span>
            <span className="text-gray-400 text-sm">• {progress}%</span>
          </div>
          <p className="text-gray-600 text-sm mb-2">
            Baby is the size of a melon
          </p>
          <div className="flex items-center gap-1 text-xs text-purple-600">
            <span>16 weeks to go</span>
            <span>💜</span>
          </div>
        </div>
      </div>

      {/* Illustration */}
      <div className="mt-4 pt-4 border-t border-purple-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-2xl">🤰</div>
          <div>
            <p className="text-xs text-gray-500">Your journey</p>
            <p className="text-sm text-gray-700">Second trimester</p>
          </div>
        </div>
        <button className="text-purple-600 text-sm hover:text-purple-700 transition-colors">
          View details →
        </button>
      </div>
    </div>
  );
}
