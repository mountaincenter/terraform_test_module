import React, { useContext } from 'react';
import { AuthContext } from 'App';
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
