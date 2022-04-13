import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function StatIcon({ icon, color, value }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ m: 1, position: 'relative' }}>
        {icon}
        <CircularProgress
            variant='determinate'
            value={value}
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
    </Box>
  );
}