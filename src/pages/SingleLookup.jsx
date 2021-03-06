import { Container } from "@mui/material";
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { apiCall } from "../util/api";
import { getModelPrediction } from "../util/model";
import CenteredContainer from "../components/CenteredContainer";
import { getStatsFromJson, getMetaScore } from "../util/helpers";
import CircularProgress from '@mui/material/CircularProgress';
import { Helmet } from 'react-helmet-async';
import PegaCard from '../components/PegaCard';

const SingleLookup = ({ model }) => {
  const [searchValue, setSearchValue] = useState('');
  const [predictedPega, setPredictedPega] = useState(false);
  const [actualPega, setActualPega] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

  const handleSubmit = async (ev, val=undefined) => {
    const value = val ?? searchValue;
    if (!value) {
      setSearchError("Please enter a value");
      return;
    }
    setLoading(true);
    setPredictedPega(false);
    setActualPega(false);
    if (value.includes(',')) {
      // Array prediction
      await statsPrediction(value.split(','));
      setLoading(false);
      return;
    }
    // Add more error checking
    try {
      const pega = await apiCall(`pegas/${value}`, {}, 'GET');
      await realPrediction(pega, value);
      setLoading(false);
    } catch (err) {
      setSearchError(err.message);
      setLoading(false);
    }
  }

  const realPrediction = async (pega, id) => {
    try {
      if (pega.ownerAddress === '0x000000000000000000000000000000000000dEaD') {
        setSearchError(`Invalid ID, pega ${id} has been burned`);
        setLoading(false);
        return;
      }
      const numbers = getStatsFromJson(pega);
      const prediction = getMetaScore(await getModelPrediction(numbers, model));
      const accountData = await apiCall(`pegas/owner/user/${pega.ownerAddress}`)
      const pegaData = accountData.find(pega => pega.id === Number(id));
      setActualPega({pegaData, prediction});
    } catch (err) {
      setSearchError(err.message);
      setLoading(false);
    }
  }
   
  const statsPrediction = async (arr) => {
    if (arr.length !== 6) {
      setSearchError(`Invalid length ${arr.length}`);
      return;
    }
    const numbers = arr.map(num => Number(num));
    numbers.forEach(element => {
      if (element < 0 || element > 9) {
        setSearchError(`Invalid element value ${element}, must be between 0 and 9`);
        return;
      }
    })
    const prediction = await getModelPrediction(numbers, model);
    setPredictedPega(getMetaScore(prediction));
  }

  const loadPega = async (id) => {
    await handleSubmit(null, id.toString());
  }

  return (
    <>
      <Helmet>
        <title>Pega Lookup</title>
        <meta name="description" content="Look up stats and average vis earnings for an existing pega." />
      </Helmet>
      <Container maxWidth="md" sx = {{ display:'flex', flexDirection: 'column', gap: '10px' }}>
        <SearchBar
          searchLabel={"PegaID"}
          text={"Enter a PegaID or a comma separated pega stats as: speed, strength, lightning, wind, water, fire"}
          submitHandler={handleSubmit}
          value={searchValue}
          changeHandler={setSearchValue}
          error={searchError}
          setError={setSearchError}
        />
        <CenteredContainer>
          {loading && <CircularProgress />}
          {predictedPega && <div>Expected metascore for those stats are {predictedPega} </div>}
          {actualPega && <PegaCard pegaData={actualPega.pegaData} metascore={actualPega.prediction} onClick={loadPega}/>}
        </CenteredContainer>
      </Container>
    </>
  );
}

export default SingleLookup;
