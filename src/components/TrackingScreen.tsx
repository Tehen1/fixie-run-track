
import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useTracking } from "@/hooks/useTracking";
import { useToast } from "@/components/ui/use-toast";
import MapPlaceholder from "./tracking/MapPlaceholder";
import TrackingControls from "./tracking/TrackingControls";
import TrackingStats from "./tracking/TrackingStats";
import WorkoutSummaryDialog from "./tracking/WorkoutSummaryDialog";
import SyncPlatformsDialog from "./tracking/SyncPlatformsDialog";

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

  const handleWorkoutSummaryDialogChange = (open: boolean) => {
    if (!open && autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
      setAutoSaveTimeout(null);
      handleSaveWorkout(true);
    }
    setShowSummary(open);
  };

  return (
    <div className="pt-4">
      <div className="bg-white dark:bg-dark-card rounded-lg overflow-hidden mb-4">
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2">Track Workout</h2>
          
          {/* Map Component */}
          <MapPlaceholder />
          
          {/* Stats Component */}
          <TrackingStats state={state} formatTime={formatTime} />
          
          {/* Controls Component */}
          <TrackingControls 
            state={state}
            onStartPauseResume={handleStartPauseResume}
            onStopTracking={handleStopTracking}
            onModeChange={setTrackingMode}
          />
        </div>
      </div>
      
      {/* Workout Summary Dialog */}
      <WorkoutSummaryDialog
        open={showSummary}
        onOpenChange={handleWorkoutSummaryDialogChange}
        summary={summary}
        workoutName={workoutName}
        onWorkoutNameChange={setWorkoutName}
        onSaveWorkout={() => handleSaveWorkout(false)}
        formatTime={formatTime}
        autoSaveTimeout={autoSaveTimeout}
      />
      
      {/* Fitness Sync Dialog */}
      <SyncPlatformsDialog
        open={showSyncDialog}
        onOpenChange={setShowSyncDialog}
        syncPlatforms={syncPlatforms}
        selectedPlatforms={selectedPlatforms}
        onTogglePlatform={togglePlatform}
        onSkipSync={() => {
          setShowSyncDialog(false);
          completeWorkout();
        }}
        onSyncAndSave={() => completeWorkout()}
      />
    </div>
  );
};

export default TrackingScreen;
