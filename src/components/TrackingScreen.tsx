
import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useTracking } from "@/hooks/useTracking";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const TrackingScreen: React.FC = () => {
  const { state, startTracking, pauseTracking, resumeTracking, stopTracking, setTrackingMode, formatTime } = useTracking();
  const { userData } = useUser();
  const { toast } = useToast();
  const [pauseTime, setPauseTime] = useState<number>(0);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [workoutName, setWorkoutName] = useState<string>("");
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    // Mock map initialization if we had a real map
    if (state.isTracking) {
      console.log("Map would be initialized here");
    }
  }, [state.isTracking]);

  const handleStartPauseResume = () => {
    if (!state.isTracking) {
      startTracking();
    } else if (state.isPaused) {
      resumeTracking(pauseTime);
    } else {
      const time = pauseTracking();
      if (time) setPauseTime(time);
    }
  };

  const handleStopTracking = () => {
    const result = stopTracking();
    if (result) {
      setSummary(result);
      setShowSummary(true);
    }
  };

  const handleSaveWorkout = () => {
    toast({
      title: "Workout Saved",
      description: workoutName ? `"${workoutName}" has been saved.` : "Your workout has been saved.",
    });
    setShowSummary(false);
    setWorkoutName("");
  };

  return (
    <div className="pt-4">
      <div className="bg-white dark:bg-dark-card rounded-lg overflow-hidden mb-4">
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2">Track Workout</h2>
          
          {/* Mode Selection */}
          <div className="flex space-x-2 mb-4">
            <Button
              variant={state.mode === "Run" ? "default" : "outline"}
              onClick={() => setTrackingMode("Run")}
              disabled={state.isTracking}
              className={state.mode === "Run" ? "bg-neon-cyan hover:bg-neon-cyan/80" : ""}
            >
              Run
            </Button>
            <Button
              variant={state.mode === "Bike" ? "default" : "outline"}
              onClick={() => setTrackingMode("Bike")}
              disabled={state.isTracking}
              className={state.mode === "Bike" ? "bg-neon-pink hover:bg-neon-pink/80" : ""}
            >
              Bike
            </Button>
          </div>
          
          {/* Map Placeholder */}
          <div className="rounded-lg bg-gray-200 dark:bg-dark-surface h-48 mb-4 flex items-center justify-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Map View</p>
          </div>
          
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
          
          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              onClick={handleStartPauseResume}
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
                onClick={handleStopTracking}
                variant="destructive"
                className="flex-1"
              >
                STOP
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Workout Summary Dialog */}
      <Dialog open={showSummary} onOpenChange={setShowSummary}>
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
                onChange={(e) => setWorkoutName(e.target.value)}
                placeholder={`${summary?.mode} on ${new Date().toLocaleDateString()}`}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={handleSaveWorkout} className="w-full bg-neon-cyan hover:bg-neon-cyan/80">
              Save Workout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrackingScreen;
