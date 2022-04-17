import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import CenteredContainer from "./CenteredContainer";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const SearchBar = ({ searchLabel, submitHandler, text, changeHandler, value, error, setError }) => {
    return (
        <Box m={2}>
            <Box m={1} sx={{textAlign: "center"}}>
                <Typography variant="body">{text}</Typography>
            </Box>
            <CenteredContainer maxWidth="md">
                <FormGroup row>
                    <TextField
                     value={value}
                     onChange={(event) => {
                        changeHandler(event.target.value);
                        setError('');
                    }}
                     label={searchLabel}
                     variant="outlined"
                     error={error !== ''}
                     helperText={error ? error : ''}
                    />
                    <Button size={"small"} onClick={submitHandler} variant="outlined">Search</Button>
                </FormGroup>
            </CenteredContainer>
        </Box>
    );
}

export default SearchBar;