import { ArrowLeft, ChevronRight, Bell, Shield, HelpCircle, Settings, LogOut, Baby, User as UserIcon } from 'lucide-react';
import { Card } from './ui/card';
import logo from 'figma:asset/592f143304a29d7c71cbd3b4eb8ef0abf4fcc12a.png';

interface ProfileProps {
  onBack: () => void;
  onSwitchToPostpartum: () => void;
  onOpenSettings: () => void;
}

export function Profile({ onBack, onSwitchToPostpartum, onOpenSettings }: ProfileProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE5ED] to-white pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-2">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <img src={logo} alt="MamaAlert" className="h-6" />
          <button onClick={onOpenSettings} className="p-2 -mr-2">
            <Settings className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        <h1 className="text-xl">Profile</h1>
      </div>

      {/* Profile Info */}
      <div className="px-6 py-6">
        <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-0 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#E85883] to-[#F186A8] rounded-full flex items-center justify-center">
              <UserIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-lg mb-1">Sarah Miller</h2>
              <p className="text-sm text-gray-600">sarah.miller@email.com</p>
              <p className="text-xs text-gray-500 mt-1">Due Date: Dec 20, 2025</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Pregnancy Mode Section */}
      <div className="px-6 py-4">
        <h2 className="text-lg mb-3">Care Mode</h2>
        <Card className="bg-white border-0 rounded-2xl p-4 mb-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                <Baby className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <h3 className="text-sm mb-1">Current Mode: Pregnancy</h3>
                <p className="text-xs text-gray-600">Week 38 • 2nd trimester</p>
              </div>
            </div>
          </div>
        </Card>

        <button
          onClick={onSwitchToPostpartum}
          className="w-full bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-4 flex items-center justify-between hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Baby className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-left">
              <h3 className="text-sm mb-1">Switch to Postpartum Mode</h3>
              <p className="text-xs text-gray-600">Track recovery & baby's health</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Settings Sections */}
      <div className="px-6 py-4">
        <h2 className="text-lg mb-3">Settings</h2>
        
        <div className="space-y-2">
          {/* Notifications */}
          <button className="w-full bg-white rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="text-sm">Notifications</h3>
                <p className="text-xs text-gray-600">Manage alerts & reminders</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* Privacy & Security */}
          <button className="w-full bg-white rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <h3 className="text-sm">Privacy & Security</h3>
                <p className="text-xs text-gray-600">Control your data</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* App Settings */}
          <button className="w-full bg-white rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <h3 className="text-sm">App Settings</h3>
                <p className="text-xs text-gray-600">Customize your experience</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* Help & Support */}
          <button className="w-full bg-white rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div className="text-left">
                <h3 className="text-sm">Help & Support</h3>
                <p className="text-xs text-gray-600">FAQs & contact us</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Account */}
      <div className="px-6 py-4">
        <h2 className="text-lg mb-3">Account</h2>
        
        <button className="w-full bg-white rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow border border-red-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <LogOut className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-left">
              <h3 className="text-sm text-red-600">Log Out</h3>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* App Info */}
      <div className="px-6 py-4 text-center">
        <p className="text-xs text-gray-500">MamaAlert v1.0.0</p>
        <p className="text-xs text-gray-400 mt-1">© 2025 MamaAlert. All rights reserved.</p>
      </div>
    </div>
  );
}