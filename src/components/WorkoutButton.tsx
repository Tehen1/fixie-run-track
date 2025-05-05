
import React from "react";

interface WorkoutButtonProps {
  onClick: () => void;
  isTracking: boolean;
}

const WorkoutButton: React.FC<WorkoutButtonProps> = ({ onClick, isTracking }) => {
  return (
    <section className="my-6">
      <button
        onClick={onClick}
        className="w-full py-4 rounded-lg font-bold text-white heading-font tracking-wider bg-gradient-to-r from-neon-cyan to-neon-purple shadow-md hover:shadow-lg transform transition hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-opacity-50"
      >
        {isTracking ? "VIEW TRACKING" : "START WORKOUT"}
      </button>
      {isTracking && (
        <div className="mt-2 text-center">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <span className="h-2 w-2 mr-1 rounded-full bg-green-500 animate-pulse"></span>
            Workout in progress
          </span>
        </div>
      )}
    </section>
  );
};

export default WorkoutButton;
