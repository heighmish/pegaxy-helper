import React, { useState } from "react";
import { Container } from "@mui/material";
import SearchBar from "../components/SearchBar";
import { apiCall } from "../util/api";
import { createDataSetFromJson } from "../util/model";
import PegaTable from "../components/PegaTable";


const AccountLookup = ({ model }) => {
  const [searchValue, setSearchValue] = useState('');
  const [accountPegas, setAccountPegas] = useState([]);
  const handleSubmit = async () => {
    try {
      const accountData = await apiCall(`pegas/owner/user/${searchValue}`)
      const predictions = await createDataSetFromJson(accountData, model);
      setAccountPegas(accountData.map((pega, idx) => ({
        ...pega,
        avgVis: ((pega.gold/pega.totalRaces) * 105 + (pega.silver/pega.totalRaces) * 44 + (pega.bronze/pega.totalRaces)* 26) || 0,
        predicted: predictions[idx]
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
    <PegaTable rows={accountPegas}/>

  </Container>
  );
}

export default AccountLookup;
