import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { calculateAvgVis } from '../util/helpers';
import StatBar from './StatBar';

const PegaCard = ({ pegaData, metascore, onClick, disabled=false}) => {
    const [avgVis, setAvgVis] = useState(0);
    useEffect(() => {
        const val = calculateAvgVis(pegaData.gold, pegaData.silver, pegaData.bronze, pegaData.totalRaces, pegaData.breedType);
        setAvgVis(Number(val));
    }, [pegaData.bronze, pegaData.gold, pegaData.silver, pegaData.totalRaces, pegaData.breedType])
    return (
        <Card>
            <CardContent>
                <Box sx= {{ display: 'flex', justifyContent: 'space-between'}}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    {`#${pegaData.id}`}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    {`Breedcount: ${pegaData.breedCount}/7`}
                </Typography>
                </Box>
                <Typography variant="h5" component="div">
                    {pegaData.name}
                </Typography>
            <   Box sx= {{ display: 'flex', justifyContent: 'space-between'}}>
                    <Typography sx={{ fontSize: 16, mb: 1 }} color="text.secondary">
                        {pegaData.breedType} | {pegaData.bloodLine} | {pegaData.gender}
                    </Typography>
                    <Typography sx={{ fontSize: 15}} color="text.secondary">
                        {`Energy: ${pegaData.energy}/25`}
                    </Typography>
                </Box>
                <Box sx= {{ display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
                    <Box sx= {{ display: 'flex', gap: '10px'}}>
                        <Box sx= {{ display: 'flex', flexDirection: 'column', gap: '2.5px'}}>
                            <Typography sx={{ fontSize: 14 }} color="text.primary">
                                {`Winrate: ${(pegaData.winRate*100).toFixed(0)}%`}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {`Gold: ${((pegaData.gold/pegaData.totalRaces)*100).toFixed(0)}%`}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {`Silver: ${((pegaData.silver/pegaData.totalRaces)*100).toFixed(0)}%`}
                            </Typography><Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {`Bronze: ${((pegaData.bronze/pegaData.totalRaces)*100).toFixed(0)}%`}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: 15 }} color="text.primary">
                                {`${pegaData.totalRaces} Total races`}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {`Avg Vis: ${avgVis.toFixed(2)}`}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {`MetaScore: ${metascore}/10`}
                            </Typography>
                        </Box>
                    </Box>
                    <StatBar speed={pegaData.speed} strength={pegaData.strength} fire={pegaData.fire} lightning={pegaData.lightning} water={pegaData.water} wind={pegaData.wind} />
                </Box>
            </CardContent>
            {pegaData.motherId !== null && <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button disabled={disabled} size="small" onClick={() => onClick(pegaData.motherId)} >Mother {pegaData.motherId}</Button>
                <Button disabled={disabled} size="small" onClick={() => onClick(pegaData.fatherId)} >Father {pegaData.fatherId}</Button>
            </CardActions>}
        </Card>
    );
}

export default PegaCard;