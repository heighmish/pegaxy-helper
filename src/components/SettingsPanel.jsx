import React, { useEffect, useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';
import { setBreedHelperSettings } from '../util/helpers';

const SettingsPanel = ({ settings, setSettings }) => {
  const [currentlyAble, setCurrentlyAble] = useState(settings.currBreedable);
  const [maintainBloodlines, setMaintainBloodlines] = useState(settings.maintainBloodlines);

  const [breedTypes, setBreedTypes] = useState(settings.breedTypes);


  useEffect(() => {
    const updateSettings = () => {
      const newSettings = {
        currBreedable: currentlyAble,
        maintainBloodlines: maintainBloodlines,
        breedTypes: breedTypes
      }
      setSettings(newSettings);
      setBreedHelperSettings(newSettings);
    }
    updateSettings();
  }, [currentlyAble, maintainBloodlines, breedTypes, setSettings])
  
  const updateBreedTypeClick = (idx) => {
    const copy = [...breedTypes];
    copy[idx].showInResults = !copy[idx].showInResults;
    setBreedTypes(copy);
  }

  const updateBreedTypeSlider = (ev, val, idx) => {
    const copy = [...breedTypes];
    copy[idx].breedCount = val;
    setBreedTypes(copy);
  }

  const [openBreedType, setOpenBreedType] = React.useState(false);
  const handleBreedTypeOpen = () => {
    setOpenBreedType(!openBreedType);
  };
  const [openBreedCount, setOpenBreedCount] = React.useState(false);
  const handleBreedCountOpen = () => {
    setOpenBreedCount(!openBreedCount);
  };
  return (
    <Paper>
      <List
        sx={{ width: 'auto', height: 'auto' }}
        component="section"
        subheader={
          <ListSubheader component="div">
            Breed helper filter options
          </ListSubheader>
        }
      >
        <ListItemButton role={undefined} onClick={()=> setCurrentlyAble(!currentlyAble)} dense>
          <ListItemText primary="Currently able to breed?"/>
          <ListItemIcon>
            <Checkbox
              edge="end"
              checked={currentlyAble}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': 'TEMP'}}
            />
          </ListItemIcon>
        </ListItemButton>

        <ListItemButton role={undefined} onClick={()=> setMaintainBloodlines(!maintainBloodlines)} dense>
          <ListItemText primary="Maintain bloodlines?"/>
          <ListItemIcon>
            <Checkbox
              edge="end"
              checked={maintainBloodlines}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': 'TEMP'}}
            />
          </ListItemIcon>
        </ListItemButton>
     
      <ListItemButton onClick={handleBreedTypeOpen}>
        <ListItemText primary="Breedtypes" />
        {openBreedType? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openBreedType} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {['Pacer', 'Rare', 'Epic', 'Legendary', 'Founding'].map((breedType, idx) =>
            <ListItemButton role={undefined} onClick={()=> updateBreedTypeClick(idx)} dense sx={{ pl: 4 }} key={`bType${idx}`}>
            <ListItemText primary={breedType}/>
            <ListItemIcon>
              <Checkbox
                edge="end"
                checked={breedTypes[idx].showInResults}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': 'TEMP'}}
              />
            </ListItemIcon>
          </ListItemButton>
          )}
        </List>
      </Collapse>

      <ListItemButton onClick={handleBreedCountOpen}>
        <ListItemText primary="Breedcounts" />
        {openBreedCount ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openBreedCount} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {['Pacer', 'Rare', 'Epic', 'Legendary', 'Founding'].map((breedType, idx) =>
            <ListItem sx={{display: 'flex', flexDirection: 'column'}}  key={`bCount${idx}`}>
              <Typography id={`${breedType}-breedcount-input-slider`}>
                {breedType}
              </Typography>
                  <Slider
                    aria-labelledby={`${breedType}-breedcount-input-slider`}
                    value={breedTypes[idx].breedCount}
                    onChange={(ev, val) => updateBreedTypeSlider(ev, val, idx)}
                    step={1}
                    min={0}
                    max={7}
                  />
            </ListItem>
          )}
        </List>
      </Collapse>

    </List>
  </Paper>
  )
}

export default SettingsPanel;
