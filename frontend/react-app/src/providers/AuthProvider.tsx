import React, { useState, useEffect, createContext } from 'react';
import { getCurrentUser } from 'lib/api/auth';
import { type User } from 'interfaces';

export interface AuthContextType {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: User | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const AuthContext = createContext<AuthContextType>({
  loading: true,
  setLoading: () => {},
  isSignedIn: false,
  setIsSignedIn: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const handleGetCurrentUser = async (): Promise<void> => {
    try {
      const res = await getCurrentUser();
      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
      } else {
        console.log('No current user');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
    return undefined;
  };

  useEffect(() => {
    handleGetCurrentUser().catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
