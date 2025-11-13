import { useState } from 'react';
import { ArrowLeft, Plus, Phone, Mail, Trash2, Edit, UserPlus } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import logo from 'figma:asset/592f143304a29d7c71cbd3b4eb8ef0abf4fcc12a.png';

interface Contact {
  id: number;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  isPrimary: boolean;
}

export function EmergencyContacts({ onBack }: { onBack: () => void }) {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: 'John Smith',
      relationship: 'Spouse',
      phone: '(415) 555-0100',
      email: 'john.smith@email.com',
      isPrimary: true,
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      relationship: 'Mother',
      phone: '(415) 555-0200',
      email: 'sarah.j@email.com',
      isPrimary: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: '',
  });

  const handleAddContact = () => {
    if (!formData.name || !formData.phone) {
      alert('Please fill in at least name and phone number');
      return;
    }

    const newContact: Contact = {
      id: contacts.length + 1,
      ...formData,
      isPrimary: contacts.length === 0,
    };

    setContacts([...contacts, newContact]);
    setFormData({ name: '', relationship: '', phone: '', email: '' });
    setShowAddForm(false);
  };

  const handleDeleteContact = (id: number) => {
    if (confirm('Are you sure you want to remove this contact?')) {
      setContacts(contacts.filter((c) => c.id !== id));
    }
  };

  const handleSetPrimary = (id: number) => {
    setContacts(
      contacts.map((c) => ({
        ...c,
        isPrimary: c.id === id,
      }))
    );
  };

  const handleCallContact = (phone: string, name: string) => {
    alert(`Calling ${name} at ${phone}...`);
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
          <button
            onClick={() => setShowAddForm(true)}
            className="p-2 bg-[#E85883] rounded-full"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>
        <h1 className="text-xl">Emergency Contacts</h1>
        <p className="text-sm text-gray-600">
          {contacts.length} contact{contacts.length !== 1 ? 's' : ''} added
        </p>
      </div>

      {/* Info Card */}
      <div className="px-6 py-4">
        <Card className="bg-blue-50 border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <UserPlus className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm text-blue-800 mb-1">Why add emergency contacts?</h3>
              <p className="text-xs text-blue-700">
                Your emergency contacts will be notified if you trigger an alert. They'll receive your location and information about nearby hospitals.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Add Contact Form */}
      {showAddForm && (
        <div className="px-6 py-4">
          <Card className="bg-white rounded-2xl p-4 shadow-lg">
            <h3 className="text-lg mb-4">Add Emergency Contact</h3>

            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter name"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E85883]"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700 mb-1 block">Relationship</label>
                <select
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E85883]"
                >
                  <option value="">Select relationship</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Partner">Partner</option>
                  <option value="Mother">Mother</option>
                  <option value="Father">Father</option>
                  <option value="Sister">Sister</option>
                  <option value="Brother">Brother</option>
                  <option value="Friend">Friend</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-700 mb-1 block">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(555) 555-5555"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E85883]"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700 mb-1 block">Email (Optional)</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E85883]"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                onClick={() => {
                  setShowAddForm(false);
                  setFormData({ name: '', relationship: '', phone: '', email: '' });
                }}
                className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddContact}
                className="flex-1 bg-[#E85883] text-white hover:bg-[#D14770] rounded-full"
              >
                Add Contact
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Contacts List */}
      <div className="px-6 py-4">
        <h2 className="text-lg mb-3">Your Contacts</h2>
        {contacts.length === 0 ? (
          <Card className="bg-white rounded-2xl p-6 text-center">
            <UserPlus className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No emergency contacts yet</p>
            <p className="text-sm text-gray-400 mt-2">Tap + to add your first contact</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {contacts.map((contact) => (
              <Card
                key={contact.id}
                className={`bg-white rounded-2xl p-4 shadow-sm ${
                  contact.isPrimary ? 'border-2 border-[#E85883]' : ''
                }`}
              >
                {contact.isPrimary && (
                  <div className="mb-2">
                    <span className="text-xs px-2 py-1 bg-[#E85883] text-white rounded-full">
                      Primary Contact
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-sm mb-1">{contact.name}</h3>
                    {contact.relationship && (
                      <p className="text-xs text-gray-500">{contact.relationship}</p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {!contact.isPrimary && (
                      <button
                        onClick={() => handleSetPrimary(contact.id)}
                        className="p-2 text-gray-400 hover:text-[#E85883]"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteContact(contact.id)}
                      className="p-2 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <p className="text-xs text-gray-700">{contact.phone}</p>
                  </div>
                  {contact.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <p className="text-xs text-gray-700">{contact.email}</p>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <Button
                    onClick={() => handleCallContact(contact.phone, contact.name)}
                    className="w-full bg-[#E85883] text-white hover:bg-[#D14770] rounded-full text-sm"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call {contact.name}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {contacts.length > 0 && (
        <div className="px-6 py-4">
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 rounded-2xl p-4">
            <h3 className="text-sm mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full bg-white rounded-xl p-3 text-sm text-left hover:shadow-md transition-shadow">
                📞 Test emergency alert system
              </button>
              <button className="w-full bg-white rounded-xl p-3 text-sm text-left hover:shadow-md transition-shadow">
                📝 Update notification preferences
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
