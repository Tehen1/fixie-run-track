export interface Position {
  latitude: number;
  longitude: number;
}

export const calculateDistance = (pos1: Position, pos2: Position): number => {
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

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${secs}`;
};

export const calculateCalories = (
  distance: number, 
  mode: "Run" | "Bike" | "Walk" | "Other", 
  duration: number,
  weightKg: number = 70  // Default weight of 70kg if not provided
): number => {
  let met: number;
  
  switch (mode) {
    case "Run":
      // MET for running varies from 7-12.5 depending on speed
      // Assuming moderate pace of 10km/h (6 mph)
      met = 10;
      break;
    case "Bike":
      // MET for biking varies from 4-16 depending on speed/intensity
      // Assuming moderate pace of 15km/h (9.3 mph)
      met = 6;
      break;
    case "Walk":
      // MET for walking varies from 2-5 depending on speed
      met = 3.5;
      break;
    default:
      // Default to moderate exercise
      met = 5;
  }
  
  // Calories burned = MET × weight (kg) × duration (hours)
  // Duration is in seconds, so convert to hours
  const durationHours = duration / 3600;
  return Math.round(met * weightKg * durationHours);
};

export const formatDistance = (distance: number, unit: "km" | "mi" = "km"): string => {
  if (unit === "mi") {
    return `${(distance * 0.621371).toFixed(2)} mi`;
  }
  return `${distance.toFixed(2)} km`;
};

export const generateRandomActivities = (count: number = 5) => {
  const activities = [];
  const types = ["Run", "Bike"];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const type = types[Math.floor(Math.random() * types.length)];
    const distance = parseFloat((Math.random() * 10 + 1).toFixed(2));
    const duration = Math.floor(Math.random() * 7200 + 900); // 15-135 minutes in seconds
    const calories = Math.floor(distance * (type === "Run" ? 70 : 50));
    
    activities.push({
      id: `activity-${i}`,
      type,
      distance,
      duration,
      calories,
      date: date.toLocaleDateString(),
    });
  }

  return activities;
};

export const generateRandomTokenHistory = (count: number = 5) => {
  const transactions = [];
  const descriptions = [
    "Earned from Run workout",
    "Earned from Bike workout",
    "Weekly challenge reward",
    "Friend referral bonus",
    "Daily login bonus"
  ];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    const amount = parseFloat((Math.random() * 30 + 5).toFixed(2));
    
    transactions.push({
      id: `transaction-${i}`,
      description,
      amount,
      date: date.toLocaleDateString(),
    });
  }

  return transactions;
};

// New functions for fitness platforms

export const convertHeartRateZone = (heartRate: number, maxHeartRate: number = 220): string => {
  // Calculate percentage of max heart rate
  const percent = heartRate / maxHeartRate;
  
  if (percent < 0.5) return "Very Light";
  if (percent < 0.6) return "Light";
  if (percent < 0.7) return "Moderate";
  if (percent < 0.8) return "Hard";
  if (percent < 0.9) return "Very Hard";
  return "Maximum";
};

export const calculatePace = (distanceKm: number, durationSeconds: number): string => {
  if (distanceKm <= 0 || durationSeconds <= 0) return "--:--";
  
  // Calculate minutes per kilometer
  const totalMinutes = durationSeconds / 60;
  const pace = totalMinutes / distanceKm;
  
  const minutes = Math.floor(pace);
  const seconds = Math.floor((pace - minutes) * 60);
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const estimateSteps = (distanceKm: number, strideLength: number = 0.75): number => {
  // Average stride length of 0.75m
  const steps = (distanceKm * 1000) / strideLength;
  return Math.round(steps);
};
