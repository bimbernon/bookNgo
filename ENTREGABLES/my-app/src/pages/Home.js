import React from "react";
import { CathegoriesMenu } from "../components/main/LandingMain/CathegoriesMenu/CathegoriesMenu";
import { HowItWorks } from "../components/main/LandingMain/WhoWeAre/WhoWeAre";
import { LatestNews } from "../components/main/LandingMain/LatestNews/LatestNews";

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
