import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';

export default function StatIcon({ icon, color, value }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '5px' }}>
        <Box sx={{ m: 1, position: 'relative' }}>
        {icon}
        <CircularProgress
            variant='determinate'
            value={((value/9)*100)}
            size={35}
            sx={{
                color: {color},
                position: 'absolute',
                top: -4,
                left: -5,
                zIndex: 1,
            }}
            />
        </Box>
        <Typography sx={{ fontSize: 15 }} color="text.secondary">
                {value}
        </Typography>
    </Box>
  );
}