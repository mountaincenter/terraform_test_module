import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from 'lib/api/users';
import { type User } from 'interfaces';

interface PostContentProps {
  content: string;
  setQuery: (query: string) => void;
  handleGetPosts: (query: string) => void;
  handleUserMentionClick: (userId: number) => void;
}

const PostContent = ({
  content,
  setQuery,
  handleGetPosts,
  handleUserMentionClick,
}: PostContentProps): JSX.Element => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async (): Promise<void> => {
    try {
      const { data } = await getUsers();
      setUsers(data.users);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    void fetchUsers();
  }, []);

  const getUserIdByUsername = (username: string): number | null => {
    const user = users.find((user) => user.username === username);
    return user !== undefined ? user.id : null;
  };

  return (
    <>
      {content.split('\n').map((body, index) => {
        return body.split(' ').map((word, i) => {
          if (word.startsWith('#')) {
            return (
              <span
                key={i}
                style={{ color: 'blue', cursor: 'pointer' }}
                onClick={() => {
                  setQuery(word);
                  handleGetPosts(word);
                }}
              >
                {word}{' '}
              </span>
            );
          } else if (word.startsWith('@')) {
            const username = word;
            const userId = getUserIdByUsername(username);
            if (userId !== null) {
              return (
                <Link
                  key={i}
                  to={`/users/${userId}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <span
                    style={{ color: 'blue', cursor: 'pointer' }}
                    onClick={() => {
                      handleUserMentionClick(userId);
                    }}
                  >
                    {word}{' '}
                  </span>
                </Link>
              );
            } else {
              return <span key={i}>{word} </span>;
            }
          } else if (word.startsWith('https')) {
            return (
              <a key={i} href={word} target='_blank' rel='noopener noreferrer'>
                {word}{' '}
              </a>
            );
          } else {
            return <span key={i}>{word} </span>;
          }
        });
      })}
    </>
  );
};

export default PostContent;
