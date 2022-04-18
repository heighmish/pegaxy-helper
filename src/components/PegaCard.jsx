import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { calculateAvgVis } from '../util/helpers';
import StatBar from './StatBar';

const PegaCard = ({id, bloodLine, name, breedCount, breedType, energy, canBreedAt, canRaceAt, gender, winRate, gold, silver, bronze, totalRaces, motherId, fatherId, speed, strength, lightning, wind, water, fire, metaScore, nav}) => {
    const [avgVis, setAvgVis] = useState(0);
    useEffect(() => {
        const val = calculateAvgVis(gold, silver, bronze, totalRaces, breedType);
        setAvgVis(Number(val));
    }, [bronze, gold, silver, totalRaces, breedType])
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
                <Box sx= {{ display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
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
                                {`MetaScore: ${metaScore}/10`}
                            </Typography>
                        </Box>
                    </Box>
                    <StatBar speed={speed} strength={strength} fire={fire} lightning={lightning} water={water} wind={wind} />
                </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button size="small" onClick={() => nav(motherId)}>Mother {motherId}</Button>
                <Button size="small" onClick={() => nav(fatherId)}>Father {fatherId}</Button>
            </CardActions>
        </Card>
    );
}

export default PegaCard;