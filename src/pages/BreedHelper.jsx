import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import SearchBar from "../components/SearchBar";
import { apiCall } from "../util/api";
import { breedHelper } from "../util/helpers";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StatBar from "../components/StatBar";
import IconButton from '@mui/material/IconButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const BreedHelper = ({ model }) => {
  const [searchValue, setSearchValue] = useState('');
  const [accountPegas, setAccountPegas] = useState([]);
  const [combinations, setCombinations] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);
  const [leftPega, setLeftPega] = useState(null);
  const [rightPega, setRightPega] = useState(null);

  useEffect(() => {
    if (combinations.length !== 0) {
      const obj = combinations[currIndex];
      console.log(obj)
      setLeftPega(accountPegas.find(pega => pega.id === obj.lId));
      setRightPega(accountPegas.find(pega => pega.id === obj.rId));
    }
  }, [currIndex, combinations, accountPegas])

  const handleSubmit = async () => {
    try {
      const accountData = await apiCall(`pegas/owner/user/${searchValue}`);
      setAccountPegas(accountData);
      const results = await breedHelper(accountData, model);
      setCombinations(results);
    } catch (err) {
      console.log(err);
    }
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
    <Container maxWidth="lg">
      <SearchBar
        searchLabel={"Wallet address"}
        text={"Enter a polygon wallet address"}
        submitHandler={handleSubmit}
        changeHandler={setSearchValue}
      />
      {combinations.length !== 0 &&
      <Container maxWidth='md' sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', flex : 2 }}>
          <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', gap: '10px', justifyContent: 'flex-start' }}>
            <Typography sx={{ fontSize: 14 }} color="text.primary">
              {leftPega.id}
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
          <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', gap: '10px', justifyContent: 'flex-end', textAlign: 'right' }}>
            <Typography sx={{ fontSize: 14 }} color="text.primary">
              {rightPega.id}
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
              speed={rightPega.speed}
              strength={rightPega.strength}
              fire={rightPega.fire}
              lightning={rightPega.lightning}
              water={rightPega.water}
              wind={rightPega.wind}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flex : 1 }}>
          <Box>
            <Typography sx={{ fontSize: 16 }} color="text.primary">
              Expected Child
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
          <Box>
            <StatBar
              speed={combinations[currIndex].cVec[0]}
              strength={combinations[currIndex].cVec[1]}
              fire={combinations[currIndex].cVec[5]}
              lightning={combinations[currIndex].cVec[2]}
              water={combinations[currIndex].cVec[4]}
              wind={combinations[currIndex].cVec[3]}
            />
          </Box>
        </Box>
        <Container maxWidth='md'>
          {currIndex !== 0 && <IconButton onClick={() => setCurrIndex(prev => prev - 1)} aria-label="previous-pega-combination">
            <NavigateBeforeIcon />
          </IconButton>}
          {currIndex !== combinations.length && <IconButton onClick={() => setCurrIndex(prev => prev + 1)} aria-label="next-pega-combination">
            <NavigateNextIcon />
          </IconButton>}
        </Container>
      </Container>}
  </Container>
  );
}

export default BreedHelper;
