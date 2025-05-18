
import React from "react";
import { Button } from "@/components/ui/button";
import { TrackingStateType } from "@/hooks/useTracking";

interface TrackingControlsProps {
  state: TrackingStateType;
  onStartPauseResume: () => void;
  onStopTracking: () => void;
  onModeChange: (mode: "Run" | "Bike") => void;
}

const TrackingControls: React.FC<TrackingControlsProps> = ({
  state,
  onStartPauseResume,
  onStopTracking,
  onModeChange,
}) => {
  return (
    <>
      {/* Mode Selection */}
      <div className="flex space-x-2 mb-4">
        <Button
          variant={state.mode === "Run" ? "default" : "outline"}
          onClick={() => onModeChange("Run")}
          disabled={state.isTracking}
          className={state.mode === "Run" ? "bg-neon-cyan hover:bg-neon-cyan/80" : ""}
        >
          Run
        </Button>
        <Button
          variant={state.mode === "Bike" ? "default" : "outline"}
          onClick={() => onModeChange("Bike")}
          disabled={state.isTracking}
          className={state.mode === "Bike" ? "bg-neon-pink hover:bg-neon-pink/80" : ""}
        >
          Bike
        </Button>
      </div>
      
      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button
          onClick={onStartPauseResume}
          className={`flex-1 ${
            !state.isTracking
              ? "bg-neon-cyan hover:bg-neon-cyan/80"
              : state.isPaused
              ? "bg-neon-purple hover:bg-neon-purple/80"
              : "bg-amber-500 hover:bg-amber-500/80"
          }`}
        >
          {!state.isTracking ? "START" : state.isPaused ? "RESUME" : "PAUSE"}
        </Button>
        
        {state.isTracking && (
          <Button
            onClick={onStopTracking}
            variant="destructive"
            className="flex-1"
          >
            STOP
          </Button>
        )}
      </div>
    </>
  );
};

export default TrackingControls;
