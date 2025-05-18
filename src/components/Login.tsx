
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from './ui/use-toast';

interface LoginProps {
  email?: string;
  password?: string;
  onLogin?: () => void;
  onLogout?: () => void;
}

const Login: React.FC<LoginProps> = ({ email: initialEmail = '', password: initialPassword = '', onLogin, onLogout }) => {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const { loginWithRedirect, logout, isAuthenticated, isLoading, error } = useAuth0();
  const { toast } = useToast();

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Email and password are required",
        variant: "destructive",
      });
      return;
    }

    try {
      await loginWithRedirect({
        authorizationParams: {
          login_hint: email,
          screen_hint: 'login',
        },
      });
      if (onLogin) onLogin();
    } catch (error) {
      toast({
        title: "Login Error",
        description: "Failed to log in. Please try again.",
        variant: "destructive",
      });
      console.error('Login error:', error);
    }
  };

  const handleSocialLogin = async (connection: string) => {
    try {
      await loginWithRedirect({
        authorizationParams: {
          connection,
        },
      });
      if (onLogin) onLogin();
    } catch (error) {
      toast({
        title: "Login Error",
        description: `Failed to log in with ${connection}. Please try again.`,
        variant: "destructive",
      });
      console.error(`${connection} login error:`, error);
    }
  };

  const handleLogout = () => {
    logout({ 
      logoutParams: { 
        returnTo: window.location.origin 
      } 
    });
    if (onLogout) onLogout();
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[300px]">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
        {error.message}
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isAuthenticated ? 'You are logged in' : 'Log In to Your Account'}
      </h2>

      {!isAuthenticated ? (
        <>
          <div className="space-y-4 mb-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <Button 
              className="w-full bg-neon-cyan hover:bg-neon-cyan/90"
              onClick={handleLogin}
            >
              Log In
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-dark-surface"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-dark-card text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2"
              onClick={() => handleSocialLogin('google-oauth2')}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"
                />
              </svg>
              Google
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2"
              onClick={() => handleSocialLogin('facebook')}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0014.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"
                />
              </svg>
              Facebook
            </Button>
          </div>
        </>
      ) : (
        <Button
          className="w-full bg-neon-purple hover:bg-neon-purple/90"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      )}
    </div>
  );
};

export default Login;
