import React, { useEffect, useState, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CommonLayout from 'components/layouts/CommonLayout';
import { User } from 'interfaces';
import Home from 'components/pages/Home';
import SignIn from 'components/pages/SignIn';
import SignUp from 'components/pages/SignUp';

import { getCurrentUser } from 'lib/api/auth';

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

const App: React.FC = () => {
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
  const Private: React.FC<{ children: React.ReactElement }> = ({
    children,
  }) => {
    if (!loading) {
      if (isSignedIn) {
        return <>{children}</>;
      } else {
        return <Navigate to='/signin' />;
      }
    } else {
      return <></>;
    }
  };
  console.log(currentUser);
  console.log(currentUser?.id);
  console.log(currentUser?.name);
  return (
    <>
      <BrowserRouter>
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
          <CommonLayout>
            <Routes>
              <Route path='/' element={<Private>{<Home />}</Private>} />
              {/* <Route path='/' element={<Home />} /> */}
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
            </Routes>
          </CommonLayout>
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
