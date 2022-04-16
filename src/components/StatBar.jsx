import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import SpeedIcon from '@mui/icons-material/Speed';
import StatIcon from './StatIcon';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BoltIcon from '@mui/icons-material/Bolt';
import AirIcon from '@mui/icons-material/Air';
import WaterIcon from '@mui/icons-material/Water';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import Typography from '@mui/material/Typography';
import { orange, green, blue, yellow, red } from '@mui/material/colors';

const StatBar = ({ speed, strength, lightning, wind, water, fire }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
            <StatIcon color={orange[500]} value={((speed/9)*100)} icon={<SpeedIcon/>}/>
            <StatIcon color={green[500]} value={((strength/9)*100)} icon={<FitnessCenterIcon/>}/>
            <StatIcon color={yellow[500]} value={((lightning/9)*100)} icon={<BoltIcon/>}/>
            <StatIcon color={'white'} value={((wind/9)*100)} icon={<AirIcon/>}/>
            <StatIcon color={blue[500]} value={((water/9)*100)} icon={<WaterIcon/>}/>
            <StatIcon color={red[500]} value={((fire/9)*100)} icon={<LocalFireDepartmentIcon/>}/>
        </Container>
        <Container sx = {{ position: 'relative', top: -15}}>
            <Typography sx={{ fontSize: 15 }} color="text.secondary">
                {speed} | {strength} | {lightning} | {wind} | {water} | {fire}
            </Typography>
        </Container>
    </Box>
    );
}

export default StatBar;