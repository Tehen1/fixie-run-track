
import React, { useState, useEffect } from "react";
import { UserProvider } from "@/context/UserContext";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import TrackingScreen from "@/components/TrackingScreen";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateRandomActivities, generateRandomTokenHistory } from "@/utils/trackingUtils";
import { useUser } from "@/context/UserContext";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "@/components/Login";
import { useNavigate } from "react-router-dom";

const MainContent = () => {
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [showTracking, setShowTracking] = useState<boolean>(false);
  const { userData, updateUserData } = useUser();
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    if (value !== "tracking") {
      setShowTracking(false);
    }
  };

  const handleStartWorkout = () => {
    setShowTracking(true);
    setCurrentTab("tracking");
  };

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="container mx-auto px-4 pt-16 pb-24">
      {!isAuthenticated && (
        <div className="mb-8">
          <Login onLogin={handleLogin} />
        </div>
      )}

      <Tabs
        defaultValue="home"
        value={currentTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-card border-t border-gray-200 dark:border-dark-surface z-10">
          <TabsList className="w-full grid grid-cols-4 bg-transparent h-16">
            <TabsTrigger
              value="home"
              className="data-[state=active]:bg-transparent data-[state=active]:border-t-2 data-[state=active]:border-neon-cyan rounded-none"
            >
              <div className="flex flex-col items-center">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="text-xs mt-1">Home</span>
              </div>
            </TabsTrigger>

            <TabsTrigger
              value="tracking"
              className="data-[state=active]:bg-transparent data-[state=active]:border-t-2 data-[state=active]:border-neon-cyan rounded-none"
            >
              <div className="flex flex-col items-center">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-xs mt-1">Track</span>
              </div>
            </TabsTrigger>

            <TabsTrigger
              value="tokens"
              className="data-[state=active]:bg-transparent data-[state=active]:border-t-2 data-[state=active]:border-neon-cyan rounded-none"
            >
              <div className="flex flex-col items-center">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-xs mt-1">Tokens</span>
              </div>
            </TabsTrigger>

            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-transparent data-[state=active]:border-t-2 data-[state=active]:border-neon-cyan rounded-none"
            >
              <div className="flex flex-col items-center">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-xs mt-1">Profile</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="home" className="mt-2">
          {showTracking ? (
            <TrackingScreen />
          ) : (
            <Dashboard onStartWorkout={handleStartWorkout} isTracking={false} />
          )}
        </TabsContent>

        <TabsContent value="tracking">
          <TrackingScreen />
        </TabsContent>

        <TabsContent value="tokens">
          <div className="pt-4">
            <h2 className="text-xl font-bold mb-4">$FIXIE Tokens</h2>
            <div className="bg-white dark:bg-dark-card rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm opacity-70">Your Balance</span>
                <span className="text-2xl font-bold text-neon-green">
                  {userData.tokenBalance.toFixed(2)} $FIXIE
                </span>
              </div>
              <div className="space-y-2 text-center">
                <button className="w-full py-2 bg-neon-purple text-white rounded-lg font-medium">
                  Spend Tokens
                </button>
                <button className="w-full py-2 bg-transparent border border-neon-cyan text-neon-cyan rounded-lg font-medium">
                  View Market
                </button>
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2">Transaction History</h3>
            <div className="bg-white dark:bg-dark-card rounded-lg overflow-hidden">
              {userData.tokenHistory.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-3 border-b border-gray-100 dark:border-dark-surface last:border-b-0 flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm font-medium">{transaction.description}</p>
                    <p className="text-xs opacity-70">{transaction.date}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neon-green">
                      {transaction.amount.toFixed(2)} $FIXIE
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="profile">
          <div className="pt-4">
            <div className="bg-white dark:bg-dark-card rounded-lg p-4 text-center mb-4">
              <div className="h-20 w-20 bg-neon-cyan rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {userData.name.charAt(0)}
                </span>
              </div>
              <h2 className="text-xl font-bold">{userData.name}</h2>
              <p className="text-sm opacity-70">Level {userData.level}</p>
              <div className="mt-2 mb-4">
                <div className="text-xs opacity-70 flex justify-between mb-1">
                  <span>Experience</span>
                  <span>
                    {userData.experience}/{userData.experienceToNextLevel}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-dark-surface rounded-full overflow-hidden">
                  <div
                    className="h-full bg-neon-cyan"
                    style={{
                      width: `${(userData.experience / userData.experienceToNextLevel) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center">
                  <p className="text-xs opacity-70">Distance</p>
                  <p className="text-xl font-bold text-neon-cyan">
                    {userData.weeklyDistance.toFixed(2)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs opacity-70">Activities</p>
                  <p className="text-xl font-bold text-neon-purple">
                    {userData.activities.length}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs opacity-70">Streak</p>
                  <p className="text-xl font-bold text-neon-pink">
                    {userData.weeklyStreak}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="py-2 bg-neon-cyan text-white rounded-lg font-medium">
                  Edit Profile
                </button>
                <button className="py-2 bg-transparent border border-gray-300 dark:border-dark-surface rounded-lg font-medium">
                  Settings
                </button>
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2">Connections</h3>
            <div className="bg-white dark:bg-dark-card rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Google Fit</h4>
                  <p className="text-xs opacity-70">
                    {userData.fitness.googleFit.isConnected
                      ? `Connected · Last sync: ${
                          userData.fitness.googleFit.lastSync
                            ? new Date(userData.fitness.googleFit.lastSync).toLocaleString()
                            : "Never"
                        }`
                      : "Not connected"}
                  </p>
                </div>
                <button
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    userData.fitness.googleFit.isConnected
                      ? "bg-gray-200 dark:bg-dark-surface"
                      : "bg-neon-cyan text-white"
                  }`}
                >
                  {userData.fitness.googleFit.isConnected ? "Manage" : "Connect"}
                </button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Index: React.FC = () => {
  const AppContent = () => {
    const { updateUserData } = useUser();
    const { isAuthenticated } = useAuth0();
    
    useEffect(() => {
      // Generate some dummy data on first load
      const activities = generateRandomActivities(5);
      const tokenHistory = generateRandomTokenHistory(5);
      
      updateUserData({
        activities,
        tokenHistory,
      });
    }, [updateUserData]);
    
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-dark-bg">
        <Header />
        <MainContent />
      </div>
    );
  };
  
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
};

export default Index;
