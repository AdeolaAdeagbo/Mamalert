import { useState } from 'react';
import { ArrowLeft, Send, Sparkles, Heart, Activity, AlertCircle, Baby, Clock, Pill, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from 'figma:asset/592f143304a29d7c71cbd3b4eb8ef0abf4fcc12a.png';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const quickActions = [
  { icon: Baby, text: 'Fetal Movement', color: 'from-pink-50 to-pink-100', iconColor: 'text-pink-600' },
  { icon: Activity, text: 'Contractions', color: 'from-purple-50 to-purple-100', iconColor: 'text-purple-600' },
  { icon: Heart, text: 'Nutrition Tips', color: 'from-red-50 to-red-100', iconColor: 'text-red-600' },
  { icon: Pill, text: 'Medications', color: 'from-blue-50 to-blue-100', iconColor: 'text-blue-600' },
  { icon: AlertCircle, text: 'Symptoms Check', color: 'from-amber-50 to-amber-100', iconColor: 'text-amber-600' },
  { icon: Clock, text: 'Sleep & Rest', color: 'from-green-50 to-green-100', iconColor: 'text-green-600' },
];

const nurseImage = "https://images.unsplash.com/photo-1676552055618-22ec8cde399a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMGZlbWFsZSUyMG51cnNlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYyODgyNDcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function AINurse({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI Nurse assistant. I'm here to help answer your pregnancy and maternal health questions. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleQuickAction = (actionText: string) => {
    const responses: { [key: string]: string } = {
      'Fetal Movement': "At 38 weeks, you should feel your baby move regularly. Aim for about 10 movements within 2 hours. If you notice decreased movement, contact your healthcare provider immediately. Would you like to use the kick counter feature?",
      'Contractions': "As you approach your due date, you may experience Braxton Hicks contractions (practice contractions). True labor contractions are regular, increase in intensity, and don't go away when you change positions. Call your doctor if contractions are 5 minutes apart, last 1 minute each, for 1 hour (5-1-1 rule).",
      'Nutrition Tips': "Great nutrition is essential! Focus on: \n• Protein (75-100g daily)\n• Calcium-rich foods\n• Iron-rich foods\n• Folate/folic acid\n• Omega-3 fatty acids\n• Stay hydrated (8-10 glasses of water)\nAvoid raw fish, unpasteurized dairy, and limit caffeine to 200mg daily.",
      'Medications': "Always consult your healthcare provider before taking any medication during pregnancy. Many common medications are safe, but some should be avoided. What specific medication are you asking about?",
      'Symptoms Check': "I can help you assess symptoms. Common pregnancy symptoms at 38 weeks include:\n• Frequent urination\n• Braxton Hicks contractions\n• Pelvic pressure\n• Swelling\n• Fatigue\n\nSeek immediate care if you experience: severe headache, vision changes, severe swelling, decreased fetal movement, or vaginal bleeding.",
      'Sleep & Rest': "Sleep can be challenging in late pregnancy. Tips:\n• Sleep on your left side\n• Use pregnancy pillows\n• Avoid large meals before bed\n• Stay hydrated (but limit fluids before bedtime)\n• Practice relaxation techniques\n• Keep room cool and dark\n\nRest is crucial for you and baby!",
    };

    const userMessage: Message = {
      id: messages.length + 1,
      text: actionText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        text: responses[actionText] || "I'm here to help with that. Could you provide more details?",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        text: "Thank you for your question. Based on your pregnancy stage (38 weeks), I recommend discussing this with your healthcare provider for personalized advice. In the meantime, monitor your symptoms and don't hesitate to call your doctor if you have any concerns.",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE5ED] to-white flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <img src={logo} alt="MamaAlert" className="h-6" />
          <div className="w-10" /> {/* Spacer */}
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#E85883] flex-shrink-0">
            <ImageWithFallback 
              src={nurseImage}
              alt="AI Nurse"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-lg">AI Nurse Assistant</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-xs text-gray-600">Online • Here to help 24/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-4">
        <p className="text-sm text-gray-600 mb-3">Quick questions:</p>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action.text)}
              className={`bg-gradient-to-br ${action.color} rounded-xl p-3 flex items-center gap-2 hover:shadow-md transition-shadow`}
            >
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <action.icon className={`w-4 h-4 ${action.iconColor}`} />
              </div>
              <span className="text-xs text-left">{action.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-[#E85883] text-white'
                    : 'bg-white shadow-sm text-gray-800'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-pink-100' : 'text-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white shadow-sm rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-6 py-2">
        <Card className="bg-amber-50 border-amber-200 rounded-xl p-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800">
              This AI assistant provides general information only. Always consult your healthcare provider for medical advice.
            </p>
          </div>
        </Card>
      </div>

      {/* Emergency Button */}
      <div className="px-6 py-2">
        <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-3 flex items-center justify-center gap-2 shadow-md hover:from-red-600 hover:to-red-700 transition-all">
          <Phone className="w-4 h-4" />
          <span className="text-sm">Emergency? Call 911</span>
        </button>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything about your pregnancy..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E85883]"
          />
          <button
            onClick={handleSendMessage}
            className="w-10 h-10 bg-[#E85883] rounded-full flex items-center justify-center hover:bg-[#D14770] transition-colors"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}