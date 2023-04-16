import { useState } from 'react';
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
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { type Post } from 'interfaces';

import { formatDistance } from 'date-fns';
import { ja } from 'date-fns/locale';

import { deletePost, addPostLike, removePostLike } from 'lib/api/posts';

import Comments from './Comments';

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
}

const PostItem = ({ post, handleGetPosts }: PostItemProps): JSX.Element => {
  const [isLiked, setIsLiked] = useState<boolean>(post.liked);
  const [likesCount, setLikesCount] = useState<number>(post.likesCount);
  const handleDeletePost = (id: number): void => {
    deletePost(id)
      .then(() => {
        handleGetPosts();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleAddLike = (id: number): void => {
    addPostLike(id)
      .then(() => {
        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
        handleGetPosts();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleRemoveLike = (id: number): void => {
    removePostLike(id)
      .then(() => {
        setIsLiked(false);
        setLikesCount((prev) => prev - 1);
        handleGetPosts();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <Card sx={{ ...CardStyles }}>
        <CardHeader
          avatar={<Avatar name={post.user.name} variant='beam' />}
          title={post.user.name}
          subheader={formatDistance(new Date(), Date.parse(post.createdAt), {
            locale: ja,
          })}
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='span'>
            {post.content.split('\n').map((body: string, index: number) => {
              return <p key={index}>{body}</p>;
            })}
          </Typography>
          <CarouselImage post={post} />
        </CardContent>
        <CardActions disableSpacing>
          <Comments post={post} />
          <IconButton
            sx={{ '&:hover': { color: 'pink' } }}
            onClick={() => {
              isLiked ? handleRemoveLike(post.id) : handleAddLike(post.id);
            }}
          >
            {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            <Typography
              variant='body2'
              color='textSecondary'
              component='span'
              sx={{ '&:hover': { color: 'pink' } }}
            >
              {likesCount}
            </Typography>
          </IconButton>
          <IconButton
            sx={{ marginLeft: 'auto' }}
            onClick={() => {
              handleDeletePost(post.id);
            }}
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
