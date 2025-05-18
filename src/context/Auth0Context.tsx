
import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth0, Auth0ContextInterface, AppState } from '@auth0/auth0-react';

interface Auth0ProviderProps {
  children: ReactNode;
}

const Auth0Context = createContext<Auth0ContextInterface<AppState> | null>(null);

export const useAuth0Context = () => {
  const context = useContext(Auth0Context);
  if (!context) {
    throw new Error('useAuth0Context must be used within an Auth0Provider');
  }
  return context;
};

export const Auth0ContextProvider: React.FC<Auth0ProviderProps> = ({ children }) => {
  const auth0 = useAuth0();
  
  return (
    <Auth0Context.Provider value={auth0}>
      {children}
    </Auth0Context.Provider>
  );
};
