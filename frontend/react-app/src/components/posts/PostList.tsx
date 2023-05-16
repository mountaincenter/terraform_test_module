import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import PostForm from './PostForm';
// import DjsPostForm from './DjsPostForm';
import PostItems from './PostItems';
import PostSearch from './PostSearch';
import { getPosts } from 'lib/api/posts';
import { type Post } from 'interfaces';

const PostList: React.FC = (): JSX.Element => {
  const [posts, setPosts] = useState<Post[]>([]);
  const handleGetPosts = async (query?: string): Promise<void> => {
    const { data } = await getPosts(query);
    setPosts(data.posts);
    console.log(data.posts);
  };
  useEffect(() => {
    void handleGetPosts();
  }, []);

  return (
    <>
      <Container maxWidth='xl' sx={{ marginTop: '3rem' }}>
        <Grid container direction='row' justifyContent='center' spacing={0.5}>
          <Grid item>
            <PostForm handleGetPosts={() => handleGetPosts} />
            <PostSearch
              handleGetPosts={(query) => {
                void handleGetPosts(query);
              }}
            />
            <PostItems
              posts={posts}
              handleGetPosts={(query) => {
                void handleGetPosts(query);
              }}
              userId={null}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PostList;
