import React from "react";
import { CathegoriesMenu } from "../components/main/CathegoriesMenu/CathegoriesMenu";
import { HowItWorks } from "../components/header/WhoWeAre";
import { LatestNews } from "../components/main/LatestNews/LatestNews";

function Home() {
  return (
    <div>
      <CathegoriesMenu></CathegoriesMenu>;
      <HowItWorks />
      <LatestNews />
    </div>
  );
}

export { Home };
