import React from "react";

function SearchBar(props) {
  return (
    <input
      type="text"
      placeholder="Search Data"
      onChange={(e) => props.onSearch(e.target.value)}
      value={props.value}
    />
  );
}

export default SearchBar;