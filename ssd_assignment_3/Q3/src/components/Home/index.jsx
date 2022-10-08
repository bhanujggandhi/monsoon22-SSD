import React, { useState } from "react";
import Header from "./Header/Header";
import Search from "./Search/Search";

const searchExec = () => {};
const clearSearch = () => {};
const handleSearchInp = (e) => {
  setSearchInp(e.target.value);
};

function Home() {
  const [searchInp, setSearchInp] = useState("");
  return (
    <div>
      {/* Page Header */}
      <Header />

      {/* Search Bar */}
      <Search
        clearSearch={clearSearch}
        searchExec={searchExec}
        searchinp={searchInp}
        handleSearchInp={handleSearchInp}
      />

      {/* News List */}
    </div>
  );
}

export default Home;
