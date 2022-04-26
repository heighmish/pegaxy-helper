import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const HomeCard = ({ title, description, linkHref }) => {
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
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button component={Link} to={linkHref}>{title}</Button>
      </CardActions>
    </Card>
  );
}

export default HomeCard;