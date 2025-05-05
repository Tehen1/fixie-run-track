
import { Activity, FitnessData } from "@/context/UserContext";
import { formatTime } from "./trackingUtils";

export interface ExternalFitnessActivity {
  id: string;
  type: string;
  distance: number;
  duration: number;
  calories: number;
  startTime: Date;
  endTime: Date;
  heartRate?: number;
  steps?: number;
  source: keyof FitnessData;
}

/**
 * Normalize activity types across different fitness platforms
 */
export const normalizeActivityType = (type: string, source: keyof FitnessData): string => {
  type = type.toLowerCase();
  
  if (type.includes("run") || type.includes("jog")) {
    return "Run";
  } else if (type.includes("bike") || type.includes("cycle")) {
    return "Bike";
  } else if (type.includes("walk")) {
    return "Walk";
  } else if (type.includes("swim")) {
    return "Swim";
  } else {
    return "Other";
  }
};

/**
 * Converts a fitness platform activity to the app's internal Activity format
 */
export const convertExternalActivity = (
  activity: ExternalFitnessActivity
): Omit<Activity, "id" | "date"> => {
  return {
    type: normalizeActivityType(activity.type, activity.source),
    distance: activity.distance,
    duration: activity.duration,
    calories: activity.calories,
    syncedFrom: activity.source,
    externalId: activity.id,
    heartRate: activity.heartRate,
  };
};

/**
 * Format a fitness platform's name for display
 */
export const formatPlatformName = (platform: keyof FitnessData): string => {
  switch (platform) {
    case "googleFit":
      return "Google Fit";
    case "appleHealth":
      return "Apple Health";
    case "strava":
      return "Strava";
    case "fitbit":
      return "Fitbit";
    default:
      return platform;
  }
};

/**
 * Creates a sync URL for a specific platform
 */
export const getPlatformAuthUrl = (platform: keyof FitnessData): string => {
  // In a real app, these would be actual OAuth URLs
  switch (platform) {
    case "googleFit":
      return "https://accounts.google.com/o/oauth2/auth?scope=https://www.googleapis.com/auth/fitness.activity.read&response_type=code";
    case "strava":
      return "https://www.strava.com/oauth/authorize?client_id=YOUR_CLIENT_ID&response_type=code&scope=activity:read";
    case "fitbit":
      return "https://www.fitbit.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&response_type=code&scope=activity";
    default:
      return "#";
  }
};

/**
 * Check if an activity is already imported (by external ID)
 */
export const isActivityAlreadyImported = (
  externalId: string,
  activities: Activity[]
): boolean => {
  return activities.some(activity => activity.externalId === externalId);
};

/**
 * Generate a sync status message for UI display
 */
export const getSyncStatusMessage = (
  platform: keyof FitnessData,
  isConnected: boolean,
  lastSync: Date | null,
  syncInProgress: boolean
): string => {
  if (syncInProgress) {
    return "Syncing...";
  }
  
  if (!isConnected) {
    return "Not connected";
  }
  
  if (!lastSync) {
    return "Connected, never synced";
  }
  
  return `Connected · Last sync: ${lastSync.toLocaleString()}`;
};
