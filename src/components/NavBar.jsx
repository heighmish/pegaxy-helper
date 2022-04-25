import { Link } from "react-router-dom"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

const NavBar = () => {
    return (
      <AppBar position="static">
            <Toolbar disableGutters>
                <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ m: 2, display: { xs: 'none', md: 'flex' } }}>
                LOGO
                </Typography>
                <MenuItem component={Link} to={"pega-lookup"}>
                    <Typography textAlign="center" sx={{ my: 2, color: 'white', display: 'block' }}>Pega Lookup</Typography> 
                </MenuItem>
                <MenuItem component={Link} to={"account-lookup"}>
                    <Typography textAlign="center" sx={{ my: 2, color: 'white', display: 'block' }}>Account Lookup</Typography> 
                </MenuItem>
                <MenuItem component={Link} to={"breed-helper"}>
                    <Typography textAlign="center" sx={{ my: 2, color: 'white', display: 'block' }}>Breed Helper</Typography> 
                </MenuItem>
            </Toolbar>
      </AppBar>
    );
}

export default NavBar;
