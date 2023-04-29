import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import { type Comment, type Post } from 'interfaces';
import { getComments, createComment } from 'lib/api/posts';
import Avatar from 'boring-avatars';
import type { ListChildComponentProps } from 'react-window';
import { FixedSizeList } from 'react-window';
import { AuthContext } from 'App';
import CarouselImage from './CarouselImage';

interface CommentsProps {
  post: Post;
  // index: number;
  // style: React.CSSProperties;
}

const Comments = ({ post }: CommentsProps): JSX.Element => {
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [body, setBody] = useState<string>('');

  const handleGetComments = async (): Promise<void> => {
    try {
      const res = await getComments(post.id);
      // console.log(res);
      if (res.status === 200) {
        setComments(res.data.comments);
        setBody('');
      } else {
        console.log('No comments');
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    void handleGetComments();
  }, []);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    const data: any = {
      userId: currentUser?.id,
      postId: post.id,
      body,
    };
    try {
      const res = await createComment(post.id, data);
      if (res.status === 201) {
        setComments([...comments, res.data.comment]);
        setBody('');
      } else {
        console.log('No comments');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const CommentList = (): JSX.Element => {
    const renderRow = ({
      index,
      style,
    }: ListChildComponentProps): JSX.Element => {
      // const { index, style } = props;
      return (
        <ListItem key={index} style={style}>
          <ListItemAvatar>
            <Avatar size='40' name={comments[index].user.name} variant='beam' />
          </ListItemAvatar>
          <ListItemText
            primary={comments[index].user.name}
            secondary={comments[index].body}
          />
        </ListItem>
      );
    };
    return (
      <>
        <FixedSizeList
          height={500}
          width={400}
          itemCount={comments.length}
          itemSize={60}
        >
          {renderRow}
        </FixedSizeList>
      </>
    );
  };
  return (
    <>
      <IconButton
        onClick={() => {
          setOpen(true);
          void 0;
        }}
      >
        <CommentIcon color='action' fontSize='small' />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          void 0;
        }}
        maxWidth={'md'}
        scroll={'body'}
      >
        <DialogContent sx={{ padding: 0 }}>
          <Card sx={{ width: 900, height: 800, paddingTop: '2rem' }}>
            <Grid container alignItems='center'>
              <Grid item xs={6}>
                <CarouselImage post={post} />
              </Grid>
              <Grid item xs={6}>
                <CardHeader
                  avatar={<Avatar name={post.user.name} variant='beam' />}
                  action={
                    <IconButton aria-label='settings'>
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={post.user.name}
                  subheader={post.content}
                />
                <Divider />
                <CardContent>
                  <CommentList />
                </CardContent>
                <CardActions></CardActions>
                <Divider />
                <CardContent>
                  <form action=''>
                    <Grid container>
                      <Grid item xs={10}>
                        <TextField
                          fullWidth
                          label='コメントを入力'
                          name='body'
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setBody(e.target.value);
                            void 0;
                          }}
                          size='small'
                          variant='standard'
                          value={body}
                          sx={{ padding: 0, width: '100%' }}
                        />
                        <Grid item xs={2}>
                          <Button
                            variant='contained'
                            color='primary'
                            disabled={body === ''}
                            sx={{ marginLeft: '0.5rem' }}
                            onClick={(e) => {
                              void handleSubmit(e);
                            }}
                          >
                            <SendIcon />
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Comments;
