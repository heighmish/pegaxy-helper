import React from "react";
import TextField from '@mui/material/TextField';
import CenteredContainer from "./CenteredContainer";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';

const SearchButton = ({ onClick }) => (
  <Tooltip title="Search">
    <span>
      <IconButton aria-label='search' onClick={onClick}>
        <SearchIcon />
      </IconButton>
    </span>
  </Tooltip>
  );

const SearchBar = ({ searchLabel, submitHandler, text, changeHandler, value, error, setError }) => {
  return (
    <Box m={2}>
      <Box m={1} sx={{textAlign: "center"}}>
        <Typography variant="body">{text}</Typography>
      </Box>
      <CenteredContainer maxWidth="xs">
        <TextField
        type='search'
        fullWidth
          value={value}
          onChange={(event) => {
            changeHandler(event.target.value);
            setError('');
        }}
          label={searchLabel}
          variant="outlined"
          error={error !== ''}
          helperText={error ? error : ''}
          InputProps={{ endAdornment: <SearchButton onClick={submitHandler} /> }}
          onKeyDown={ev => ev.key === 'Enter' ? submitHandler(): () => {}}
        />
      </CenteredContainer>
    </Box>
  );
}

export default SearchBar;