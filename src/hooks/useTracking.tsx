
import { useState, useEffect, useRef } from "react";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/components/ui/use-toast";

interface Position {
  latitude: number;
  longitude: number;
}

interface TrackingState {
  isTracking: boolean;
  isPaused: boolean;
  mode: "Run" | "Bike";
  distance: number;
  duration: number;
  speed: number;
  calories: number;
  tokens: number;
  currentPosition: Position | null;
  routePoints: Position[];
}

export const useTracking = () => {
  const { addActivity, addTokenTransaction } = useUser();
  const { toast } = useToast();
  const [state, setState] = useState<TrackingState>({
    isTracking: false,
    isPaused: false,
    mode: "Run",
    distance: 0,
    duration: 0,
    speed: 0,
    calories: 0,
    tokens: 0,
    currentPosition: null,
    routePoints: [],
  });

  const watchId = useRef<number | null>(null);
  const timer = useRef<number | null>(null);
  const startTime = useRef<number>(0);
  const pausedTime = useRef<number>(0);
  const lastPosition = useRef<Position | null>(null);

  const calculateDistance = (pos1: Position, pos2: Position): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (pos2.latitude - pos1.latitude) * (Math.PI / 180);
    const dLon = (pos2.longitude - pos1.longitude) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(pos1.latitude * (Math.PI / 180)) *
        Math.cos(pos2.latitude * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const updatePosition = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    const currentPosition = { latitude, longitude };
    const routePoints = [...state.routePoints];

    let newDistance = state.distance;
    if (lastPosition.current) {
      const segmentDistance = calculateDistance(lastPosition.current, currentPosition);
      newDistance += segmentDistance;
    }

    routePoints.push(currentPosition);
    lastPosition.current = currentPosition;

    const currentTime = new Date().getTime();
    const elapsed = (currentTime - startTime.current - pausedTime.current) / 1000;
    const speed = newDistance > 0 ? (newDistance / (elapsed / 3600)) : 0;
    const calories = Math.round(newDistance * (state.mode === "Run" ? 70 : 50)); // Simplified calorie calculation
    const tokens = Math.floor(newDistance);

    setState((prev) => ({
      ...prev,
      distance: newDistance,
      duration: elapsed,
      speed,
      calories,
      tokens,
      currentPosition,
      routePoints,
    }));
  };

  const handleLocationError = (error: GeolocationPositionError) => {
    console.error("Error getting location:", error);
    toast({
      title: "Location Error",
      description: "Error getting your location. Please check your settings.",
      variant: "destructive",
    });
  };

  const updateTimer = () => {
    if (state.isPaused) return;

    const currentTime = new Date().getTime();
    const elapsed = (currentTime - startTime.current - pausedTime.current) / 1000;

    setState((prev) => ({
      ...prev,
      duration: elapsed,
    }));
  };

  const startTracking = () => {
    if (state.isTracking) return;

    if (!navigator.geolocation) {
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive",
      });
      return;
    }

    startTime.current = new Date().getTime();
    pausedTime.current = 0;
    lastPosition.current = null;

    setState((prev) => ({
      ...prev,
      isTracking: true,
      isPaused: false,
      distance: 0,
      duration: 0,
      speed: 0,
      calories: 0,
      tokens: 0,
      routePoints: [],
    }));

    watchId.current = navigator.geolocation.watchPosition(
      updatePosition,
      handleLocationError,
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

    timer.current = window.setInterval(updateTimer, 1000);

    toast({
      title: "Tracking Started",
      description: `Started tracking your ${state.mode.toLowerCase()} activity.`,
    });
  };

  const pauseTracking = () => {
    if (!state.isTracking || state.isPaused) return;

    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }

    const pauseTime = new Date().getTime();
    
    setState((prev) => ({
      ...prev,
      isPaused: true,
    }));

    toast({
      title: "Tracking Paused",
      description: "Your activity tracking has been paused.",
    });
    
    return pauseTime;
  };

  const resumeTracking = (pauseTime: number) => {
    if (!state.isTracking || !state.isPaused) return;

    pausedTime.current += (new Date().getTime() - pauseTime);
    
    setState((prev) => ({
      ...prev,
      isPaused: false,
    }));

    timer.current = window.setInterval(updateTimer, 1000);

    toast({
      title: "Tracking Resumed",
      description: "Your activity tracking has been resumed.",
    });
  };

  const stopTracking = () => {
    if (!state.isTracking) return;

    if (watchId.current) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }

    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }

    const finalState = { ...state };

    setState({
      isTracking: false,
      isPaused: false,
      mode: state.mode,
      distance: 0,
      duration: 0,
      speed: 0,
      calories: 0,
      tokens: 0,
      currentPosition: null,
      routePoints: [],
    });

    addActivity({
      type: finalState.mode,
      distance: parseFloat(finalState.distance.toFixed(2)),
      duration: finalState.duration,
      calories: finalState.calories,
    });

    addTokenTransaction({
      description: `Earned from ${finalState.mode} workout`,
      amount: finalState.tokens,
    });

    toast({
      title: "Workout Complete",
      description: `Congrats! You've earned ${finalState.tokens} $FIXIE tokens.`,
    });

    return finalState;
  };

  const setTrackingMode = (mode: "Run" | "Bike") => {
    if (state.isTracking) {
      toast({
        title: "Cannot Change Mode",
        description: "Cannot change mode while tracking is active.",
        variant: "destructive",
      });
      return;
    }

    setState((prev) => ({
      ...prev,
      mode,
    }));

    toast({
      title: "Mode Updated",
      description: `Tracking mode set to ${mode}`,
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchId.current) {
        navigator.geolocation.clearWatch(watchId.current);
      }
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, []);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  return {
    state,
    startTracking,
    pauseTracking,
    resumeTracking,
    stopTracking,
    setTrackingMode,
    formatTime,
  };
};
