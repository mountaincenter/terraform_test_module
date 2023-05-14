import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CommonLayout from 'components/layouts/CommonLayout';
import HealthHome from 'components/healths/Home';
import Home from 'components/pages/Home';
import SignIn from 'components/pages/SignIn';
import SignUp from 'components/pages/SignUp';
import UserHome from 'components/users/Home';
import UserShow from 'components/users/UserItem';
import PostList from 'components/posts/PostList';
import NotFound from 'components/pages/NotFound';

import { AuthContext, AuthProvider } from 'providers/AuthProvider';
import { SearchProvider } from 'providers/SearchProvider';

const Private: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const authContext = useContext(AuthContext);
  const { loading, isSignedIn } = authContext;
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

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SearchProvider>
          <CommonLayout>
            <Routes>
              <Route path='/' element={<Private>{<Home />}</Private>} />
              <Route
                path='/posts'
                element={<Private>{<PostList />}</Private>}
              />
              <Route
                path='/users'
                element={<Private>{<UserHome />}</Private>}
              />
              <Route
                path='/users/:id'
                element={<Private>{<UserShow />}</Private>}
              />
              <Route
                path='/bodies'
                element={
                  <Private>
                    <HealthHome />
                  </Private>
                }
              />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/*' element={<NotFound />} />
            </Routes>
          </CommonLayout>
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
