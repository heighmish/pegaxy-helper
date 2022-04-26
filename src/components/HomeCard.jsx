import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const HomeCard = ({ title, description,  linkHref, linkName }) => {
  return (
    <Card sx={{ minWidth: 285 }}>
      <CardContent>
        <Typography variant="h5" component="h5">
          {title}
        </Typography>
        <Typography variant="body2">
         {description}
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}

export default HomeCard;