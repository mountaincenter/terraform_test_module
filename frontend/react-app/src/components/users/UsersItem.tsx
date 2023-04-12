import { Link } from 'react-router-dom';
import Avatar from 'boring-avatars';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import { type UserProps } from 'interfaces';

interface UserItemProps {
  user: UserProps;
}

const customStyle = {
  textDecoration: 'none',
  color: 'inherit',
};

const UsersItem = ({ user }: UserItemProps): JSX.Element => {
  return (
    <>
      <Card sx={{ width: 400, marginTop: '2rem' }}>
        <CardHeader
          avatar={
            <Link to={`/users/${user.id}`} style={customStyle}>
              <Avatar name={user.name} variant='beam' />
            </Link>
          }
          title={
            <Link to={`/users/${user.id}`} style={customStyle}>
              {user.name}
            </Link>
          }
          subheader={
            <>
              <small>
                {user.followersCount} フォロー | {user.followingsCount}{' '}
                フォロワー
              </small>
            </>
          }
        />
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            {user.profile}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default UsersItem;
