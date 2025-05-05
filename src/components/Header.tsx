
import React from "react";
import { useUser } from "@/context/UserContext";

const Header: React.FC = () => {
  const { userData } = useUser();

  return (
    <header className="fixed w-full top-0 z-10 holographic-bg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold heading-font bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-neon-purple">
              FixieRun
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center p-1.5 px-2.5 rounded-full bg-dark-card bg-opacity-70">
              <span className="text-neon-green mr-1.5 text-sm font-medium">
                {userData.tokenBalance.toFixed(2)}
              </span>
              <svg className="h-4 w-4 text-neon-green" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="h-8 w-8 bg-neon-cyan rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {userData.name.charAt(0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
