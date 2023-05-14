import React, { useContext } from 'react';
import { AuthContext } from 'providers/AuthProvider';
// import HealthHome from 'components/healths/Home';
import PostList from 'components/posts/PostList';

const Home: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext);
  return (
    <>
      {isSignedIn && currentUser != null ? (
        <>
          <PostList />
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
