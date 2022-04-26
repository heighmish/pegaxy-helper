import { Link, useLocation } from "react-router-dom"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ToggleThemeButton from "./ToggleThemeButton";

const pages = [
  ['Home', '/pegaxy-helper'],
  ['Pega Lookup', '/pegaxy-helper/pega-lookup'],
  ['Account Lookup', '/pegaxy-helper/account-lookup'],
  ['Breed Helper', '/pegaxy-helper/breed-helper'],
]

const NavBar = ({ colourScheme, setColourScheme}) => {
  const location = useLocation();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <AppBar position="static" component={'nav'} sx={{ background: colourScheme ? '' : '#fff'}}>
      <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Tabs
            value={location.pathname}
            variant={smallScreen ? 'standard': 'fullWidth'}
            scrollButtons={false}
            >
              {pages.map(page => 
                <Tab 
                key={page}
                sx={{
                  textTransform: 'capitalize',
                  fontSize: '16px',
                  color: theme.palette.text.primary,
                  paddingInline: '8px',
                }}
                label={page[0]}
                value={`/${page[1]}`}
                component={Link}
                to={page[1]}
                />
              )}
            </Tabs>
            {useMediaQuery('(min-width: 420px)') && <ToggleThemeButton colourScheme={colourScheme} setColourScheme={setColourScheme}/>}
          </Box>
      </Container>
    </AppBar>
  );
}

export default NavBar;
