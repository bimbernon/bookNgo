import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { HeaderContainer } from "./components/header/HeaderContainer/HeaderContainer";
import { Footer} from "../src/components/footer/Footer";
import { Donations } from "../src/pages/donations";

function App() {
  return (
    <Router>
      <div>
        <HeaderContainer />

        <Switch>
          <Route path="/">
            <Home />
          </Route>
          {/* <Route path="/donations">
            <Donations />
          </Route> */}
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export { App };
