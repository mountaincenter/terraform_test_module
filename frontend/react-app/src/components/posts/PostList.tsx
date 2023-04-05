import React, { useEffect } from 'react';
import { Container, Grid } from '@mui/material';

import PostForm from './PostForm';
import PostItem from './PostItem';
import { getPosts } from 'lib/api/posts';
import { type Post } from 'interfaces';

const PostList: React.FC = (): JSX.Element => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const handleGetPosts = async (): Promise<void> => {
    const { data } = await getPosts();
    setPosts(data.posts);
    // console.log(data.posts);
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
            {posts?.map((post: Post) => {
              return (
                <PostItem
                  key={post.id}
                  post={post}
                  handleGetPosts={() => handleGetPosts}
                />
              );
            })}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PostList;
