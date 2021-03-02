import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavigationMenu } from "./components/header/NavigationMenu/NavigationMenu";
import { Home } from "./pages/home";

function App() {
  return (
    <Router>
      <div>
        <img src="/logosProyecto/logoPrincipal/logo/logo.svg" alt="logo" />
        <NavigationMenu />
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
