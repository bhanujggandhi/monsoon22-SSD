import React from "react";
import "./Search.css";

const Search = ({ searchinp, handleSearchInp, clearSearch, searchExec }) => {
  return (
    <div className='searchBar-wrap' onSubmit={searchExec}>
      <form>
        <input
          type='text'
          placeholder='Search By Category'
          value={searchinp}
          onChange={handleSearchInp}
        />
        {searchinp && <span onClick={clearSearch}>X</span>}

        <button>Go</button>
      </form>
    </div>
  );
};

export default Search;
