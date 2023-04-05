import React, { useContext } from 'react';
import { AuthContext } from 'App';
import PostList from 'components/posts/PostList';

const Home: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext);
  console.log(currentUser);
  console.log(isSignedIn);
  return (
    <>
      {isSignedIn && currentUser != null ? (
        <>
          <h1>Home</h1>
          <h2>メールアドレス: {currentUser?.email}</h2>
          <h2>名前: {currentUser?.name}</h2>
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
