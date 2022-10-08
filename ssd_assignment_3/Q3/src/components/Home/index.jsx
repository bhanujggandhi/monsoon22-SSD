import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import Header from "./Header/Header";
import NewsTab from "./NewsTab/NewsTab";

function Home() {
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
    </div>
  );
}

export default Home;
