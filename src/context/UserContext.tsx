
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Activity {
  id: string;
  type: string;
  distance: number;
  duration: number;
  calories: number;
  date: string;
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

export interface GoogleFitSettings {
  steps: boolean;
  distance: boolean;
  calories: boolean;
  heartRate: boolean;
  activities: boolean;
  autoSync: boolean;
  syncFrequency: "daily" | "realtime" | "manual";
}

export interface GoogleFitData {
  isConnected: boolean;
  lastSync: Date | null;
  syncInProgress: boolean;
  syncSettings: GoogleFitSettings;
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
  googleFit: GoogleFitData;
}

interface UserContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  addActivity: (activity: Omit<Activity, "id" | "date">) => void;
  addTokenTransaction: (transaction: Omit<TokenTransaction, "id" | "date">) => void;
  toggleGoogleFitConnection: () => void;
  syncWithGoogleFit: () => void;
  updateGoogleFitSettings: (setting: keyof GoogleFitSettings, value: boolean | string) => void;
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

  const toggleGoogleFitConnection = () => {
    setUserData((prev) => ({
      ...prev,
      googleFit: {
        ...prev.googleFit,
        isConnected: !prev.googleFit.isConnected,
      },
    }));
  };

  const syncWithGoogleFit = () => {
    if (userData.googleFit.syncInProgress) return;

    setUserData((prev) => ({
      ...prev,
      googleFit: {
        ...prev.googleFit,
        syncInProgress: true,
      },
    }));

    // Simulate API call with timeout
    setTimeout(() => {
      setUserData((prev) => ({
        ...prev,
        googleFit: {
          ...prev.googleFit,
          lastSync: new Date(),
          syncInProgress: false,
        },
      }));
    }, 2000);
  };

  const updateGoogleFitSettings = (
    setting: keyof GoogleFitSettings,
    value: boolean | string
  ) => {
    setUserData((prev) => ({
      ...prev,
      googleFit: {
        ...prev.googleFit,
        syncSettings: {
          ...prev.googleFit.syncSettings,
          [setting]: value,
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
        toggleGoogleFitConnection,
        syncWithGoogleFit,
        updateGoogleFitSettings,
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
