import React, { useEffect, useState } from "react";
import { CircularProgress, Container } from "@mui/material";
import SearchBar from "../components/SearchBar";
import { apiCall } from "../util/api";
import { breedHelper, saveAddress, loadAddress } from "../util/helpers";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StatBar from "../components/StatBar";
import IconButton from '@mui/material/IconButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Paper from '@mui/material/Paper';
import CheckIcon from '@mui/icons-material/Check';

const BreedHelper = ({ model }) => {
  const [searchValue, setSearchValue] = useState(loadAddress());
  const [accountPegas, setAccountPegas] = useState([]);
  const [combinations, setCombinations] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);
  const [leftPega, setLeftPega] = useState(null);
  const [rightPega, setRightPega] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [loading, setLoading] = useState(false);
  const [seenPegas, setSeenPegas] = useState(new Set());
  const [advancedIndex, setAdvancedIndex] = useState(true);

  const getNextValidIndex = () => {
    const mod = advancedIndex ? 1 : -1;
    let idx = currIndex;
    while (0 < idx && idx < combinations.length - 1) {
      idx += mod;
      const obj = combinations[idx];
      if (!seenPegas.has(obj.lId) && !seenPegas.has(obj.rId)) return idx;
    }
    if (idx >= combinations.length - 1) setCombinations([]);
    return currIndex - mod;
  }
  useEffect(() => {
    const getNewCombination = () => {
      if (combinations.length === 0) return;
      if (currIndex < 0 || currIndex > combinations.length - 1) return;
      const obj = combinations[currIndex];
      if (seenPegas.has(obj.lId) || seenPegas.has(obj.rId)) {
        const nextValidIndex = getNextValidIndex();
        setCurrIndex(nextValidIndex);
        return;
      }
      setLeftPega(accountPegas.find(pega => pega.id === obj.lId));
      setRightPega(accountPegas.find(pega => pega.id === obj.rId));
    }
    getNewCombination();
  }, [currIndex, combinations, accountPegas])

  const validateBreedCount = (pega) => {
    if (pega.breedCount === 7) return false;
    if (pega.breedType === 'Pacer') {
      if (pega.breedCount > 2) return false;
    }
    if (pega.breedType === 'Rare') {
      if (pega.breedCount > 2) return false;
    }
    if (pega.breedType === 'Epic') {
      if (pega.breedCount > 4) return false;
    }
    return true;
  }

  const validate = (pega1, pega2) => {
    if (!validateBreedCount(pega1) || !validateBreedCount(pega2)) return false;
    return true;
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const accountData = await apiCall(`pegas/owner/user/${searchValue}`);
      saveAddress(searchValue);
      setAccountPegas(accountData);
      const results = await breedHelper(accountData, model, validate);
      setCombinations(results);
    } catch (err) {
      setSearchError(err.message);
    }
    setLoading(false);
  }

  const addPegasToseenSet = () => {
    const setCopy = new Set(seenPegas);
    setCopy.add(combinations[currIndex].lId);
    setCopy.add(combinations[currIndex].rId);
    setSeenPegas(setCopy);
    setCurrIndex(prev => prev + 1);
  }

  const getBloodLine = (lPar, rPar) => {
    if (lPar === 'Zan' || rPar === 'Zan') return 'Zan';
    if (lPar === 'Klin' || rPar === 'Klin') return 'Klin';
    if (lPar === 'Campona' || rPar === 'Campona') return 'Campona';
    if (lPar === 'Hoz' || rPar === 'Hoz') return 'Hoz';
    return 'Error';
  }

  const getBreedType = (lPar, rPar) => {
    if (lPar === 'Pacer' || rPar === 'Pacer') return 'Pacer';
    if (lPar === 'Rare' || rPar === 'Rare') return 'Pacer';
    if (lPar === 'Epic' || rPar === 'Epic') return 'Rare';
    if (lPar === 'Legendary' || rPar === 'Legendary') return 'Epic';
    if (lPar === 'Founding' || rPar === 'Founding') return 'Legendary';
    return 'Error';
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
      {loading && <CircularProgress />}
      {combinations.length !== 0 && !loading &&
        <Container maxWidth='sm' sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginInline: 'auto' }}>
          <Paper>
          <Box sx={{ display: 'flex', flexDirection: 'row', flex : 2 }}>
            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', gap: '10px', justifyContent: 'flex-start', marginLeft: '10px', borderBottom: '1px solid rgba(0, 0, 0, 0.3)' }}>
              <Typography sx={{ fontSize: 14 }} color="text.primary">
                #{leftPega.id}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.primary">
                {leftPega.name}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.primary">
                {leftPega.breedCount} | {leftPega.gender} | {leftPega.breedType}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.primary">
                {leftPega.bloodLine}
              </Typography>
              <StatBar
                speed={leftPega.speed}
                strength={leftPega.strength}
                fire={leftPega.fire}
                lightning={leftPega.lightning}
                water={leftPega.water}
                wind={leftPega.wind}
              />

            </Box>
            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', gap: '10px', justifyContent: 'flex-end', textAlign: 'right', marginRight: '10px',  borderBottom: '1px solid rgba(0, 0, 0, 0.3)' }}>
              <Typography sx={{ fontSize: 14 }} color="text.primary">
                #{rightPega.id}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.primary">
                {rightPega.name}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.primary">
              {rightPega.breedType} | {rightPega.gender} | {rightPega.breedCount}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.primary">
                {rightPega.bloodLine}
              </Typography>
              <StatBar 
                pos={'flex-end'}
                speed={rightPega.speed}
                strength={rightPega.strength}
                fire={rightPega.fire}
                lightning={rightPega.lightning}
                water={rightPega.water}
                wind={rightPega.wind}
              />
            </Box>
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
                setAdvancedIndex(false);
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
                setAdvancedIndex(true);
                setCurrIndex(prev => prev + 1)
              }}
              aria-label="next-pega-combination"
            >
              <NavigateNextIcon />
            </IconButton>
          </Container>
      </Container>}
  </Container>
  );
}

export default BreedHelper;
