
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
  mode: "Run" | "Bike", 
  duration: number
): number => {
  // Simple calorie calculation
  // Run: ~100 calories per km
  // Bike: ~50 calories per km
  const baseRate = mode === "Run" ? 100 : 50;
  return Math.round(distance * baseRate);
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
