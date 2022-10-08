import React, { useEffect, useState } from "react";

import Search from "../Search/Search";
import NewsList from "../NewsList/NewsList";
import EmptyList from "../../Common/EmptyList/EmptyList";

const NewsTab = ({ category }) => {
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
    fetch(`./data/${category}.json`, {
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
    <>
      {/* Search Bar */}
      <Search
        clearSearch={clearSearch}
        searchExec={searchExec}
        searchinp={searchInp}
        handleSearchInp={handleSearchInp}
      />

      {/* News List */}
      {news.length > 0 ? (
        <NewsList news={news} category={category} />
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default NewsTab;
