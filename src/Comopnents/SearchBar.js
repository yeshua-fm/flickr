import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Photo from "./Photo.js";
import FlickrLogo from "./FlickrLogo";
import SearchBarComponent from "./SearchBarComponent";
//begin search bar function
function SearchBar() {
  const config = require("./config.json");
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const API_KEY = config.API_KEY;
  const BASE_URL = "https://api.flickr.com/services/rest/";
  const METHOD = "flickr.photos.search";
  const FORMAT = "json";
  const EXTRAS = "url_m";
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  //Function to allow the user to press the enter key to search.
  const handleKeyPress = (e) => {
    if (e.key === "Enter") searchFlickr(input);
  };
  //(Prev, and Next page functions for page navigation.)
  function nextPage() {
    setCurrentPage((prevPage) => prevPage + 1);
  }
  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }
  //Debounce function to delay search
  // function debounce(func, wait) {
  //   let timeout;
  //   return function executedFunction(...args) {
  //     const later = () => {
  //       clearTimeout(timeout);
  //       func(...args);
  //     };
  //     clearTimeout(timeout);
  //     timeout = setTimeout(later, wait);
  //   };

  //Function to search Flickr!
  async function searchFlickr(value) {
    const SEARCH_TEXT = value;
    let url = `${BASE_URL}?method=${METHOD}&api_key=${API_KEY}&text=${SEARCH_TEXT}&format=${FORMAT}&nojsoncallback=1&extras=${EXTRAS}&per_page=${itemsPerPage}&page=${currentPage}`;
    try {
      let response = await fetch(url);
      console.log(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let data = await response.json();
      console.log(data);
      setResults(data.photos.photo);
      return data;
    } catch (error) {
      console.log("There was a problem", error.message);
    }
  }
  //debounce function that sets the delay time to 5seconds
  //const debounceSearch = debounce(searchFlickr, 5000);
  //Function to handle input
  const handleChange = (value) => {
    setInput(value);
    //Bug.
    //debounce function calls the search a second time.
    //debounceSearch(value);
    setCurrentPage(1);
  };
  //Triggers a new search when the currentPage changes
  useEffect(() => {
    searchFlickr(input);
  }, [input, currentPage]);
  if (results.length > 0) {
    //Displays search results including a new search bar at top of page.
    return (
      <div>
        <SearchBarComponent input={input} handleChange={handleChange} />
        <div className="results">
          {results.map((photo) => (
            <Photo
              key={photo.id}
              url={photo.url_m}
              title={photo.title}
              newurl={`https://www.flickr.com/photos/${photo.owner}/${photo.id}`}
            />
          ))}
        </div>
        <div className="pagination">
          <button onClick={prevPage}>Previous </button>
          <span className="page"> Page {currentPage} </span>
          <button onClick={nextPage}> Next</button>
        </div>
      </div>
    );
  }
  //Search Form displayed when page is loaded.
  return (
    <div className="container">
      <div className="searchBar">
        <FlickrLogo />
        <div className="searchContainer">
          <TextField
            fullWidth
            id="fullWidth"
            placeholder="Search for an Image"
            variant="outlined"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyPress}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            autoFocus
          />
        </div>

        <div className="dataResult"></div>
      </div>
    </div>
  );
}
export default SearchBar;
