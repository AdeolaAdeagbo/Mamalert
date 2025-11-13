interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  iconBg: string;
  isEmergency?: boolean;
}

export function FeatureCard({ icon, title, description, bgColor, iconBg, isEmergency }: FeatureCardProps) {
  return (
    <button 
      className={`${bgColor} rounded-2xl p-4 shadow-sm border ${
        isEmergency ? 'border-red-200 ring-2 ring-red-100' : 'border-transparent'
      } hover:scale-105 transition-transform active:scale-95 text-left w-full`}
    >
      <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center mb-3`}>
        <div className={isEmergency ? 'text-red-600' : 'text-gray-700'}>
          {icon}
        </div>
      </div>
      <h3 className={`${isEmergency ? 'text-red-700' : 'text-gray-800'} text-sm mb-1`}>
        {title}
      </h3>
      <p className="text-gray-600 text-xs">{description}</p>
      {isEmergency && (
        <div className="mt-2 text-xs text-red-600">Tap for help</div>
      )}
    </button>
  );
}
