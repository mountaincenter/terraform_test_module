import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'boring-avatars';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Divider,
  Typography,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import { type Post } from 'interfaces';

import { formatDistance } from 'date-fns';
import { ja } from 'date-fns/locale';

import { deletePost } from 'lib/api/posts';

import Comments from './Comments';
import Like from 'components/likes/Like';
import { AuthContext } from 'App';

import CarouselImage from './CarouselImage';

const CardStyles = {
  width: 400,
  marginTop: '2rem',
  transition: 'all 0.3s',
  '&:hover': {
    boxShadow:
      '1px 0px 20px -1px rgba(0,0,0,0.2), 0px 0px 20px 5px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    transform: 'translateY(-3px)',
  },
};

interface PostItemProps {
  post: Post;
  handleGetPosts: () => void;
  userId: number | null;
}

const customStyle = {
  textDecoration: 'none',
  color: 'inherit',
};

const PostItem = ({
  post,
  handleGetPosts,
  userId,
}: PostItemProps): JSX.Element => {
  const { currentUser } = useContext(AuthContext);
  const handleDeletePost = (id: number): void => {
    deletePost(id)
      .then(() => {
        handleGetPosts();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      {userId === null || userId === post.user.id ? (
        <>
          <Card sx={{ ...CardStyles }}>
            <Link to={`/users/${post.user.id}`} style={customStyle}>
              <CardHeader
                avatar={<Avatar name={post.user.name} variant='beam' />}
                title={post.user.name}
                subheader={formatDistance(
                  new Date(),
                  Date.parse(post.createdAt),
                  {
                    locale: ja,
                  }
                )}
              />
            </Link>
            <CardContent>
              <Typography
                variant='body2'
                color='textSecondary'
                component='span'
              >
                {post.content.split('\n').map((body: string, index: number) => {
                  return <p key={index}>{body}</p>;
                })}
              </Typography>
              <CarouselImage post={post} />
            </CardContent>
            <CardActions disableSpacing>
              <Comments post={post} />
              <Like post={post} />
              {currentUser?.id === post.user.id ? (
                <IconButton
                  sx={{ marginLeft: 'auto' }}
                  onClick={() => {
                    handleDeletePost(post.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              ) : (
                <></>
              )}
            </CardActions>
          </Card>
          <Divider />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default PostItem;
