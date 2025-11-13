import { Calendar, AlertCircle, Lightbulb, ChevronRight, FileText } from 'lucide-react';

export function TodaySection() {
  return (
    <div>
      <h2 className="text-gray-900 mb-3">Today</h2>

      {/* Appointment Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-3 hover:border-purple-300 transition-colors">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 mb-0.5">Upcoming appointment</h3>
            <p className="text-gray-600 text-sm">Dr. Martinez • Nov 15, 10:30 AM</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
        </div>
      </div>

      {/* Emergency Alert Card */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-3 hover:border-red-300 transition-colors">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-red-900 mb-0.5">Emergency contacts</h3>
            <p className="text-red-700 text-sm">Quick access to help when you need it</p>
          </div>
          <ChevronRight className="w-5 h-5 text-red-400 flex-shrink-0" />
        </div>
      </div>

      {/* Daily Tip Card */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-4 mb-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 mb-1">Daily tip</h3>
            <p className="text-gray-700 text-sm leading-relaxed">Stay hydrated! Aim for 8-10 glasses of water today. Your body and baby will thank you 💧</p>
          </div>
        </div>
      </div>

      {/* Birth Plan Progress */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 hover:border-purple-300 transition-colors">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-gray-900">Hospital bag checklist</h3>
              <span className="text-sm text-gray-600">13/20</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
              <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: '65%' }}></div>
            </div>
            <p className="text-gray-600 text-sm">65% complete</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}