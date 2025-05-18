
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface UserProfileProps {
  name?: string;
  avatar?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name: propName, avatar: propAvatar }) => {
  const { user, isLoading } = useAuth0();
  
  const name = propName || user?.name || 'User';
  const avatar = propAvatar || user?.picture || '';

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[100px]">Loading profile...</div>;
  }

  return (
    <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 text-center">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-neon-cyan text-white text-lg">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h2 className="text-xl font-bold">{name}</h2>
          {user?.email && <p className="text-sm text-gray-500">{user.email}</p>}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
