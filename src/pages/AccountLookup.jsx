import React, { useState } from "react";
import { Container } from "@mui/material";
import SearchBar from "../components/SearchBar";
import CenteredContainer from "../components/CenteredContainer";
import { apiCall } from "../util/api";
import { createPegaCard } from "../util/createPegaCard";

const AccountLookup = () => {
  const [searchValue, setSearchValue] = useState('');
  const [accountPegas, setAccountPegas] = useState([]);
  const handleSubmit = async () => {
    console.log("time to fetch account");
    try {
      const accountData = await apiCall(`pegas/owner/user/${searchValue}`)
      setAccountPegas(accountData);
      //console.log(accountData);
    } catch (err) {
      console.log(err);
    }

  }
  return (
    <Container maxWidth="md">
    <SearchBar
      searchLabel={"Wallet address"}
      text={"Enter a polygon wallet address"}
      submitHandler={handleSubmit}
      changeHandler={setSearchValue}
    />
    <CenteredContainer style={{"flexDirection": "column"}}>
      {accountPegas.map((idx, pega) => {
        return createPegaCard(pega, idx);
      })}
    </CenteredContainer>

  </Container>
  );
}

export default AccountLookup;
