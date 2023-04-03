import { CardHeader, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from 'boring-avatars';
import { formatDistance } from 'date-fns';
import { ja } from 'date-fns/locale';
import { type Post } from 'interfaces';
import { type AuthContextType } from 'App';

interface HeaderProps {
  post: Post;
  currentUser: AuthContextType['currentUser'];
}

const Header: React.FC<HeaderProps> = ({ post, currentUser }: HeaderProps) => {
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
            {currentUser?.id && post.user.id === currentUser.id ? (
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
