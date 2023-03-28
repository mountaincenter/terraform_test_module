import { useContext } from 'react';

import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Divider,
  Typography,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import { AuthContext } from 'App';

import { Post } from 'interfaces';

import { deletePost } from 'lib/api/posts';

const CardStyles = {
  width: 400,
  marginTop: '2rem',
  trantision: 'all 0.3s',
  '&:hover': {
    boxShadow:
      '1px 0px 20px -1px rgba(0,0,0,0.2), 0px 0px 20px 5px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    transform: 'translateY(-3px)',
  },
};

interface PostItemProps {
  post: Post;
  handleGetPosts: Function;
}

const PostItem = ({ post, handleGetPosts }: PostItemProps) => {
  const { currentUser } = useContext(AuthContext);

  const handleDeletePost = async (id: string) => {
    await deletePost(id).then(() => {
      handleGetPosts();
    });
  };

  return (
    <>
      <Card sx={{ ...CardStyles }}>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='span'>
            {post.content.split('\n').map((body: string, index: number) => {
              return <p key={index}>{body}</p>;
            })}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            sx={{ marginLeft: 'auto' }}
            onClick={() => handleDeletePost(post.id)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
      <Divider />
    </>
  );
};

export default PostItem;
