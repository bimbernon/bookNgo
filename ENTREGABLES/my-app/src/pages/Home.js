import React from "react";
import { CathegoriesMenu } from "../components/main/LandingMain/CathegoriesMenu/CathegoriesMenu";
import { HowItWorks } from "../components/main/LandingMain/WhoWeAre/WhoWeAre";
import { LatestNews } from "../components/main/LandingMain/LatestNews/LatestNews";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Donations } from "./Donations";

function Home() {
  return (
    <Router>
      <div>
        <CathegoriesMenu></CathegoriesMenu>
        <HowItWorks />
        <LatestNews />
        <Switch>
          <Route path="/donations">
            <Donations />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export { Home };
