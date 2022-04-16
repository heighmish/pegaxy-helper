import React, { useState } from "react";
import { Container } from "@mui/material";
import SearchBar from "../components/SearchBar";
import { apiCall } from "../util/api";
import { createDataSetFromJson } from "../util/model";
import PegaTable from "../components/PegaTable";
import { calculateAvgVis, getMetaScore } from "../util/helpers";


const AccountLookup = ({ model }) => {
  const [searchValue, setSearchValue] = useState('');
  const [accountPegas, setAccountPegas] = useState([]);
  const handleSubmit = async () => {
    try {
      const accountData = await apiCall(`pegas/owner/user/${searchValue}`)
      const predictions = await createDataSetFromJson(accountData, model);
      setAccountPegas(accountData.map((pega, idx) => ({
        ...pega,
        avgVis: calculateAvgVis(pega.gold, pega.silver, pega.bronze, pega.totalRaces, pega.breedType),
        metaScore: getMetaScore(predictions[idx]),
      })));
    } catch (err) {
      console.log(err);
    }

  }
  return (
    <Container maxWidth="max">
      <SearchBar
        searchLabel={"Wallet address"}
        text={"Enter a polygon wallet address"}
        submitHandler={handleSubmit}
        changeHandler={setSearchValue}
      />
      {accountPegas.length !== 0 && <PegaTable rows={accountPegas}/>}
  </Container>
  );
}

export default AccountLookup;
