import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Chip from "../Common/Chip/Chip";

import EmptyList from "../Common/EmptyList/EmptyList";

import "./styles.css";

function News() {
  const { id, category } = useParams();
  const [currNews, setcurrNews] = useState(null);

  const fetchPromise = new Promise((resolve, reject) => {
    fetch(`../../data/${category}.json`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        response.json().then((res) => {
          resolve(res.results);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });

  useEffect(() => {
    fetchPromise
      .then((arr) => {
        setcurrNews(arr[id]);
        console.log("Successfully fetched");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Link className='newsgoback' to='/'>
        <span> &#8592;</span> <span>Go Back</span>
      </Link>
      {currNews ? (
        <div className='news-wrap'>
          <header>
            <p className='news-date'>Published {currNews.pubDate}</p>
            <h1>{currNews.title}</h1>
            <div className='news-subCategory'>
              {currNews.keywords &&
                currNews.keywords.map((category, i) => (
                  <div key={i}>
                    <Chip label={category} />
                  </div>
                ))}
            </div>
          </header>
          <img
            src={
              currNews.image_url
                ? currNews.image_url.length === 0
                  ? "https://media4.s-nbcnews.com/i/newscms/2019_01/2705191/nbc-social-default_b6fa4fef0d31ca7e8bc7ff6d117ca9f4.png"
                  : currNews.image_url
                : "https://media4.s-nbcnews.com/i/newscms/2019_01/2705191/nbc-social-default_b6fa4fef0d31ca7e8bc7ff6d117ca9f4.png"
            }
            alt='cover'
          />
          <p className='news-desc'>
            {currNews.content ? currNews.content : currNews.description}
          </p>
        </div>
      ) : (
        <EmptyList />
      )}
    </>
  );
}

export default News;
