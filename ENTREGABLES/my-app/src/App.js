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
<<<<<<< HEAD
=======
<>
  <nav>
    <ul>
      <li>
        <Link to="/api/v1/" className="link">
          Home
        </Link>
      </li>
      <li>
        <Link to="/api/v1/users" className="link">
          Users
        </Link>
      </li>
      <li>
        <Link to="/api/v1/books" className="link">
          Books
        </Link>
      </li>
      <li>
        <Link to="/api/v1/authors" className="link">
          Authors
        </Link>
      </li>
      <li>
        <Link to="/api/v1/cathegories" className="link">
          Cathegories
        </Link>
      </li>
      <li>
        <Link to="/api/v1/reserves" className="link">
          Reserves
        </Link>
      </li>
      <li>
        <Link to="/api/v1/donations" className="link">
          Donations
        </Link>
      </li>
      <li>
        <Link to="/api/v1/cards" className="link">
          Cards
        </Link>
      </li>
      <li>
        <Link to="/api/v1/invoices" className="link">
          Invoices
        </Link>
      </li>
    </ul>
  </nav>

  <Route path="/api/v1/users"></Route>
  <Route path="/api/v1/books"></Route>
  <Route path="/api/v1/authors"></Route>
  <Route path="/api/v1/cathegories"></Route>
  <Route path="/api/v1/reserves"></Route>
  <Route path="/api/v1/donations"></Route>
  <Route path="/api/v1/cards"></Route>
  <Route path="/api/v1/invoices"></Route>
</>;
>>>>>>> 0fcf1f42c5a7feb0451cb798b6ee68a02ca24119
