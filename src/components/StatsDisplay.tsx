
import React from "react";
import { useUser } from "@/context/UserContext";

const StatsDisplay: React.FC = () => {
  const { userData } = useUser();

  return (
    <section className="mb-6">
      <h3 className="text-sm font-medium uppercase opacity-70 mb-3 heading-font">
        Weekly Stats
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {/* Distance Card */}
        <div className="bg-white dark:bg-dark-card rounded-lg p-3 flex flex-col items-center animate-float">
          <span className="text-xs opacity-70 mb-1">Distance</span>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-neon-cyan">
              {userData.weeklyDistance.toFixed(2)}
            </span>
            <span className="text-xs ml-1">km</span>
          </div>
        </div>

        {/* Calories Card */}
        <div className="bg-white dark:bg-dark-card rounded-lg p-3 flex flex-col items-center animate-float" style={{ animationDelay: "0.2s" }}>
          <span className="text-xs opacity-70 mb-1">Calories</span>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-neon-pink">
              {userData.weeklyCalories}
            </span>
            <span className="text-xs ml-1">cal</span>
          </div>
        </div>

        {/* Streak Card */}
        <div className="bg-white dark:bg-dark-card rounded-lg p-3 flex flex-col items-center animate-float" style={{ animationDelay: "0.4s" }}>
          <span className="text-xs opacity-70 mb-1">Streak</span>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-neon-purple">
              {userData.weeklyStreak}
            </span>
            <span className="text-xs ml-1">days</span>
          </div>
        </div>

        {/* Tokens Card */}
        <div className="bg-white dark:bg-dark-card rounded-lg p-3 flex flex-col items-center animate-float" style={{ animationDelay: "0.6s" }}>
          <span className="text-xs opacity-70 mb-1">$FIXIE</span>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-neon-green">
              {userData.tokenBalance.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsDisplay;
