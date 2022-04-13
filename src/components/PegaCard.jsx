import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SpeedIcon from '@mui/icons-material/Speed';
import StatIcon from './StatIcon';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BoltIcon from '@mui/icons-material/Bolt';
import AirIcon from '@mui/icons-material/Air';
import WaterIcon from '@mui/icons-material/Water';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { orange, green, blue, yellow, red } from '@mui/material/colors';

const PegaCard = ({id, bloodLine, name, breedCount, breedType, energy, canBreedAt, canRaceAt, gender, winRate, gold, silver, bronze, totalRaces, motherId, fatherId, predictedVis, speed, strength, lightning, wind, water, fire}) => {
    const [avgVis, setAvgVis] = useState(0);
    useEffect(() => {
        const val = (gold/totalRaces) * 105 + (silver/totalRaces) * 44 + (bronze/totalRaces)* 26;
        setAvgVis(Number(val));
    }, [bronze, gold, silver, totalRaces])
    return (
        <Card>
            <CardContent>
                <Box sx= {{ display: 'flex', justifyContent: 'space-between'}}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    {`#${id}`}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    {`Breedcount: ${breedCount}/7`}
                </Typography>
                </Box>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
            <   Box sx= {{ display: 'flex', justifyContent: 'space-between'}}>
                    <Typography sx={{ fontSize: 16, mb: 1 }} color="text.secondary">
                        {breedType} | {bloodLine} | {gender}
                    </Typography>
                    <Typography sx={{ fontSize: 15}} color="text.secondary">
                        {`Energy: ${energy}/25`}
                    </Typography>
                </Box>
                <Box sx= {{ display: 'flex', justifyContent: 'space-between'}}>
                    <Box sx= {{ display: 'flex', gap: '10px'}}>
                        <Box sx= {{ display: 'flex', flexDirection: 'column', gap: '2.5px'}}>
                            <Typography sx={{ fontSize: 14 }} color="text.primary">
                                {`Winrate: ${(winRate*100).toFixed(0)}%`}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {`Gold: ${((gold/totalRaces)*100).toFixed(0)}%`}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {`Silver: ${((silver/totalRaces)*100).toFixed(0)}%`}
                            </Typography><Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {`Bronze: ${((bronze/totalRaces)*100).toFixed(0)}%`}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: 15 }} color="text.primary">
                                {`${totalRaces} Total races`}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {`Avg Vis: ${avgVis.toFixed(2)}`}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {`Pred Vis: ${Number(predictedVis).toFixed(2)}`}
                            </Typography>
                        </Box>
                    </Box>
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
                                {speed} | {strength} | {speed} | {strength} | {speed} | {strength}
                            </Typography>
                        </Container>
                    </Box>
                </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button size="small">Mother {motherId}</Button>
                <Button size="small">Father {fatherId}</Button>
            </CardActions>
        </Card>
    );
}

export default PegaCard;