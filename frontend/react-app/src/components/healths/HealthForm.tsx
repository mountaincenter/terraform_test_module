import { type User } from 'interfaces';
import { TextField, Button } from '@mui/material';
import { createHealths } from 'lib/api/healths';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface HealthFormProps {
  currentUser: User;
  handleGetHealths: () => void;
}

const HealthForm = ({
  currentUser,
  handleGetHealths,
}: HealthFormProps): JSX.Element => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit: SubmitHandler<Record<string, any>> = async (data) => {
    const formData = new FormData();
    formData.append('weight', data.weight);
    formData.append('bodyFatPercent', data.bodyFatPercent);
    formData.append('user.id', `${currentUser?.id ?? ''}`);
    await createHealths(currentUser.id, formData);
    reset();
    handleGetHealths();
  };

  return (
    <>
      <p>Health Form</p>
      <p>{currentUser.name}</p>
      <form onSubmit={() => handleSubmit(onSubmit)}>
        <TextField
          name='weight'
          placeholder='80.0'
          variant='standard'
          inputRef={register}
        />
        <TextField
          name='bodyFatPercent'
          placeholder='25.0'
          variant='standard'
          inputRef={register}
        />
        <Button type='submit' variant='contained' color='inherit'>
          投稿
        </Button>
      </form>
    </>
  );
};

export default HealthForm;
