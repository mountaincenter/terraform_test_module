import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { CardMedia } from '@mui/material';
import { type Post } from 'interfaces';

interface PostItemProps {
  post: Post;
}

const CarouselImage: React.FC<PostItemProps> = ({ post }: PostItemProps) => {
  return (
    <>
      {post.images.length > 0 ? (
        <Carousel autoPlay={false}>
          {post.images.map((image, index) => {
            return (
              <CardMedia
                key={index}
                component='img'
                src={image.url}
                alt='post image'
              />
            );
          })}
        </Carousel>
      ) : (
        <></>
      )}
    </>
  );
};

export default CarouselImage;
