import { Container } from "@mui/material";
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { apiCall } from "../util/api";
import { getModelPrediction } from "../util/model";
import { createPegaCard } from "../util/createPegaCard";
import CenteredContainer from "../components/CenteredContainer";


const SingleLookup = ({ model }) => {
  const [searchValue, setSearchValue] = useState('');
  const [predictedPega, setPredictedPega] = useState(false);
  const [actualPega, setActualPega] = useState(false);

  const handleSubmit = async () => {
    if (!searchValue) {
      console.log("Invalid input");
      return;
    }
    setPredictedPega(false);
    setActualPega(false);
    if (searchValue.includes(',')) {
      // Array prediction
      statsPrediction(searchValue.split(','));
      return;
    }
    // Add more error checking
    const pega = await apiCall(`pegas/${searchValue}`, {}, 'GET');
    console.log(pega);
    realPrediction(pega);
  }

  const realPrediction = async (pega) => {
    const numbers = [
      pega.speed,
      pega.strength,
      pega.lightning,
      pega.wind,
      pega.water,
      pega.fire
    ]
    const prediction = await getModelPrediction(numbers, model);
    const accountData = await apiCall(`pegas/owner/user/${pega.ownerAddress}`)
    const allPegaData = accountData.find(pega => pega.id === Number(searchValue));
    setActualPega(createPegaCard(allPegaData, prediction, searchValue));
  }
   
  const statsPrediction = async (arr) => {
    if (arr.length !== 6) {
      console.log(`Invalid length ${arr.length}`);
      return;
    }
    const numbers = arr.map(num => Number(num));
    numbers.forEach(element => {
      if (element < 0 || element > 9) {
        console.log(`Invalid element value ${element}, must be between 0 and 9`);
        return;
      }
    })
    const prediction = await getModelPrediction(numbers, model);
    setPredictedPega(prediction);
  }
  
  return (
      <Container maxWidth="md">
        <SearchBar
          searchLabel={"PegaID"}
          text={"Enter a PegaID or a comma separated pega stats as: speed, strength, lightning, wind, water, fire"}
          submitHandler={handleSubmit}
          changeHandler={setSearchValue}
        />
        <CenteredContainer>
          {predictedPega && <div>Expected vis earned for those stats are {predictedPega} </div>}
          {actualPega}
        </CenteredContainer>

      </Container>
  );
}

export default SingleLookup;
