
import React from "react";
import { TrackingStateType } from "@/hooks/useTracking";

interface TrackingStatsProps {
  state: TrackingStateType;
  formatTime: (seconds: number) => string;
}

const TrackingStats: React.FC<TrackingStatsProps> = ({ state, formatTime }) => {
  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-gray-100 dark:bg-dark-surface rounded-lg p-3 text-center">
          <p className="text-xs opacity-70">Distance</p>
          <p className="text-xl font-bold text-neon-cyan">
            {state.distance.toFixed(2)} <span className="text-xs">km</span>
          </p>
        </div>
        
        <div className="bg-gray-100 dark:bg-dark-surface rounded-lg p-3 text-center">
          <p className="text-xs opacity-70">Time</p>
          <p className="text-xl font-bold">
            {formatTime(state.duration)}
          </p>
        </div>
        
        <div className="bg-gray-100 dark:bg-dark-surface rounded-lg p-3 text-center">
          <p className="text-xs opacity-70">Calories</p>
          <p className="text-xl font-bold text-neon-pink">
            {state.calories}
          </p>
        </div>
      </div>
      
      {/* Speed and Tokens */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-100 dark:bg-dark-surface rounded-lg p-3 text-center">
          <p className="text-xs opacity-70">Speed</p>
          <p className="text-xl font-bold">
            {state.speed.toFixed(1)} <span className="text-xs">km/h</span>
          </p>
        </div>
        
        <div className="bg-gray-100 dark:bg-dark-surface rounded-lg p-3 text-center">
          <p className="text-xs opacity-70">$FIXIE Earned</p>
          <p className="text-xl font-bold text-neon-green">
            {state.tokens}
          </p>
        </div>
      </div>
      
      {/* Token Progress */}
      <div className="mb-4">
        <div className="flex justify-between items-center text-xs mb-1">
          <span>Progress to next token</span>
          <span>{state.tokens} → {state.tokens + 1}</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-dark-surface rounded-full overflow-hidden">
          <div 
            className="h-full bg-neon-green"
            style={{ width: `${(state.distance % 1) * 100}%` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default TrackingStats;
