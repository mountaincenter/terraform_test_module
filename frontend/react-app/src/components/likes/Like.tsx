import { useState } from 'react';
import { type Post } from 'interfaces';
import { addPostLike, removePostLike } from 'lib/api/posts';
import { IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface LikeProps {
  post: Post;
}

const Like = ({ post }: LikeProps): JSX.Element => {
  const [isLiked, setIsLiked] = useState<boolean>(post.liked);
  const [likesCount, setLikesCount] = useState<number>(post.likesCount);
  const handleAddLike = (id: number): void => {
    addPostLike(id)
      .then(() => {
        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
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
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <IconButton
        sx={{ '&:hover': { color: 'pink' } }}
        onClick={() => {
          isLiked ? handleRemoveLike(post.id) : handleAddLike(post.id);
        }}
      >
        {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        <Typography
          variant='body2'
          color='textsecondary'
          component='span'
          sx={{ '&:hover': { color: 'pink' } }}
        >
          {likesCount}
        </Typography>
      </IconButton>
    </>
  );
};

export default Like;
