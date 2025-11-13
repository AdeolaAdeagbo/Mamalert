import { useState } from 'react';
import { ArrowLeft, MapPin, Phone, Clock, Navigation, Star } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from 'figma:asset/592f143304a29d7c71cbd3b4eb8ef0abf4fcc12a.png';

const hospitalImage = "https://images.unsplash.com/photo-1610598809726-e0dd63432bf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMG1lZGljYWwlMjBjZW50ZXJ8ZW58MXx8fHwxNzYyODQyMTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

interface HealthcareFacility {
  id: number;
  name: string;
  type: 'Hospital' | 'Clinic' | 'Birthing Center';
  distance: string;
  address: string;
  phone: string;
  hours: string;
  rating: number;
  specialties: string[];
}

const facilities: HealthcareFacility[] = [
  {
    id: 1,
    name: "St. Mary's Medical Center",
    type: 'Hospital',
    distance: '1.2 miles',
    address: '450 Stanyan St, San Francisco, CA',
    phone: '(415) 668-1000',
    hours: '24/7 Emergency Care',
    rating: 4.8,
    specialties: ['Labor & Delivery', 'NICU', 'Maternal-Fetal Medicine'],
  },
  {
    id: 2,
    name: 'Sunrise Women\'s Health Clinic',
    type: 'Clinic',
    distance: '2.5 miles',
    address: '1234 Market St, San Francisco, CA',
    phone: '(415) 555-0123',
    hours: 'Mon-Fri: 8AM-6PM',
    rating: 4.6,
    specialties: ['Prenatal Care', 'Ultrasound', 'Midwifery'],
  },
  {
    id: 3,
    name: 'Golden Gate Birthing Center',
    type: 'Birthing Center',
    distance: '3.8 miles',
    address: '789 Valencia St, San Francisco, CA',
    phone: '(415) 555-0456',
    hours: 'Mon-Sat: 9AM-7PM',
    rating: 4.9,
    specialties: ['Natural Birth', 'Water Birth', 'Doula Services'],
  },
  {
    id: 4,
    name: 'Pacific Heights Women\'s Hospital',
    type: 'Hospital',
    distance: '4.2 miles',
    address: '2100 Webster St, San Francisco, CA',
    phone: '(415) 555-0789',
    hours: '24/7 Emergency Care',
    rating: 4.7,
    specialties: ['High-Risk Pregnancy', 'Labor & Delivery', 'Postpartum Care'],
  },
];

export function FindCare({ onBack }: { onBack: () => void }) {
  const [selectedType, setSelectedType] = useState<string>('All');

  const filteredFacilities =
    selectedType === 'All'
      ? facilities
      : facilities.filter((f) => f.type === selectedType);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Hospital':
        return 'bg-red-100 text-red-700';
      case 'Clinic':
        return 'bg-blue-100 text-blue-700';
      case 'Birthing Center':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE5ED] to-white pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-2">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <img src={logo} alt="MamaAlert" className="h-6" />
          <div className="w-10" />
        </div>
        <h1 className="text-xl">Find Care</h1>
        <p className="text-sm text-gray-600">Healthcare facilities near you</p>
      </div>

      {/* Location Banner */}
      <div className="px-6 py-4">
        <Card className="bg-gradient-to-r from-[#E85883] to-[#F186A8] border-0 rounded-2xl p-4 text-white">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6" />
            <div className="flex-1">
              <p className="text-sm opacity-90">Current Location</p>
              <p className="text-xs opacity-80">San Francisco, CA</p>
            </div>
            <button className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs">
              Change
            </button>
          </div>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 py-2">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['All', 'Hospital', 'Clinic', 'Birthing Center'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                selectedType === type
                  ? 'bg-[#E85883] text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Facilities List */}
      <div className="px-6 py-4 space-y-4">
        {filteredFacilities.map((facility) => (
          <Card key={facility.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {/* Image */}
            <div className="h-32 bg-gray-200 relative">
              <ImageWithFallback
                src={hospitalImage}
                alt={facility.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className={`text-xs px-3 py-1 rounded-full ${getTypeColor(facility.type)}`}>
                  {facility.type}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Name and Rating */}
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm flex-1">{facility.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-xs text-gray-700">{facility.rating}</span>
                </div>
              </div>

              {/* Distance */}
              <div className="flex items-center gap-2 mb-2">
                <Navigation className="w-4 h-4 text-[#E85883]" />
                <p className="text-xs text-gray-600">{facility.distance} away</p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2 mb-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-600">{facility.address}</p>
              </div>

              {/* Hours */}
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-gray-400" />
                <p className="text-xs text-gray-600">{facility.hours}</p>
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-1 mb-3">
                {facility.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-pink-50 text-pink-700 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button className="flex-1 bg-[#E85883] text-white hover:bg-[#D14770] rounded-full text-sm">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button className="flex-1 bg-white text-[#E85883] border-2 border-[#E85883] hover:bg-pink-50 rounded-full text-sm">
                  <Navigation className="w-4 h-4 mr-2" />
                  Directions
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Emergency Button */}
      <div className="fixed bottom-6 left-6 right-6 max-w-md mx-auto">
        <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl p-4 flex items-center justify-center gap-2 shadow-lg hover:from-red-600 hover:to-red-700 transition-all">
          <Phone className="w-5 h-5" />
          <span>Emergency? Call 911</span>
        </button>
      </div>
    </div>
  );
}
