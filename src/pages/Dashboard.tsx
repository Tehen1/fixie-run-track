
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';
import UserProfile from '@/components/UserProfile';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { logout, user } = useAuth0();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout({ 
      logoutParams: { 
        returnTo: window.location.origin 
      } 
    });
  };

  return (
    <div className="container mx-auto px-4 pt-16 pb-24 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <UserProfile 
            name={user?.name} 
            avatar={user?.picture} 
          />
        </div>
        
        <div className="md:col-span-2 bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Welcome, {user?.name || 'User'}!</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            You are now logged in to your protected dashboard. Here you can access your personal information and app features.
          </p>
          
          <div className="space-y-4">
            <Button
              className="w-full bg-neon-cyan hover:bg-neon-cyan/90"
              onClick={() => navigate('/')}
            >
              Go to Home
            </Button>
            <Button
              className="w-full bg-neon-purple hover:bg-neon-purple/90"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
