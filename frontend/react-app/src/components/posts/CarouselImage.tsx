import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { CardMedia } from '@mui/material';
import { Image, type Post } from 'interfaces';
import Default from 'public/images/empty.jpeg';

interface PostItemProps {
  post: Post;
}

const CarouselImage = ({ post }: PostItemProps) => {
  return (
    <>
      {post.images.length > 0 ? (
        <Carousel autoPlay={false}>
          {post.images.map((image, index) => {
            return (
              <CardMedia component='img' src={image.url} alt='post image' />
            );
          })}
        </Carousel>
      ) : (
        <>
          <CardMedia component='img' src={Default} alt='default' />
        </>
      )}
    </>
  );
};

export default CarouselImage;
