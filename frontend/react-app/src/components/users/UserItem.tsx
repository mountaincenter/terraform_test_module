import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUser, addFollowUser, removeFollowUser } from 'lib/api/users';
import { type User, type Post } from 'interfaces';
import { getPosts } from 'lib/api/posts';
import PostItems from 'components/posts/PostItems';

import Message from './Message';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@mui/material';

import Avatar from 'boring-avatars';

const UserShow: React.FC = (): JSX.Element => {
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [followingsCount, setFollowingsCount] = useState<number>(0);
  const [followersCount, setFollowersCount] = useState<number>(0);
  const params = useParams<Record<string, string>>();
  const userId = parseInt(params.id ?? '');

  const handleGetPosts = async (): Promise<void> => {
    const { data } = await getPosts();
    setPosts(data.posts);
  };
  useEffect(() => {
    void handleGetPosts();
  }, []);

  const handleGetUser = async (): Promise<void> => {
    const { data } = await getUser(userId);
    console.log(data);
    setUser(data.user);
    setIsFollowed(data.user.followed);
    setFollowingsCount(data.user.followingsCount);
    setFollowersCount(data.user.followersCount);
  };
  useEffect(() => {
    void handleGetPosts();
  }, []);

  const handleAddFollow = (id: number): void => {
    addFollowUser(userId)
      .then(() => {
        setIsFollowed(true);
        setFollowersCount((prev) => prev + 1);
        void handleGetUser();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRemoveFollow = (id: number): void => {
    removeFollowUser(userId)
      .then(() => {
        setIsFollowed(false);
        setFollowersCount((prev) => prev - 1);
        void handleGetUser();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Card>
        <CardHeader
          avatar={<Avatar name={user?.name} variant='beam' />}
          title={user?.name}
          subheader={
            <p>
              フォロー数:{followingsCount} フォロワー数:{followersCount}
            </p>
          }
        />
        <CardContent>
          <Typography variant='body1' color='testSecondary' component='span'>
            <Button
              variant='contained'
              onClick={() => {
                isFollowed
                  ? handleRemoveFollow(userId)
                  : handleAddFollow(userId);
              }}
            >
              {isFollowed ? 'フォロー解除' : 'フォローしますか？'}
            </Button>
          </Typography>
          <PostItems
            posts={posts}
            handleGetPosts={() => handleGetPosts}
            userId={userId}
          ></PostItems>
        </CardContent>
      </Card>
      <Message userId={userId} />
    </>
  );
};

export default UserShow;
