import { useState } from 'react';
import { ArrowLeft, Plus, Calendar, Clock, MapPin, User, Trash2, Edit2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import logo from 'figma:asset/592f143304a29d7c71cbd3b4eb8ef0abf4fcc12a.png';

interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  doctor: string;
  notes: string;
}

interface AppointmentManagerProps {
  onBack: () => void;
  darkMode?: boolean;
}

export function AppointmentManager({ onBack, darkMode = false }: AppointmentManagerProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Prenatal Checkup',
      date: '2024-11-20',
      time: '10:00 AM',
      location: 'City Hospital',
      doctor: 'Dr. Amina Johnson',
      notes: 'Regular checkup'
    },
    {
      id: '2',
      title: 'Ultrasound',
      date: '2024-11-27',
      time: '2:30 PM',
      location: 'Women\'s Health Center',
      doctor: 'Dr. Adebayo Smith',
      notes: 'Anatomy scan'
    }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    doctor: '',
    notes: ''
  });

  const handleEdit = (appointment: Appointment) => {
    setEditingId(appointment.id);
    setFormData({
      title: appointment.title,
      date: appointment.date,
      time: appointment.time,
      location: appointment.location,
      doctor: appointment.doctor,
      notes: appointment.notes
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this appointment?')) {
      setAppointments(prev => prev.filter(apt => apt.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      setAppointments(prev => prev.map(apt => 
        apt.id === editingId ? { ...formData, id: apt.id } : apt
      ));
    } else {
      const newAppointment: Appointment = {
        ...formData,
        id: Date.now().toString()
      };
      setAppointments(prev => [...prev, newAppointment]);
    }
    
    setShowForm(false);
    setEditingId(null);
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      doctor: '',
      notes: ''
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      doctor: '',
      notes: ''
    });
  };

  const sortedAppointments = [...appointments].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  if (showForm) {
    return (
      <div className={`min-h-screen pb-20 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-[#FFE5ED] to-white'}`}>
        {/* Header */}
        <div className={`shadow-sm px-6 py-4 sticky top-0 z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between mb-2">
            <button onClick={handleCancel} className="p-2 -ml-2">
              <ArrowLeft className={`w-6 h-6 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`} />
            </button>
            <img src={logo} alt="MamaAlert" className="h-6" />
            <div className="w-10" />
          </div>
          <h1 className={`text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {editingId ? 'Edit Appointment' : 'New Appointment'}
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          <div>
            <label className={`text-sm mb-2 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Appointment Type *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Prenatal Checkup"
              className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E85883] ${
                darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`text-sm mb-2 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Date *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E85883] ${
                  darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'
                }`}
              />
            </div>

            <div>
              <label className={`text-sm mb-2 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Time *
              </label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E85883] ${
                  darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`text-sm mb-2 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Location *
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Hospital or Clinic Name"
              className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E85883] ${
                darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'
              }`}
            />
          </div>

          <div>
            <label className={`text-sm mb-2 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Doctor/Provider *
            </label>
            <input
              type="text"
              required
              value={formData.doctor}
              onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
              placeholder="Dr. Name"
              className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E85883] ${
                darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'
              }`}
            />
          </div>

          <div>
            <label className={`text-sm mb-2 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any additional information..."
              rows={3}
              className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E85883] ${
                darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'
              }`}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#E85883] text-white hover:bg-[#D14770] rounded-full py-6"
          >
            {editingId ? 'Update Appointment' : 'Add Appointment'}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-20 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-[#FFE5ED] to-white'}`}>
      {/* Header */}
      <div className={`shadow-sm px-6 py-4 sticky top-0 z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-center justify-between mb-2">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className={`w-6 h-6 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`} />
          </button>
          <img src={logo} alt="MamaAlert" className="h-6" />
          <button
            onClick={() => setShowForm(true)}
            className="p-2 bg-[#E85883] rounded-full hover:bg-[#D14770] transition-colors"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>
        <h1 className={`text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>My Appointments</h1>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {sortedAppointments.length} upcoming
        </p>
      </div>

      {/* Appointments List */}
      <div className="px-6 py-6 space-y-3">
        {sortedAppointments.length === 0 ? (
          <Card className={`rounded-2xl p-8 text-center border-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <Calendar className={`w-12 h-12 mx-auto mb-3 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No appointments scheduled
            </p>
            <Button
              onClick={() => setShowForm(true)}
              className="mt-4 bg-[#E85883] text-white hover:bg-[#D14770] rounded-full"
            >
              Add Your First Appointment
            </Button>
          </Card>
        ) : (
          sortedAppointments.map((appointment) => (
            <Card key={appointment.id} className={`rounded-2xl p-4 border-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className={`mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {appointment.title}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {new Date(appointment.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {appointment.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {appointment.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {appointment.doctor}
                      </span>
                    </div>
                    {appointment.notes && (
                      <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {appointment.notes}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(appointment)}
                    className={`p-2 rounded-lg hover:bg-gray-100 ${darkMode ? 'hover:bg-gray-700' : ''}`}
                  >
                    <Edit2 className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  </button>
                  <button
                    onClick={() => handleDelete(appointment.id)}
                    className={`p-2 rounded-lg hover:bg-red-50 ${darkMode ? 'hover:bg-red-900' : ''}`}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
