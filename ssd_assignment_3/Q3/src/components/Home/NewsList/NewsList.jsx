import React from "react";
import NewsItem from "../NewsItem/NewsItem";

import "./NewsList.css";

const NewsList = ({ news }) => {
  console.log(news);
  return (
    <div className='newsList-wrap'>
      {news ? news.map((n) => <NewsItem n={n} />) : <div>Empty</div>}
    </div>
  );
};

export default NewsList;
