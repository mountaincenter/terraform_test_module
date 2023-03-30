import { CardHeader, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from 'boring-avatars';
import { formatDistance, format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { type Post, type User } from 'interfaces';

interface HeaderProps {
  post: Post;
  currentUser?: User;
}

const Header: React.FC<HeaderProps> = ({ post, currentUser }) => {
  return (
    <>
      <CardHeader
        avatar={
          <Link to='#'>
            <Avatar name={post.user.name} variant='beam' />
          </Link>
        }
        actions={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <>
            {post.user.id === currentUser?.id ? (
              <>{post.user.name}</>
            ) : (
              <Link style={{ textDecoration: 'none' }} to='#'>
                {post.user.name}
              </Link>
            )}
          </>
        }
        subheader={formatDistance(new Date(), Date.parse(post.createdAt), {
          locale: ja,
        })}
      />
    </>
  );
};
export default Header;
