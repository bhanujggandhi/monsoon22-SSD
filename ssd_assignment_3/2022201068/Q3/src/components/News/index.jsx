import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { createApi } from "unsplash-js";

import Chip from "../Common/Chip/Chip";

import EmptyList from "../Common/EmptyList/EmptyList";

import "./styles.css";
import "swiper/css";
import "swiper/css/autoplay";

const unsplash = createApi({
  accessKey: "13sIs5rFO8PytWU0mp7Cq6UL3D2eJ6HgocsBz7P_ST4",
});

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

  const [pics, setPics] = useState([]);

  useEffect(() => {
    fetchPromise
      .then((arr) => {
        setcurrNews(arr[id]);
        console.log("Successfully fetched");
      })
      .catch((err) => {
        console.log(err);
      });

    unsplash.search
      .getPhotos({
        query: "advertisements",
        page: 1,
        perPage: 10,
        orientation: "landscape",
      })
      .then((res) => {
        console.log(res.response);
        setPics(res.response.results);
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
            <h1 className='heading'>{currNews.title}</h1>
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
      <a target='_blank' href='https://www.google.com'>
        <div>
          <p style={{ background: "black", color: "white", paddingLeft: 20 }}>
            Advertisement
          </p>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            modules={[Autoplay]}
          >
            {pics.map((pic) => (
              <SwiperSlide key={pic.id}>
                <img
                  style={{ height: "200px", width: "100em" }}
                  alt={pic.alt_description}
                  src={pic.urls.full}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </a>
    </>
  );
}

export default News;
