
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
        className="w-full py-4 rounded-lg font-bold text-white heading-font tracking-wider bg-gradient-to-r from-neon-cyan to-neon-purple hover:shadow-lg transform transition hover:-translate-y-0.5 animate-pulse-slow"
      >
        {isTracking ? "VIEW TRACKING" : "START WORKOUT"}
      </button>
    </section>
  );
};

export default WorkoutButton;
