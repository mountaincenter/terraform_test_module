import { useState, useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { getMessages } from 'lib/api/users';
import { type Messages } from 'interfaces';
import Avatar from 'boring-avatars';
import MessageForm from './MessageForm';

interface MessageProps {
  userId: number;
}

// const formWrapper = {
//   padding: '2px 4px',
//   display: 'flex',
//   alignItems: 'center',
//   width: 340,
// };
const Message = ({ userId }: MessageProps): JSX.Element => {
  const [messages, setMessages] = useState<Messages[]>([]);
  const handleGetMessages = async (id: number): Promise<void> => {
    const { data } = await getMessages(userId);
    console.log(data);
    setMessages(data.messages);
  };
  useEffect(() => {
    void handleGetMessages(userId);
  }, [userId]);
  console.log(messages);

  const iso8601ToDateTime = (iso8601: string): string => {
    const date = new Date(Date.parse(iso8601));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${year}年${month}月${day}日${hour}時${minute}分`;
  };
  return (
    <>
      {messages.map((message, index: number) => (
        <>
          <Grid
            key={index}
            container
            justifyContent={
              message.senderId === userId ? 'flex-start' : 'flex-end'
            }
          >
            <Grid item>
              {message.senderId === userId ? (
                <>
                  <Avatar name={message.sender.name} variant='beam' size={25} />
                  <small>{message.sender.name}</small>
                </>
              ) : (
                <></>
              )}
              <Box
                borderRadius={
                  message.senderId === userId
                    ? '30px 30px 30px 0px'
                    : '30px 30px 0px 30px'
                }
                bgcolor={message.senderId === userId ? '#d3d3d3' : '#ffb6c1'}
                color={message.senderId === userId ? '#000000' : '#ffffff'}
                m={1}
                border={0}
                style={{ padding: '1rem' }}
              >
                <Typography variant='body1' component='p'>
                  {message.body}
                </Typography>
              </Box>
              <Typography
                variant='body2'
                component='p'
                color='textSecondary'
                style={{
                  textAlign: message.senderId === userId ? 'left' : 'right',
                }}
              >
                {iso8601ToDateTime(
                  message.createdAt?.toString() ?? '100000000'
                )}
              </Typography>
            </Grid>
          </Grid>
        </>
      ))}
      <MessageForm
        userId={userId}
        handleGetMessages={() => handleGetMessages}
      />
    </>
  );
};

export default Message;
