
import React from "react";
import { useUser } from "@/context/UserContext";
import StatsDisplay from "@/components/StatsDisplay";
import ActivityHistory from "@/components/ActivityHistory";
import TokenDisplay from "@/components/TokenDisplay";
import WorkoutButton from "@/components/WorkoutButton";

interface DashboardProps {
  onStartWorkout: () => void;
  isTracking: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartWorkout, isTracking }) => {
  const { userData } = useUser();

  return (
    <>
      {/* Welcome Banner */}
      <section className="mt-4 mb-6">
        <div className="p-4 rounded-xl holographic-bg">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold text-white">Hey, {userData.name}! 👋</h2>
              <p className="text-sm text-white/80">
                Level {userData.level} · {userData.weeklyStreak} Day Streak
              </p>
              <div className="mt-2 w-full max-w-[200px]">
                <div className="text-xs text-white/80 flex justify-between mb-1">
                  <span>XP</span>
                  <span>{userData.experience}/{userData.experienceToNextLevel}</span>
                </div>
                <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-neon-cyan"
                    style={{
                      width: `${(userData.experience / userData.experienceToNextLevel) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex items-center p-1.5 px-2.5 rounded-full bg-dark-card bg-opacity-70 sm:hidden">
              <span className="text-neon-green mr-1.5 text-sm font-medium">
                {userData.tokenBalance.toFixed(2)}
              </span>
              <svg className="h-4 w-4 text-neon-green" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <StatsDisplay />
      <WorkoutButton onClick={onStartWorkout} isTracking={isTracking} />
      <ActivityHistory />
      <TokenDisplay />
    </>
  );
};

export default Dashboard;
