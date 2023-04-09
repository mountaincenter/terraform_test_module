import React, { useState, useEffect } from 'react';
import { UserProps, Follow } from 'interfaces';
import { followUser, unfollowUser } from 'lib/api/users';
import Button from '@mui/material/Button';

interface Props {
  user: UserProps;
}

const FollowComponent: React.FC<Props> = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [follows, setFollows] = useState<Follow | null>(null);
  console.log(user);
  useEffect(() => {
    const fetchFollow = async () => {
      try {
        const response = await followUser(user.id);
        console.log(response);
        if (response.status === 200) {
          setFollows(response.data);
          setIsFollowing(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchFollow();
  }, []);

  const handleFollow = async () => {
    try {
      const response = await followUser(user.id);
      if (response.status === 200) {
        setFollows(response.data);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await unfollowUser(user.id);
      if (response.status === 200) {
        setFollows(null);
        setIsFollowing(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(isFollowing);
  return (
    <>
      {isFollowing ? (
        <Button variant='contained' onClick={handleUnfollow}>
          Unfollow
        </Button>
      ) : (
        <Button variant='contained' onClick={handleFollow}>
          Follow
        </Button>
      )}
    </>
  );
};

export default FollowComponent;
