import PostItem from './PostItem';
import { type Post } from 'interfaces';

interface PostItemsProps {
  posts: Post[];
  handleGetPosts: (query: string) => void;
  userId: number | null;
}

const PostItems = ({
  posts,
  handleGetPosts,
  userId,
}: PostItemsProps): JSX.Element => {
  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            handleGetPosts={(query) => {
              handleGetPosts(query);
            }}
            userId={userId}
          />
        ))
      ) : (
        <h4>No posts found...</h4>
      )}
    </>
  );
};

export default PostItems;
