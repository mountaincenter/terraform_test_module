import React from 'react';
import { type Post } from 'interfaces';
import { Card, CardContent, Typography, Link, Box } from '@mui/material';

const OGPDisplay = ({ ogp }: { ogp: Post }): JSX.Element => {
  const { ogpTitle, ogpImage, ogpDescription, ogpUrl } = ogp;

  return (
    <Card variant='outlined'>
      <CardContent>
        <Typography variant='h6' component='div'>
          {ogpTitle}
        </Typography>
        <Box display='flex' alignItems='center' mt={1}>
          <img
            src={ogpImage}
            alt={ogpTitle}
            style={{ width: '100%', maxWidth: '100%', marginRight: '1rem' }}
          />
          <Typography variant='body2' color='textSecondary' component='div'>
            {ogpDescription}
          </Typography>
        </Box>
        <Link href={ogpUrl} target='_blank' rel='noopener noreferrer'>
          {ogpUrl}
        </Link>
      </CardContent>
    </Card>
  );
};

export default OGPDisplay;
