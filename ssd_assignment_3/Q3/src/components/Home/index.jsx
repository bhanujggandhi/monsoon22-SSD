import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import NewsList from "./NewsList/NewsList";
import Search from "./Search/Search";

const searchExec = (e) => {
  e.preventDefault();
};
const clearSearch = () => {};

function Home() {
  const [searchInp, setSearchInp] = useState("");

  const [news, setNews] = useState([]);

  const handleSearchInp = (e) => {
    setSearchInp(e.target.value);
  };

  const getData = () => {
    fetch("./data/automobile.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        response.json().then((res) => {
          console.log(res);
          setNews(res.results);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

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
      <NewsList news={news} />
    </div>
  );
}

export default Home;
