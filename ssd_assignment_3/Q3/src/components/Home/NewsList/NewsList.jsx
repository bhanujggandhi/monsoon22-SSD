import React from "react";
import NewsItem from "../NewsItem/NewsItem";

import "./NewsList.css";

const NewsList = ({ news }) => {
  return (
    <div className='newsList-wrap'>
      {news ? (
        news.map((n, i) => <NewsItem key={i} n={n} index={i} />)
      ) : (
        <div>Empty</div>
      )}
    </div>
  );
};

export default NewsList;
