import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Activity {
  id: string;
  type: string;
  distance: number;
  duration: number;
  calories: number;
  date: string;
  syncedFrom?: string; // Platform this activity was synced from
  externalId?: string; // ID from the external platform
  heartRate?: number; // Average heart rate if available
}

export interface TokenTransaction {
  id: string;
  description: string;
  amount: number;
  date: string;
}

export interface UserSettings {
  notifications: boolean;
  darkMode: boolean;
  units: "km" | "mi";
}

export interface FitnessSettings {
  steps: boolean;
  distance: boolean;
  calories: boolean;
  heartRate: boolean;
  activities: boolean;
  autoSync: boolean;
  syncFrequency: "daily" | "realtime" | "manual";
}

export interface FitnessConnection {
  isConnected: boolean;
  lastSync: Date | null;
  syncInProgress: boolean;
  syncSettings: FitnessSettings;
  authToken?: string; // For storing the auth token when connected
}

export interface FitnessData {
  googleFit: FitnessConnection;
  appleHealth: FitnessConnection;
  strava: FitnessConnection;
  fitbit: FitnessConnection;
}

export interface UserData {
  name: string;
  profileImage: string;
  level: number;
  experience: number;
  experienceToNextLevel: number;
  tokenBalance: number;
  weeklyDistance: number;
  weeklyCalories: number;
  weeklyStreak: number;
  activities: Activity[];
  tokenHistory: TokenTransaction[];
  settings: UserSettings;
  fitness: FitnessData;
}

interface UserContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  addActivity: (activity: Omit<Activity, "id" | "date">) => void;
  addTokenTransaction: (transaction: Omit<TokenTransaction, "id" | "date">) => void;
  toggleFitnessConnection: (platform: keyof FitnessData) => void;
  syncWithFitnessPlatform: (platform: keyof FitnessData) => void;
  updateFitnessSettings: (platform: keyof FitnessData, setting: keyof FitnessSettings, value: boolean | string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>({
    name: "Alex",
    profileImage: "https://ui-avatars.com/api/?name=A&background=5D5CDE&color=fff",
    level: 12,
    experience: 2450,
    experienceToNextLevel: 3000,
    tokenBalance: 125.75,
    weeklyDistance: 32.5,
    weeklyCalories: 1250,
    weeklyStreak: 7,
    activities: [],
    tokenHistory: [],
    settings: {
      notifications: true,
      darkMode: false,
      units: "km",
    },
    fitness: {
      googleFit: {
        isConnected: false,
        lastSync: null,
        syncInProgress: false,
        syncSettings: {
          steps: true,
          distance: true,
          calories: true,
          heartRate: true,
          activities: true,
          autoSync: true,
          syncFrequency: "realtime",
        },
      },
      appleHealth: {
        isConnected: false,
        lastSync: null,
        syncInProgress: false,
        syncSettings: {
          steps: true,
          distance: true,
          calories: true,
          heartRate: true,
          activities: true,
          autoSync: true,
          syncFrequency: "realtime",
        },
      },
      strava: {
        isConnected: false,
        lastSync: null,
        syncInProgress: false,
        syncSettings: {
          steps: true,
          distance: true,
          calories: true,
          heartRate: true,
          activities: true,
          autoSync: true,
          syncFrequency: "realtime",
        },
      },
      fitbit: {
        isConnected: false,
        lastSync: null,
        syncInProgress: false,
        syncSettings: {
          steps: true,
          distance: true,
          calories: true,
          heartRate: true,
          activities: true,
          autoSync: true,
          syncFrequency: "realtime",
        },
      },
    },
  });

  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  const addActivity = (activity: Omit<Activity, "id" | "date">) => {
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
    };

    setUserData((prev) => ({
      ...prev,
      activities: [newActivity, ...prev.activities],
      weeklyDistance: prev.weeklyDistance + activity.distance,
      weeklyCalories: prev.weeklyCalories + activity.calories,
      experience: prev.experience + Math.round(activity.distance * 100),
    }));

    // Check for level up
    if (userData.experience + Math.round(activity.distance * 100) >= userData.experienceToNextLevel) {
      setUserData((prev) => ({
        ...prev,
        level: prev.level + 1,
        experience: prev.experience + Math.round(activity.distance * 100) - prev.experienceToNextLevel,
        experienceToNextLevel: prev.experienceToNextLevel + 1000,
      }));
    }
  };

  const addTokenTransaction = (transaction: Omit<TokenTransaction, "id" | "date">) => {
    const newTransaction: TokenTransaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
    };

    setUserData((prev) => ({
      ...prev,
      tokenHistory: [newTransaction, ...prev.tokenHistory],
      tokenBalance: prev.tokenBalance + transaction.amount,
    }));
  };

  const toggleFitnessConnection = (platform: keyof FitnessData) => {
    setUserData((prev) => ({
      ...prev,
      fitness: {
        ...prev.fitness,
        [platform]: {
          ...prev.fitness[platform],
          isConnected: !prev.fitness[platform].isConnected,
        },
      },
    }));
  };

  const syncWithFitnessPlatform = (platform: keyof FitnessData) => {
    if (userData.fitness[platform].syncInProgress) return;

    setUserData((prev) => ({
      ...prev,
      fitness: {
        ...prev.fitness,
        [platform]: {
          ...prev.fitness[platform],
          syncInProgress: true,
        },
      },
    }));

    // Simulate API call with timeout
    setTimeout(() => {
      // In a real app, this would be the place to call an actual fitness API
      // and process the returned activities
      
      // For demo, let's simulate getting activities from the platform
      const importedActivities = generateMockFitnessActivities(platform);
      
      // Add imported activities to user data
      importedActivities.forEach(activity => {
        addActivity({
          ...activity,
          syncedFrom: platform
        });
      });

      setUserData((prev) => ({
        ...prev,
        fitness: {
          ...prev.fitness,
          [platform]: {
            ...prev.fitness[platform],
            lastSync: new Date(),
            syncInProgress: false,
          },
        },
      }));
    }, 2000);
  };

  const generateMockFitnessActivities = (platform: keyof FitnessData): Omit<Activity, "id" | "date" | "syncedFrom">[] => {
    // Generate 1-3 random activities
    const count = Math.floor(Math.random() * 3) + 1;
    const activities = [];
    
    for (let i = 0; i < count; i++) {
      const isRun = Math.random() > 0.5;
      activities.push({
        type: isRun ? "Run" : "Bike",
        distance: parseFloat((Math.random() * 10 + 1).toFixed(2)),
        duration: Math.floor(Math.random() * 7200 + 900), // 15-135 minutes in seconds
        calories: Math.floor(Math.random() * 500 + 100),
        externalId: `${platform}-${Date.now()}-${i}`,
        heartRate: Math.floor(Math.random() * 60 + 120), // Random heart rate between 120-180
      });
    }
    
    return activities;
  };

  const updateFitnessSettings = (
    platform: keyof FitnessData,
    setting: keyof FitnessSettings,
    value: boolean | string
  ) => {
    setUserData((prev) => ({
      ...prev,
      fitness: {
        ...prev.fitness,
        [platform]: {
          ...prev.fitness[platform],
          syncSettings: {
            ...prev.fitness[platform].syncSettings,
            [setting]: value,
          },
        },
      },
    }));
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        updateUserData,
        addActivity,
        addTokenTransaction,
        toggleFitnessConnection,
        syncWithFitnessPlatform,
        updateFitnessSettings,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
