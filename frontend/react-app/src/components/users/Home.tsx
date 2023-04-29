import React, { useState, useContext } from 'react';
import Avatar from 'boring-avatars';
import {
  Button,
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { AuthContext } from 'App';
import { updateUser } from 'lib/api/users';

import UsersList from 'components/users/UsersList';

const UserHome: React.FC = () => {
  const { isSignedIn, currentUser, setCurrentUser } = useContext(AuthContext);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [name, setName] = useState<string | undefined>(currentUser?.name);
  const [profile, setProfile] = useState<string | undefined>(
    currentUser?.profile
  );

  const createFormData = (): any => {
    const formData = new FormData();
    formData.append('name', name ?? '');
    formData.append('profile', profile ?? '');
    return formData;
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    const data = createFormData();
    try {
      const res = await updateUser(currentUser?.id, data);
      console.log(res);
      if (res.status === 200) {
        setEditFormOpen(false);
        setCurrentUser(res.data.user);
        console.log('Update user successfully!');
      } else {
        console.log(res.data.message);
      }
    } catch (err) {
      console.log(err);
      console.log('Failed in updating user!');
    }
  };

  return (
    <>
      <Container maxWidth='xl' sx={{ marginTop: '3rem' }}>
        <Grid container direction='row' justifyContent='center'>
          <Grid item>
            {isSignedIn && currentUser != null ? (
              <>
                <Card sx={{ width: 320 }}>
                  <CardHeader
                    avatar={<Avatar name={currentUser.name} variant='beam' />}
                    title={currentUser.name}
                    subheader={
                      <>
                        <small>0 followers | 0 following | 0 posts</small>
                      </>
                    }
                    action={
                      <IconButton
                        onClick={() => {
                          setEditFormOpen(true);
                          void 0;
                        }}
                      >
                        <SettingsIcon color='action' fontSize='small' />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    <Typography variant='body2' color='text.secondary'>
                      {currentUser.profile}
                    </Typography>
                  </CardContent>
                </Card>
                <UsersList />
              </>
            ) : (
              <h1>Not signed in</h1>
            )}
          </Grid>
        </Grid>
      </Container>
      <form noValidate autoComplete=''>
        <Dialog
          open={editFormOpen}
          keepMounted
          onClose={() => {
            setEditFormOpen(false);
            void 0;
          }}
        >
          <DialogTitle style={{ textAlign: 'center' }}>
            プロフィールの変更
          </DialogTitle>
          <DialogContent>
            <TextField
              variant='outlined'
              required
              fullWidth
              label='名前'
              value={name}
              margin='dense'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
                void 0;
              }}
            />
            <TextField
              placeholder='プロフィールを入力してください'
              variant='outlined'
              multiline
              rows={4}
              fullWidth
              label='プロフィール'
              value={profile}
              margin='dense'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setProfile(e.target.value);
                void 0;
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={(e) => {
                void handleSubmit(e);
              }}
              disabled={
                name === '' ||
                profile === undefined ||
                profile === null ||
                profile.length > 160
              }
              color='inherit'
              variant='contained'
              fullWidth
            >
              送信
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </>
  );
};
export default UserHome;
