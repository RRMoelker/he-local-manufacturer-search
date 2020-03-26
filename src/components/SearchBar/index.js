import React from "react";
import {
  Input,
  InputAdornment,
  FormControl,
  TextField
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab"
import "./SearchBar.scss";
import SearchIcon from "@material-ui/icons/Search";

const SearchBar = ({ onSearch, searchResults }) => {
  return (
    <FormControl className="search-bar">
      {/* <Input
        label="Search"
        onChange={onSearch}
        className="search-bar__input"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      /> */}
      <Autocomplete
        options={searchResults}
        getOptionLabel={option => option}
        style={{ width: 300 }}
        renderInput={params => <TextField {...params} label="Search" />}
      />
    </FormControl>
  );
};

export default SearchBar;
