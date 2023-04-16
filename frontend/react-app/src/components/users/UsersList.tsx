import { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import { getUsers } from 'lib/api/users';
import { type UserProps } from 'interfaces';

import UsersItem from './UsersItem';

const UsersList: React.FC = (): JSX.Element => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const handleGetUsers = async (): Promise<void> => {
    const { data } = await getUsers();
    setUsers(data.users);
  };
  useEffect(() => {
    void handleGetUsers();
  }, []);
  return (
    <>
      <Container maxWidth='xl' sx={{ marginTop: '3rem' }}>
        <Grid container direction='row' justifyContent='center' spacing={0.5}>
          <Grid item>
            {users.length > 0 ? (
              users.map((user) => <UsersItem key={user.id} user={user} />)
            ) : (
              <h4>No Users found...</h4>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default UsersList;
