import React, { useContext } from 'react';
import { AuthContext } from 'App';
import HealthHome from 'components/healths/Home';

const Home: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext);
  return (
    <>
      {isSignedIn && currentUser != null ? (
        <>
          <HealthHome />
        </>
      ) : (
        <>
          <h1>Not signed in</h1>
        </>
      )}
    </>
  );
};

export default Home;
