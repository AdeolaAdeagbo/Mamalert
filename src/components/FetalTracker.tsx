import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Plus,
  RotateCcw,
  Heart,
  Activity,
  Clock,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logo from "figma:asset/592f143304a29d7c71cbd3b4eb8ef0abf4fcc12a.png";
import fetalImage from "figma:asset/60d1da78814a3b9b775a09a2f9a44c0936b31778.png";

interface KickSession {
  id: number;
  date: Date;
  kicks: number;
  duration: number; // in minutes
}

interface FetalTrackerProps {
  onBack: () => void;
  darkMode: boolean;
}

export function FetalTracker({
  onBack,
  darkMode,
}: FetalTrackerProps) {
  const [isTracking, setIsTracking] = useState(false);
  const [kickCount, setKickCount] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sessions, setSessions] = useState<KickSession[]>([
    {
      id: 1,
      date: new Date(Date.now() - 3600000),
      kicks: 10,
      duration: 12,
    },
    {
      id: 2,
      date: new Date(Date.now() - 86400000),
      kicks: 12,
      duration: 15,
    },
  ]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTracking && startTime) {
      interval = setInterval(() => {
        setElapsedTime(
          Math.floor((Date.now() - startTime.getTime()) / 1000),
        );
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking, startTime]);

  const startTracking = () => {
    setIsTracking(true);
    setStartTime(new Date());
    setKickCount(0);
    setElapsedTime(0);
  };

  const recordKick = () => {
    setKickCount((prev) => prev + 1);

    // Check if reached 10 kicks
    if (kickCount + 1 >= 10) {
      completeSession();
    }
  };

  const completeSession = () => {
    const duration = Math.floor(elapsedTime / 60);
    const newSession: KickSession = {
      id: sessions.length + 1,
      date: new Date(),
      kicks: kickCount >= 10 ? kickCount : kickCount + 1,
      duration: duration,
    };

    setSessions([newSession, ...sessions]);

    // Provide feedback
    if (duration <= 120) {
      alert(
        `Great! Baby kicked ${kickCount >= 10 ? kickCount : kickCount + 1} times in ${duration} minutes.\n\nThis is healthy fetal movement. Baby is active and well!`,
      );
    } else {
      alert(
        `Session completed: ${kickCount >= 10 ? kickCount : kickCount + 1} kicks in ${duration} minutes.\n\nNote: It took longer than 2 hours to feel 10 movements. If this continues, consult your healthcare provider.`,
      );
    }

    resetTracking();
  };

  const resetTracking = () => {
    setIsTracking(false);
    setKickCount(0);
    setStartTime(null);
    setElapsedTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const avgKicksPerSession =
    sessions.length > 0
      ? Math.round(
          sessions.reduce((acc, s) => acc + s.kicks, 0) /
            sessions.length,
        )
      : 0;

  const avgDuration =
    sessions.length > 0
      ? Math.round(
          sessions.reduce((acc, s) => acc + s.duration, 0) /
            sessions.length,
        )
      : 0;

  return (
    <div
      className={`min-h-screen pb-20 ${darkMode ? "bg-gray-900" : "bg-gradient-to-b from-[#FFE5ED] to-white"}`}
    >
      {/* Header */}
      <div
        className={`shadow-sm px-6 py-4 sticky top-0 z-10 ${darkMode ? "bg-gray-800" : "bg-white"}`}
      >
        <div className="flex items-center justify-between mb-2">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft
              className={`w-6 h-6 ${darkMode ? "text-gray-200" : "text-gray-700"}`}
            />
          </button>
          <img src={logo} alt="MamaAlert" className="h-6" />
          <div className="w-10" />
        </div>
        <h1
          className={`text-xl ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          Fetal Movement Tracker
        </h1>
        <p
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          Count 10 kicks in under 2 hours
        </p>
      </div>

      {/* Hero Image */}
      <div className="px-6 py-4">
        <div className="h-40 rounded-2xl overflow-hidden">
          <ImageWithFallback
            src={fetalImage}
            alt="Fetal Development"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Info Card */}
      <div className="px-6 py-2">
        <Card
          className={`rounded-xl p-4 border-0 ${
            darkMode
              ? "bg-blue-900 border-blue-700"
              : "bg-blue-50 border-blue-200"
          }`}
        >
          <div className="flex items-start gap-3">
            <Activity
              className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                darkMode ? "text-blue-300" : "text-blue-600"
              }`}
            />
            <div>
              <h3
                className={`text-sm mb-1 ${darkMode ? "text-white" : "text-blue-900"}`}
              >
                How to track kicks
              </h3>
              <p
                className={`text-xs ${darkMode ? "text-blue-200" : "text-blue-800"}`}
              >
                Find a quiet time when baby is usually active.
                Count movements, kicks, rolls, or flutters. You
                should feel 10 movements within 2 hours.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Kick Counter */}
      <div className="px-6 py-4">
        <Card
          className={`rounded-2xl p-6 border-0 ${
            darkMode
              ? "bg-gradient-to-br from-gray-800 to-gray-700"
              : "bg-gradient-to-br from-pink-50 to-purple-50"
          }`}
        >
          {!isTracking ? (
            <div className="text-center">
              <Heart
                className={`w-16 h-16 mx-auto mb-4 ${
                  darkMode ? "text-pink-400" : "text-[#E85883]"
                }`}
              />
              <h3
                className={`text-lg mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                Ready to track kicks?
              </h3>
              <p
                className={`text-sm mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Tap the button below to start counting fetal
                movements
              </p>
              <Button
                onClick={startTracking}
                className="bg-[#E85883] text-white hover:bg-[#D14770] rounded-full px-8 py-6"
              >
                <Plus className="w-5 h-5 mr-2" />
                Start Tracking
              </Button>
            </div>
          ) : (
            <div className="text-center">
              {/* Timer */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock
                  className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                />
                <span
                  className={`text-lg ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  {formatTime(elapsedTime)}
                </span>
              </div>

              {/* Kick Count Display */}
              <div className="mb-6">
                <div
                  className={`text-6xl mb-2 ${darkMode ? "text-white" : "text-[#E85883]"}`}
                >
                  {kickCount}
                </div>
                <p
                  className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  {kickCount >= 10
                    ? "Target reached!"
                    : `${10 - kickCount} more to reach 10`}
                </p>
              </div>

              {/* Kick Dots Visualization */}
              <div className="flex justify-center gap-2 mb-6 flex-wrap">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full transition-all ${
                      index < kickCount
                        ? "bg-[#E85883] scale-110"
                        : darkMode
                          ? "bg-gray-600"
                          : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={recordKick}
                  className="flex-1 bg-[#E85883] text-white hover:bg-[#D14770] rounded-full py-6"
                >
                  <Plus className="w-6 h-6 mr-2" />
                  Record Kick
                </Button>

                {kickCount >= 10 && (
                  <Button
                    onClick={completeSession}
                    className="flex-1 bg-green-600 text-white hover:bg-green-700 rounded-full py-6"
                  >
                    Complete
                  </Button>
                )}
              </div>

              <Button
                onClick={resetTracking}
                className={`mt-3 ${darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-700"} hover:bg-gray-200 rounded-full px-6`}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Stats */}
      {sessions.length > 0 && (
        <div className="px-6 py-4">
          <h2
            className={`text-lg mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            Your Stats
          </h2>
          <Card
            className={`rounded-2xl p-4 border-0 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <TrendingUp
                  className={`w-6 h-6 mx-auto mb-2 ${
                    darkMode
                      ? "text-green-400"
                      : "text-green-600"
                  }`}
                />
                <p
                  className={`text-2xl mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  {avgKicksPerSession}
                </p>
                <p
                  className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Avg kicks/session
                </p>
              </div>
              <div className="text-center">
                <Clock
                  className={`w-6 h-6 mx-auto mb-2 ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                />
                <p
                  className={`text-2xl mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  {avgDuration}m
                </p>
                <p
                  className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Avg duration
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Recent Sessions */}
      <div className="px-6 py-4">
        <h2
          className={`text-lg mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          Recent Sessions
        </h2>
        {sessions.length === 0 ? (
          <Card
            className={`rounded-2xl p-6 text-center border-0 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <Heart
              className={`w-12 h-12 mx-auto mb-3 ${
                darkMode ? "text-gray-600" : "text-gray-300"
              }`}
            />
            <p
              className={
                darkMode ? "text-gray-400" : "text-gray-500"
              }
            >
              No sessions logged yet
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {sessions.map((session) => (
              <Card
                key={session.id}
                className={`rounded-2xl p-4 border-0 ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        darkMode ? "bg-pink-900" : "bg-pink-100"
                      }`}
                    >
                      <Activity className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <p
                        className={`text-sm ${darkMode ? "text-white" : "text-gray-900"}`}
                      >
                        {session.date.toLocaleDateString()} at{" "}
                        {session.date.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p
                        className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        {session.kicks} movements in{" "}
                        {session.duration} minutes
                      </p>
                    </div>
                  </div>
                  {session.duration <= 120 ? (
                    <div
                      className={`text-xs px-3 py-1 rounded-full ${
                        darkMode
                          ? "bg-green-900 text-green-300"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      Healthy
                    </div>
                  ) : (
                    <div
                      className={`text-xs px-3 py-1 rounded-full ${
                        darkMode
                          ? "bg-amber-900 text-amber-300"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      Slow
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Warning */}
      <div className="px-6 py-4">
        <Card
          className={`rounded-xl p-4 border-0 ${
            darkMode
              ? "bg-red-900 border-red-700"
              : "bg-red-50 border-red-200"
          }`}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle
              className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                darkMode ? "text-red-300" : "text-red-600"
              }`}
            />
            <div>
              <h3
                className={`text-sm mb-1 ${darkMode ? "text-white" : "text-red-800"}`}
              >
                When to call your doctor:
              </h3>
              <ul
                className={`text-xs space-y-1 ${darkMode ? "text-red-200" : "text-red-700"}`}
              >
                <li>• Less than 10 movements in 2 hours</li>
                <li>• Sudden decrease in fetal movement</li>
                <li>• No movement for several hours</li>
                <li>• Any concerns about baby's wellbeing</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}