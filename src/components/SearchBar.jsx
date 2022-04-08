import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import CenteredContainer from "./CenteredContainer";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const SearchBar = ({searchLabel, submitHandler, text, changeHandler}) => {
    return (
        <Box>
            <Box m={2} sx={{textAlign: "center"}}>
                <Typography variant="body">{text}</Typography>
            </Box>
            <CenteredContainer maxWidth="md">
                <FormGroup row>
                    <TextField onChange={(event) => changeHandler(event.target.value)} label={searchLabel} variant="outlined"/>
                    <Button size={"small"} onClick={submitHandler} variant="outlined">Search</Button>
                </FormGroup>
            </CenteredContainer>
        </Box>
    );
}

export default SearchBar;