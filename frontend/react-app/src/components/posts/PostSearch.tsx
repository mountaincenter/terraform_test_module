import { useContext } from 'react';
import { SearchContext } from 'providers/SearchProvider';
import { InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface PostSearchProps {
  handleGetPosts: (query: string) => void;
}

const PostSearch: React.FC<PostSearchProps> = ({
  handleGetPosts,
}): JSX.Element => {
  const { query, setQuery } = useContext(SearchContext);

  const clearQuery = (): void => {
    setQuery('');
    handleGetPosts('');
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
        }}
      >
        <InputBase
          style={{
            paddingLeft: '1rem',
            flexGrow: 1,
            border: '1px solid #ddd',
            borderRadius: '5px',
          }}
          placeholder='Search…'
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <IconButton
          onClick={() => {
            handleGetPosts(query);
          }}
        >
          <SearchIcon />
        </IconButton>
        {query !== '' && (
          <IconButton onClick={clearQuery}>
            <ClearIcon />
          </IconButton>
        )}
      </div>
    </>
  );
};

export default PostSearch;
