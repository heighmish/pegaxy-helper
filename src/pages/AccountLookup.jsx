import React, { useState } from "react";
import { CircularProgress, Container } from "@mui/material";
import SearchBar from "../components/SearchBar";
import { apiCall } from "../util/api";
import { createDataSetFromJson } from "../util/model";
import PegaTable from "../components/PegaTable";
import { calculateAvgVis, getMetaScore, loadAddress, saveAddress } from "../util/helpers";
import CenteredContainer from "../components/CenteredContainer";


const AccountLookup = ({ model }) => {
  const [searchValue, setSearchValue] = useState(loadAddress());
  const [accountPegas, setAccountPegas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const accountData = await apiCall(`pegas/owner/user/${searchValue}`);
      saveAddress(searchValue);
      const predictions = await createDataSetFromJson(accountData, model);
      setAccountPegas(accountData.map((pega, idx) => ({
        ...pega,
        avgVis: calculateAvgVis(pega.gold, pega.silver, pega.bronze, pega.totalRaces, pega.breedType),
        metaScore: getMetaScore(predictions[idx]),
      })));
    } catch (err) {
      setSearchError(err.message)
    }
    setLoading(false);
  }

  return (
    <Container maxWidth="max">
      <SearchBar
        searchLabel={"Wallet address"}
        text={"Enter a polygon wallet address"}
        submitHandler={handleSubmit}
        value={searchValue}
        changeHandler={setSearchValue}
        error={searchError}
        setError={setSearchError}
      />
      {loading &&
      <CenteredContainer>
        <CircularProgress />
      </CenteredContainer>
      }
      {accountPegas.length !== 0 && <PegaTable rows={accountPegas}/>}
  </Container>
  );
}

export default AccountLookup;
