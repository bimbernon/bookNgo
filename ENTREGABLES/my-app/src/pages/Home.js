import React from "react";
import { CathegoriesMenu } from "../components/main/HomeMain/CathegoriesMenu/CathegoriesMenu";
import { HowItWorks } from "../components/main/HomeMain/WhoWeAre/WhoWeAre";
import { LatestNews } from "../components/main/HomeMain/LatestNews/LatestNews";

function Home() {
  return (
    <div>
      <CathegoriesMenu />
      <HowItWorks />
      <LatestNews />
    </div>
  );
}

export { Home };
