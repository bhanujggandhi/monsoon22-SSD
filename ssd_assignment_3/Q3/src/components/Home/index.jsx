import React, { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import { createApi } from "unsplash-js";

import Header from "./Header/Header";
import NewsTab from "./NewsTab/NewsTab";
import "swiper/css";
import "swiper/css/autoplay";

const unsplash = createApi({
  accessKey: "13sIs5rFO8PytWU0mp7Cq6UL3D2eJ6HgocsBz7P_ST4",
});

function Home() {
  const [pics, setPics] = useState([]);
  useEffect(() => {
    // unsplash.search
    //   .photos("ads", 1, 10)
    //   .then(toJson)
    //   .then((json) => {
    //     setPics(json.results);
    //   });
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
    <div>
      {/* Page Header */}
      <Header />

      <Tabs isLazy isFitted variant='enclosed'>
        <TabList mt='1em' mb='1em'>
          <Tab>Auto Mobiles</Tab>
          <Tab>COVID 19</Tab>
          <Tab>CryptoCurrency</Tab>
          <Tab>Olympics</Tab>
          <Tab>Union Budget</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <>
              <NewsTab category='automobile' />
            </>
          </TabPanel>
          <TabPanel>
            <>
              <NewsTab category='covid' />
            </>
          </TabPanel>
          <TabPanel>
            <>
              <NewsTab category='finance' />
            </>
          </TabPanel>
          <TabPanel>
            <>
              <NewsTab category='olympics' />
            </>
          </TabPanel>
          <TabPanel>
            <>
              <NewsTab category='union-budget' />
            </>
          </TabPanel>
        </TabPanels>
      </Tabs>
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
    </div>
  );
}

export default Home;
