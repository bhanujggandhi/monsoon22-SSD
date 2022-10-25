import React from "react";
import NewsItem from "../NewsItem/NewsItem";

import "./NewsList.css";

const NewsList = ({ news, category }) => {
  return (
    <div className='newsList-wrap'>
      {news ? (
        news.map((n, i) => (
          <NewsItem key={i} n={n} index={i} category={category} />
        ))
      ) : (
        <div>Empty</div>
      )}
    </div>
  );
};

export default NewsList;
