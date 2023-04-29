import { useContext, useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { createMessage } from 'lib/api/users';
import { AuthContext } from 'App';
import PropTypes from 'prop-types';

interface MessageFormProps {
  userId: number;
  handleGetMessages: (id: number) => void;
}

const MessageForm: React.FC<MessageFormProps> = ({
  userId,
  handleGetMessages,
}) => {
  const { currentUser } = useContext(AuthContext);
  const [body, setBody] = useState<string>('');
  const [isBodySending, setIsBodySending] = useState<boolean>(false);

  const createFormData = (): FormData => {
    const formData = new FormData();
    formData.append('body', body);
    formData.append('recipient_id', `${userId ?? ''}`);
    formData.append('sender_id', `${currentUser?.id ?? ''}`);
    return formData;
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    e.preventDefault();
    setIsBodySending(true);
    const data = createFormData();
    try {
      await createMessage(userId, data).then(() => {
        setBody('');
        handleGetMessages(userId);
      });
      setIsBodySending(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsBodySending(false);
    }
  };

  const formWrapper = {
    display: 'flex',
    padding: '2px 4px',
    alignItems: 'center',
    width: 340,
  };

  return (
    <>
      <Grid container justifyContent='center' style={{ marginTop: '2rem' }}>
        <form style={{ ...formWrapper }}>
          <TextField
            required
            multiline
            sx={{ width: '100%' }}
            value={body}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setBody(e.target.value);
            }}
          />
          <Button
            variant='contained'
            color='primary'
            sx={{ marginLeft: '0.5rem' }}
            disabled={body === '' || isBodySending}
            onClick={(e) => {
              void handleSubmit(e);
            }}
          >
            <SendIcon />
          </Button>
        </form>
      </Grid>
    </>
  );
};

MessageForm.propTypes = {
  userId: PropTypes.number.isRequired,
  handleGetMessages: PropTypes.func.isRequired,
};

export default MessageForm;