import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FlickrLogo from "./FlickrLogo";
function SearchBarComponent({ input, handleChange }) {
  return (
    <div className="searchBarContainer">
      <div className="">
        <FlickrLogo />
        <div className="">
          <TextField
            fullWidth
            id="fullWidth"
            label="Search for an Image"
            variant="outlined"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            InputProps={{
              endadornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="dataResult"></div>
      </div>
    </div>
  );
}
export default SearchBarComponent;
