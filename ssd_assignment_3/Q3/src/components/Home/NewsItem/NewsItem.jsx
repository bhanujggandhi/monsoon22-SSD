import React from "react";
import { Link } from "react-router-dom";
import Chip from "../../Common/Chip/Chip";

import "./NewsItem.css";

const NewsItem = ({
  n: { title, creator, description, pubDate, image_url, category },
  index,
  category: cat,
}) => {
  return (
    <div className='newsItem-wrap'>
      <img
        className='newsItem-cover'
        src={
          image_url
            ? image_url.length === 0
              ? "https://media4.s-nbcnews.com/i/newscms/2019_01/2705191/nbc-social-default_b6fa4fef0d31ca7e8bc7ff6d117ca9f4.png"
              : image_url
            : "https://media4.s-nbcnews.com/i/newscms/2019_01/2705191/nbc-social-default_b6fa4fef0d31ca7e8bc7ff6d117ca9f4.png"
        }
        alt='cover'
      />
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
        <Link className='newsItem-link' to={`/news/${cat}/${index}`}>
          ➝
        </Link>
      </footer>
    </div>
  );
};

export default NewsItem;
