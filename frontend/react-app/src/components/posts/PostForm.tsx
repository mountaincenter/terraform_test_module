import React, { useState, useCallback, useContext } from 'react';
import { TextField, Button, Box, CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CancelIcon from '@mui/icons-material/Cancel';

import { createPost } from '../../lib/api/posts';

import { AuthContext } from 'App';

const borderStyles = {
  bgcolor: 'background.paper',
  border: 1,
};

interface PostFormProps {
  handleGetPosts: Function;
}

const PostForm = ({ handleGetPosts }: PostFormProps) => {
  const { currentUser } = useContext(AuthContext);
  const [content, setContent] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [isContentSending, setIsContentSending] = useState(false);

  const createFormData = (): FormData => {
    const formData = new FormData();
    if (images)
      images.map((image) => {
        formData.append('images[]', image);
      });
    formData.append('content', content);
    formData.append('user.id', `${currentUser?.id}`);
    return formData;
  };

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsContentSending(true);

    const data = createFormData();
    await createPost(data).then(() => {
      setContent('');
      setImages([]);
      handleGetPosts();
    });

    setIsContentSending(false);
  };

  const uploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages([...images, ...e.target.files]);
  }, []);

  const handleOnRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <>
      <form action='' onSubmit={handleCreatePost}>
        <TextField
          name='content'
          placeholder='Hello World'
          variant='outlined'
          multiline
          minRows={4}
          maxRows={20}
          value={content}
          disabled={isContentSending}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setContent(e.target.value);
          }}
        />
        <div style={{ marginTop: '10px' }}>
          <input
            style={{ display: 'none' }}
            accept='image/*'
            id='icon-button-file'
            type='file'
            multiple
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              uploadImage(e)
            }
          />
          <label htmlFor='icon-button-file'>
            <IconButton color='inherit' component='span'>
              <PhotoCameraIcon />
            </IconButton>
          </label>
        </div>
        {isContentSending ? (
          <CircularProgress />
        ) : (
          <div style={{ marginTop: '10px', marginLeft: 'auto' }}>
            <Button
              type='submit'
              variant='contained'
              size='large'
              color='inherit'
              disabled={!content || content.length > 140}
              sx={{ marginTop: '10px', marginLeft: 'auto' }}
            >
              Post
            </Button>
          </div>
        )}
      </form>
      {images.map((image, i) => (
        <Box
          key={i}
          sx={{
            ...borderStyles,
            borderRadius: 1,
            borderColor: 'grey.400',
            width: 320,
            margin: '2rem 0 4rem',
          }}
        >
          <IconButton color='inherit' onClick={() => handleOnRemoveImage(i)}>
            <CancelIcon />
          </IconButton>
          <img
            src={URL.createObjectURL(image)}
            alt='preview img'
            style={{ width: '100%' }}
          />
        </Box>
      ))}
    </>
  );
};

export default PostForm;
