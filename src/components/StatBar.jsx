import React from 'react';
import Box from '@mui/material/Box';
import SpeedIcon from '@mui/icons-material/Speed';
import StatIcon from './StatIcon';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BoltIcon from '@mui/icons-material/Bolt';
import AirIcon from '@mui/icons-material/Air';
import WaterIcon from '@mui/icons-material/Water';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { orange, green, blue, yellow, red } from '@mui/material/colors';

const StatBar = ({ speed, strength, lightning, wind, water, fire, pos }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={[{ display: 'flex', flexDirection: 'row', flex: 1, paddingInline: 'none'}, pos]}>
                <StatIcon color={orange[500]} value={speed} icon={<SpeedIcon/>}/>
                <StatIcon color={green[500]} value={strength} icon={<FitnessCenterIcon/>}/>
                <StatIcon color={yellow[500]} value={lightning} icon={<BoltIcon/>}/>
                <StatIcon color={'lightgrey'} value={wind} icon={<AirIcon/>}/>
                <StatIcon color={blue[500]} value={water} icon={<WaterIcon/>}/>
                <StatIcon color={red[500]} value={fire} icon={<LocalFireDepartmentIcon/>}/>
            </Box>
    </Box>
    );
}

export default StatBar;