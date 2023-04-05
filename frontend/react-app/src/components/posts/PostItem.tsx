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
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { type Post } from 'interfaces';

import { formatDistance } from 'date-fns';
import { ja } from 'date-fns/locale';

import { deletePost } from 'lib/api/posts';

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
  const handleDeletePost = (id: string): void => {
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
      <Card sx={{ ...CardStyles }}>
        <CardHeader
          avatar={<Avatar name={post.user.name} variant='beam' />}
          actions={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
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
