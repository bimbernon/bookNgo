import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { NavigationMenu } from "./components/header/NavigationMenu/NavigationMenu";
import { Home } from "./pages/home";
import { HowItWorks } from "./components/header/WhoWeAre";
import { LatestNews } from "./components/header/LatestNews";

function App() {
  return (
    <Router>
      <div>
        <img src="/logosProyecto/logoPrincipal/logo/logo.svg" alt="logo" />
        <NavigationMenu />
        <HowItWorks />
        <LatestNews />
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export { App };
