
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TrackingStateType } from "@/hooks/useTracking";

interface WorkoutSummaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  summary: TrackingStateType | null;
  workoutName: string;
  onWorkoutNameChange: (name: string) => void;
  onSaveWorkout: () => void;
  formatTime: (seconds: number) => string;
  autoSaveTimeout: NodeJS.Timeout | null;
}

const WorkoutSummaryDialog: React.FC<WorkoutSummaryDialogProps> = ({
  open,
  onOpenChange,
  summary,
  workoutName,
  onWorkoutNameChange,
  onSaveWorkout,
  formatTime,
  autoSaveTimeout,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Workout Complete!</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <p className="text-xs opacity-70">Distance</p>
              <p className="text-xl font-bold text-neon-cyan">
                {summary?.distance.toFixed(2)} <span className="text-xs">km</span>
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-xs opacity-70">Time</p>
              <p className="text-xl font-bold">
                {summary ? formatTime(summary.duration) : "00:00:00"}
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-xs opacity-70">Calories</p>
              <p className="text-xl font-bold text-neon-pink">
                {summary?.calories}
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-xs opacity-70">Speed</p>
              <p className="text-xl font-bold">
                {summary?.speed.toFixed(1)} <span className="text-xs">km/h</span>
              </p>
            </div>
          </div>
          
          <div className="text-center mb-4">
            <p className="text-xs opacity-70">$FIXIE Earned</p>
            <p className="text-2xl font-bold text-neon-green">
              {summary?.tokens} $FIXIE
            </p>
          </div>
          
          <div className="mb-4">
            <label className="text-sm block mb-1">Give your workout a name:</label>
            <Input
              value={workoutName}
              onChange={(e) => onWorkoutNameChange(e.target.value)}
              placeholder={`${summary?.mode} on ${new Date().toLocaleDateString()}`}
            />
          </div>
          
          <div className="text-xs text-center text-gray-500 mb-4">
            Workout will be auto-saved in {autoSaveTimeout ? "30" : "0"} seconds
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onSaveWorkout} className="w-full bg-neon-cyan hover:bg-neon-cyan/80">
            Save Workout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkoutSummaryDialog;
