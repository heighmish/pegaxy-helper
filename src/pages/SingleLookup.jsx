import { Container } from "@mui/material";
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { apiCall } from "../util/api";
import { getModelPrediction } from "../util/model";
import { createPegaCard } from "../util/createPegaCard";
import CenteredContainer from "../components/CenteredContainer";
import { getStatsFromJson, getMetaScore } from "../util/helpers";
import CircularProgress from '@mui/material/CircularProgress';
import { useSearchParams } from "react-router-dom";

const SingleLookup = ({ model }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('pega') || '');
  const [predictedPega, setPredictedPega] = useState(false);
  const [actualPega, setActualPega] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

  const handleSubmit = async () => {
    if (!searchValue) {
      setSearchError("Please enter a value");
      return;
    }
    setLoading(true);
    setPredictedPega(false);
    setActualPega(false);
    if (searchValue.includes(',')) {
      // Array prediction
      await statsPrediction(searchValue.split(','));
      setLoading(false);
      return;
    }
    // Add more error checking
    try {
      const pega = await apiCall(`pegas/${searchValue}`, {}, 'GET');
      await realPrediction(pega);
      setLoading(false);
    } catch (err) {
      setSearchError(err.message);
      setLoading(false);
    }
  }

  const setPegaSearchParam = async (id) => {
    setSearchParams({ 'pega': id })
    setSearchValue(id);
    // setLoading(true);
    // const pega = await apiCall(`pegas/${id}`, {}, 'GET');
    // await realPrediction(pega);
    // setLoading(false);
  }

  const realPrediction = async (pega) => {
    try {
      const numbers = getStatsFromJson(pega);
      const prediction = await getModelPrediction(numbers, model);
      const accountData = await apiCall(`pegas/owner/user/${pega.ownerAddress}`)
      const allPegaData = accountData.find(pega => pega.id === Number(searchValue));
      setActualPega(createPegaCard(allPegaData, prediction, setPegaSearchParam, searchValue));
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

  return (
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
          {actualPega}
        </CenteredContainer>
      </Container>
  );
}

export default SingleLookup;
