import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StatBar from "../components/StatBar";

const MiniPegaCard = ({ pega, pos }) => {
  return (
    <Box sx={[{ display: 'flex', flex: 1, flexDirection: 'column', gap: '10px' }, pos]}>
      <Typography sx={{ fontSize: 14 }} color="text.primary">
        #{pega.id}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.primary">
        {pega.name}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.primary">
        {pega.breedCount} | {pega.gender} | {pega.bloodLine}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.primary">
        {pega.breedType}
      </Typography>
      <StatBar
        speed={pega.speed}
        strength={pega.strength}
        fire={pega.fire}
        lightning={pega.lightning}
        water={pega.water}
        wind={pega.wind}
        pos={pos ?? pos}
      />

    </Box>
  )
}

export default MiniPegaCard;