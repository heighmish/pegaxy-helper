import React, { useEffect, useState } from "react";
import { CircularProgress, Container } from "@mui/material";
import SearchBar from "../components/SearchBar";
import { apiCall } from "../util/api";
import { breedHelper, saveAddress, loadAddress, getBreedType, getBloodLine, getBreedHelperSettings } from "../util/helpers";
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
    const filterCombinations = () => {
      const combCopy = combinations.filter(obj => !seenPegas.has(obj.lId) && !seenPegas.has(obj.rId))
      console.log('Filtered length', combCopy.length);
      setFilteredCombinations(combCopy);
    }
    filterCombinations();
  }, [seenPegas, combinations])

  useEffect(() => {
    const getCurrentCombination = () => {
      if (!filteredCombinations.length) return;
      const obj = filteredCombinations[currIndex];
      console.log(obj)
      setLeftPega(accountPegas.find(pega => pega.id === obj.lId));
      setRightPega(accountPegas.find(pega => pega.id === obj.rId));
    }
    getCurrentCombination();
  }, [currIndex, accountPegas, filteredCombinations])

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const accountData = await apiCall(`pegas/owner/user/${searchValue}`);
      saveAddress(searchValue); // Save address in localstorage
      setAccountPegas(accountData);
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
      {leftPega && rightPega && !loading &&
      <Box sx={{display: 'flex', flexWrap: 'wrap' }}>
        <Container maxWidth='sm' sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginRight: 0}}>
          <Paper>
          <Box sx={{ display: 'flex', flexDirection: 'row', flex : 2, flexWrap: 'wrap', gap: '10px', alignItems: 'flex-start'  }}>
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
          <Box sx={{ display: 'flex', flex : 1, justifyContent: 'center', marginBlock: '5px', gap: '15px', marginInline: 'auto' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontSize: 16 }} color="text.primary">
                Expected Child Stats
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.primary">
                {getBloodLine(leftPega.bloodLine, rightPega.bloodLine)}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.primary">
                {getBreedType(leftPega.breedType, rightPega.breedType)}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.primary">
                Metascore: {combinations[currIndex].metaScore}/10
              </Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <StatBar
                speed={combinations[currIndex].cVec[0].toFixed(2)}
                strength={combinations[currIndex].cVec[1].toFixed(2)}
                fire={combinations[currIndex].cVec[5].toFixed(2)}
                lightning={combinations[currIndex].cVec[2].toFixed(2)}
                water={combinations[currIndex].cVec[4].toFixed(2)}
                wind={combinations[currIndex].cVec[3].toFixed(2)}
              />
            </Box>
          </Box>
        </Paper>
          <Container maxWidth='md' sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton
              disabled={currIndex === 0}
              onClick={() => {
                setCurrIndex(prev => prev - 1);
              }}
              aria-label="previous-pega-combination"
            >
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton onClick={addPegasToseenSet}>
              <CheckIcon />
            </IconButton>
            <IconButton
              disabled={currIndex === combinations.length}
              onClick={() => {
                setCurrIndex(prev => prev + 1)
              }}
              aria-label="next-pega-combination"
            >
              <NavigateNextIcon />
            </IconButton>
          </Container>
      </Container>
      <SettingsPanel settings={settings} setSettings={setSettings} />
    </Box>}
  </Container>
  );
}

export default BreedHelper;
