import React, { useEffect, useState } from "react";
import EmptyList from "../Common/EmptyList/EmptyList";
import Header from "./Header/Header";
import NewsList from "./NewsList/NewsList";
import Search from "./Search/Search";

function Home() {
  const [searchInp, setSearchInp] = useState("");

  const [news, setNews] = useState([]);

  const handleSearchInp = (e) => {
    setSearchInp(e.target.value);
  };

  const searchExec = (e) => {
    e.preventDefault();
    handleSearch();
  };
  const clearSearch = () => {
    setSearchInp("");
    getData();
  };

  const handleSearch = () => {
    const allNews = news;

    const filteredNews = allNews.filter((news) => {
      if (news.category.length > 0) {
        return news.category[0]
          .toLowerCase()
          .includes(searchInp.toLowerCase().trim());
      } else {
        return [];
      }
    });

    setNews(filteredNews);
  };

  const getData = () => {
    fetch("./data/finance.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        response.json().then((res) => {
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
      {news.length > 0 ? <NewsList news={news} /> : <EmptyList />}
    </div>
  );
}

export default Home;
