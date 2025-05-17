
import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useTracking } from "@/hooks/useTracking";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { formatPlatformName } from "@/utils/fitnessSyncUtils";

const TrackingScreen: React.FC = () => {
  const { state, startTracking, pauseTracking, resumeTracking, stopTracking, setTrackingMode, formatTime } = useTracking();
  const { userData } = useUser();
  const { toast } = useToast();
  const [pauseTime, setPauseTime] = useState<number>(0);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [workoutName, setWorkoutName] = useState<string>("");
  const [summary, setSummary] = useState<any>(null);
  const [showSyncDialog, setShowSyncDialog] = useState<boolean>(false);
  const [syncPlatforms, setSyncPlatforms] = useState<Array<keyof typeof userData.fitness>>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Array<keyof typeof userData.fitness>>([]);
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Mock map initialization if we had a real map
    if (state.isTracking) {
      console.log("Map would be initialized here");
    }
  }, [state.isTracking]);

  // Auto-save functionality when summary is shown
  useEffect(() => {
    if (showSummary && summary) {
      // Set a default name based on the workout type and current date/time
      const defaultName = `${summary.mode} on ${new Date().toLocaleDateString()}`;
      setWorkoutName(defaultName);
      
      // Set a timeout to auto-save after 30 seconds if user hasn't interacted
      const timeout = setTimeout(() => {
        handleSaveWorkout(true);
      }, 30000); // 30 seconds
      
      setAutoSaveTimeout(timeout);
      
      // Clear timeout on unmount or when dialog closes
      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }
  }, [showSummary, summary]);
  
  // Clear auto-save timeout when workout name changes (user is interacting)
  useEffect(() => {
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
      
      // Reset the timeout
      const timeout = setTimeout(() => {
        handleSaveWorkout(true);
      }, 30000);
      
      setAutoSaveTimeout(timeout);
    }
  }, [workoutName]);

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

  const handleSaveWorkout = (isAutoSave: boolean = false) => {
    // Clear any existing timeout
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
      setAutoSaveTimeout(null);
    }
    
    const platformsToSync = [];
    
    // Check which platforms are connected and have autoSync enabled
    Object.entries(userData.fitness).forEach(([platform, connection]) => {
      if (connection.isConnected && connection.syncSettings.autoSync) {
        platformsToSync.push(platform);
      }
    });
    
    if (platformsToSync.length > 0) {
      setShowSyncDialog(true);
      setSyncPlatforms(platformsToSync as Array<keyof typeof userData.fitness>);
    } else {
      completeWorkout(isAutoSave);
    }
  };

  const completeWorkout = (isAutoSave: boolean = false) => {
    toast({
      title: isAutoSave ? "Workout Auto-Saved" : "Workout Saved",
      description: workoutName ? `"${workoutName}" has been saved.` : "Your workout has been saved.",
    });
    
    // Push to connected platforms if selected
    selectedPlatforms.forEach(platform => {
      // In a real app, this would call an API to push the workout to the platform
      toast({
        title: `Synced to ${formatPlatformName(platform)}`,
        description: "Your workout has been sent to the platform.",
      });
    });
    
    setShowSummary(false);
    setShowSyncDialog(false);
    setWorkoutName("");
  };

  const togglePlatform = (platform: keyof typeof userData.fitness) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  useEffect(() => {
    if (syncPlatforms.length > 0) {
      setSelectedPlatforms([...syncPlatforms]);
    }
  }, [syncPlatforms]);
  
  // Cancel auto-save when sync dialog is shown
  useEffect(() => {
    if (showSyncDialog && autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
      setAutoSaveTimeout(null);
    }
  }, [showSyncDialog]);

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
      <Dialog open={showSummary} onOpenChange={(open) => {
        if (!open && autoSaveTimeout) {
          clearTimeout(autoSaveTimeout);
          setAutoSaveTimeout(null);
          handleSaveWorkout(true);
        }
        setShowSummary(open);
      }}>
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
            
            <div className="text-xs text-center text-gray-500 mb-4">
              Workout will be auto-saved in {autoSaveTimeout ? "30" : "0"} seconds
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => handleSaveWorkout(false)} className="w-full bg-neon-cyan hover:bg-neon-cyan/80">
              Save Workout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Fitness Sync Dialog */}
      <Dialog open={showSyncDialog} onOpenChange={setShowSyncDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sync Workout</DialogTitle>
            <DialogDescription>
              Choose fitness platforms to sync this workout with:
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            {syncPlatforms.map(platform => (
              <div key={platform} className="flex items-center space-x-2">
                <Checkbox 
                  id={`sync-${platform}`}
                  checked={selectedPlatforms.includes(platform)}
                  onCheckedChange={() => togglePlatform(platform)}
                />
                <label
                  htmlFor={`sync-${platform}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {formatPlatformName(platform)}
                </label>
              </div>
            ))}
          </div>
          
          <DialogFooter className="flex space-x-2 justify-end">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowSyncDialog(false);
                completeWorkout();
              }}
            >
              Skip Sync
            </Button>
            <Button 
              onClick={() => completeWorkout()}
              className="bg-neon-cyan hover:bg-neon-cyan/80"
            >
              Sync & Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrackingScreen;
