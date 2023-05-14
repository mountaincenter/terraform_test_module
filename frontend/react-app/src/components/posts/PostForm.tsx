import React, { useState, useCallback, useContext } from 'react';
import { TextField, Box, CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { createPost } from '../../lib/api/posts';
import { type User } from 'interfaces';
import { AuthContext } from 'providers/AuthProvider';

const borderStyles = {
  bgcolor: 'background.paper',
  border: 1,
};

interface PostFormProps {
  handleGetPosts: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ handleGetPosts }) => {
  const { currentUser } = useContext(AuthContext) as { currentUser: User };
  const [content, setContent] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [isContentSending, setIsContentSending] = useState<boolean>(false);

  const createFormData = (): FormData => {
    const formData = new FormData();
    if (images != null) {
      images.forEach((image) => {
        formData.append('images[]', image);
      });
    }
    formData.append('content', content);
    formData.append('user.id', `${currentUser.id}`);
    return formData;
  };

  const handleCreatePost = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
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

  const uploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files == null) return;
      setImages([...images, ...Array.from(e.target.files)]);
    },
    [images]
  );

  const handleOnRemoveImage = (index: number): void => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          void handleCreatePost(e);
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem',
          }}
        >
          <TextField
            name='content'
            placeholder='Hello World'
            variant='standard'
            style={{
              paddingLeft: '1rem',
              flexGrow: 1,
            }}
            multiline
            minRows={1}
            maxRows={5}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                uploadImage(e);
              }}
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
            // <div style={{ marginTop: '10px', marginLeft: 'auto' }}>
            //   <Button
            //     type='submit'
            //     variant='contained'
            //     size='large'
            //     color='inherit'
            //     disabled={content === '' || content.length > 140}
            //     sx={{ marginTop: '10px', marginLeft: 'auto' }}
            //   >
            //     Post
            //   </Button>
            // </div>
            <div style={{ marginTop: '10px' }}>
              <IconButton
                type='submit'
                color='inherit'
                disabled={content === '' || content.length > 140}
              >
                <AddCircleIcon />
              </IconButton>
            </div>
          )}
        </div>
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
          <IconButton
            color='inherit'
            onClick={() => {
              handleOnRemoveImage(i);
            }}
          >
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
