export function PregnancyCard() {
  const currentWeek = 24;
  const totalWeeks = 40;
  const progress = (currentWeek / totalWeeks) * 100;

  return (
    <div className="mt-4 mb-6">
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-purple-100 text-sm mb-1">Your pregnancy</p>
            <h2 className="text-white text-2xl mb-1">Week {currentWeek}</h2>
            <p className="text-purple-100 text-sm">2nd trimester • {totalWeeks - currentWeek} weeks to go</p>
          </div>
          <div className="text-5xl">🍈</div>
        </div>

        <div className="mb-4">
          <div className="bg-white/20 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-purple-100">Baby is the size of a melon</span>
          <button className="text-white underline">View details</button>
        </div>
      </div>
    </div>
  );
}
