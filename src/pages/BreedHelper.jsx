import React, { useEffect, useState } from "react";
import { CircularProgress, Container } from "@mui/material";
import SearchBar from "../components/SearchBar";
import { apiCall } from "../util/api";
import { breedHelper, saveAddress, loadAddress, getBreedType, getBloodLine, getBreedHelperSettings, getVisCost } from "../util/helpers";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StatBar from "../components/StatBar";
import IconButton from '@mui/material/IconButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Paper from '@mui/material/Paper';
import CheckIcon from '@mui/icons-material/Check';
import MiniPegaCard from "../components/MiniPegaCard";
import CenteredContainer from "../components/CenteredContainer";
import SettingsPanel from "../components/SettingsPanel";
import { bloodLineTimers} from "../config";
import Tooltip from '@mui/material/Tooltip';

const BreedHelper = ({ model }) => {
  const [searchValue, setSearchValue] = useState(loadAddress());
  const [accountPegas, setAccountPegas] = useState([]);
  const [combinations, setCombinations] = useState([]);
  const [filteredCombinations, setFilteredCombinations] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);
  const [leftPega, setLeftPega] = useState(null);
  const [rightPega, setRightPega] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [loading, setLoading] = useState(false);
  const [seenPegas, setSeenPegas] = useState(new Set());
  const [settings, setSettings] = useState(getBreedHelperSettings());

  useEffect(() => {
    const validateBreedCount = (val, arr) => {
      return (arr[0] <= val && val <= arr[1]);
    }

    const validateBreedTime = (pega, currTime) => {
      if (pega.lastBreedTime === 0) return currTime >= pega.canBreedAt;
      return currTime >= (pega.lastBreedTime + (bloodLineTimers[pega.bloodLine].breedCD * 60 * 60));
    }

    const validatePega = (pega, time) => {
      let idx;
      const actBreedType = pega.breedType;
      switch (actBreedType) {
        case 'Pacer':
          idx = 0;
          if (!settings.breedTypes[idx].showInResults) return false;
          if (!validateBreedCount(pega.breedCount, settings.breedTypes[idx].breedCount)) return false;
          if (settings.currBreedable && !validateBreedTime(pega, time)) return false;
          break;
        case 'Rare':
          idx = 1;
          if (!settings.breedTypes[idx].showInResults) return false;
          if (!validateBreedCount(pega.breedCount, settings.breedTypes[idx].breedCount)) return false;
          if (settings.currBreedable && !validateBreedTime(pega, time)) return false;
          break;
        case 'Epic':
          idx = 2;
          if (!settings.breedTypes[idx].showInResults) return false;
          if (!validateBreedCount(pega.breedCount, settings.breedTypes[idx].breedCount)) return false;
          if (settings.currBreedable && !validateBreedTime(pega, time)) return false;
          break;
        case 'Legendary':
          idx = 3;
          if (!settings.breedTypes[idx].showInResults) return false;
          if (!validateBreedCount(pega.breedCount, settings.breedTypes[idx].breedCount)) return false;
          if (settings.currBreedable && !validateBreedTime(pega, time)) return false;
          break;
        case 'Founding':
          idx = 4;
          if (!settings.breedTypes[idx].showInResults) return false;
          if (!validateBreedCount(pega.breedCount, settings.breedTypes[idx].breedCount)) return false;
          if (settings.currBreedable && !validateBreedTime(pega, time)) return false;
          break;
        default:
          console.log('Breedtype is not defined',  actBreedType);
      }
      return !seenPegas.has(pega.id);
    }

    const validateObject = (obj, time) => {
      const lPega = accountPegas[obj.lId];
      const rPega = accountPegas[obj.rId];
      if (settings.maintainBloodlines && lPega.bloodLine !== rPega.bloodLine) return false;
      return validatePega(lPega, time) && validatePega(rPega, time);
    }

    const filterCombinations = () => {
      const time = Date.now() / 1000;
      const combCopy = combinations.filter(obj => validateObject(obj, time))
      setFilteredCombinations(combCopy);
      setCurrIndex(0);
    }
    filterCombinations();
  }, [seenPegas, combinations, settings, accountPegas])

  useEffect(() => {
    const getCurrentCombination = () => {
      if (!filteredCombinations.length || currIndex >= filteredCombinations.length) return;
      const obj = filteredCombinations[currIndex];
      setLeftPega(accountPegas[obj.lId]);
      setRightPega(accountPegas[obj.rId]);
    }
    getCurrentCombination();
  }, [currIndex, accountPegas, filteredCombinations])

  const convertArrayToObject = (array, key) => {
    const newObject = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, newObject)
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const accountData = await apiCall(`pegas/owner/user/${searchValue}`);
      saveAddress(searchValue); // Save address in localstorage
      setAccountPegas(convertArrayToObject(accountData, 'id'));
      setSeenPegas(new Set()); // Reset seen set values
      setCurrIndex(0);
      const results = await breedHelper(accountData, model);
      setCombinations(results);
    } catch (err) {
      setSearchError(err.message);
    }
    setLoading(false);
  }

  const addPegasToseenSet = () => {
    const setCopy = new Set(seenPegas);
    setCopy.add(filteredCombinations[currIndex].lId);
    setCopy.add(filteredCombinations[currIndex].rId);
    setSeenPegas(setCopy);
  }

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <SearchBar
        searchLabel={"Wallet address"}
        text={"Enter a polygon wallet address"}
        submitHandler={handleSubmit}
        value={searchValue}
        changeHandler={setSearchValue}
        error={searchError}
        setError={setSearchError}
      />
      <CenteredContainer>
        {loading && <CircularProgress />}
      </CenteredContainer>
      {!loading &&
      <Box sx={{display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start'}}>
        {leftPega && rightPega && filteredCombinations.length > currIndex && <Container maxWidth='sm' sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginRight: 0, padding: {xs: 0, sm: '16px'} }}>
          <Paper>
          <Box sx={{ display: 'flex', flexDirection: 'row', flex : 2, flexWrap: 'wrap', gap: '10px' }}>
            <MiniPegaCard
              pega={leftPega}
              pos={{
                marginLeft: '10px',
              }}
              />
            <MiniPegaCard
              pega={rightPega}
              pos={{
                textAlign: {xs: 'left', sm: 'right'},
                justifyContent: {xs: 'flex-start', sm: 'flex-end'},
                marginRight: {xs: '0', sm: '10px'},
                marginLeft: {xs: '10px', sm: '0'},
              }}
              />
          </Box>
          <Box sx={{ display: 'flex', flex : 1, justifyContent: {xs: 'flex-start', sm: 'center'}, marginBlock: '5px', gap: '15px', marginLeft: {xs: '10px', sm: 0},  flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontSize: 16 }} color="text.primary">
                Expected Child Stats
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.primary">
                {getBloodLine(leftPega.bloodLine, rightPega.bloodLine)} | {getBreedType(leftPega.breedType, rightPega.breedType)}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.primary">
                Vis cost: {getVisCost(leftPega.breedCount, rightPega.breedCount)}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.primary">
                Metascore: {filteredCombinations[currIndex].metaScore}/10
              </Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <StatBar
                speed={filteredCombinations[currIndex].cVec[0].toFixed(2)}
                strength={filteredCombinations[currIndex].cVec[1].toFixed(2)}
                fire={filteredCombinations[currIndex].cVec[5].toFixed(2)}
                lightning={filteredCombinations[currIndex].cVec[2].toFixed(2)}
                water={filteredCombinations[currIndex].cVec[4].toFixed(2)}
                wind={filteredCombinations[currIndex].cVec[3].toFixed(2)}
              />
            </Box>
          </Box>
        </Paper>
          <Container maxWidth='md' sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton
              disabled={currIndex === 0 || filteredCombinations.length <= 1}
              onClick={() => {
                setCurrIndex(prev => prev - 1);
              }}
              aria-label="previous-pega-combination"
            >
              <NavigateBeforeIcon />
            </IconButton>

            <Tooltip title="Don't show combinations using these pegas">
              <span>
                <IconButton
                onClick={addPegasToseenSet}
                disabled={filteredCombinations.length <= 1}
                >
                  <CheckIcon />
                </IconButton>
              </span>
            </Tooltip>
            <IconButton
              disabled={currIndex === filteredCombinations.length-1 || filteredCombinations.length <= 1}
              onClick={() => {
                setCurrIndex(prev => prev + 1)
              }}
              aria-label="next-pega-combination"
            >
              <NavigateNextIcon />
            </IconButton>
          </Container>
      </Container>}
          {filteredCombinations.length <= 1  &&
            <Typography sx={{ fontSize: 14 }} color="text.primary">
              There are no more combinations for your current settings
            </Typography>}
      <SettingsPanel settings={settings} setSettings={setSettings} />
    </Box>}
  </Container>
  );
}

export default BreedHelper;
