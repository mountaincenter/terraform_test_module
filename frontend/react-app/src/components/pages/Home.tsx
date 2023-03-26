import React, { useContext } from 'react';
import { AuthContext } from 'App';

const Home: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext);
  return (
    <>
      {isSignedIn && currentUser != null ? (
        <>
          <h1>Home</h1>
          <h2>メールアドレス: {currentUser?.email}</h2>
          <h2>名前: {currentUser?.name}</h2>
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
