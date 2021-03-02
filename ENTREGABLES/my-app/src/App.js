import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { HeaderContainer } from "./components/header/HeaderContainer/HeaderContainer";

function App() {
  return (
    <Router>
      <div>
        <HeaderContainer />
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
