import { useParams } from 'react-router-dom';

const Hashtag = (): JSX.Element => {
  const hashName = useParams();
  console.log(hashName);

  return (
    <>
      <h1>Hashtag</h1>
      <p>{hashName.name}</p>
    </>
  );
};

export default Hashtag;
