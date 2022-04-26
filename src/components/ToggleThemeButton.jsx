import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ToggleThemeButton = ({ colourScheme, setColourScheme }) => {
  return (
    <Tooltip title={colourScheme ? 'Light theme' : 'Dark theme'}>
      <IconButton
      aria-label="Toggle dark theme"
      onClick={() => setColourScheme(prev => !prev)}
      >
        {colourScheme ? <LightModeIcon />: <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}

export default ToggleThemeButton;
