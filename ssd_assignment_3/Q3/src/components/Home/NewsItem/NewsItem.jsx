import React from "react";
import { Link } from "react-router-dom";
import Chip from "../../Common/Chip/Chip";

import "./NewsItem.css";

const NewsItem = ({
  n: {
    title,
    creator,
    description,
    content,
    pubDate,
    image_url,
    category,
    link,
  },
}) => {
  return (
    <div className='newsItem-wrap'>
      <img className='newsItem-cover' src={image_url} alt='cover' />
      <Chip label={category} />
      <h3>{title}</h3>
      <p className='newsItem-desc'>{description}</p>
      <footer>
        <div className='newsItem-author'>
          <div>
            <h6>{creator && creator.length >= 0 && creator[0]}</h6>
            <p>{pubDate}</p>
          </div>
        </div>
        <Link className='newsItem-link' to={`/news/${2}`}>
          ➝
        </Link>
      </footer>
    </div>
  );
};

export default NewsItem;
