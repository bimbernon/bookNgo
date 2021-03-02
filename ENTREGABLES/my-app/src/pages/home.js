import React from "react";
import { CathegoriesMenu } from "../components/main/CathegoriesMenu/CathegoriesMenu";
import { HowItWorks } from "../components/main/WhoWeAre/WhoWeAre";
import { LatestNews } from "../components/main/LatestNews/LatestNews";
import { Footer } from "../components/footer/Footer";

function Home() {
  return (
    <div>
      <CathegoriesMenu></CathegoriesMenu>
      <HowItWorks />
      <LatestNews />
      <Footer />
    </div>
  );
}

export { Home };
