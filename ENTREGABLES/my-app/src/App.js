import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HeaderContainer } from "./components/header/HeaderContainer/HeaderContainer";
import { Footer } from "../src/components/footer/Footer";
import { Home } from "./pages/Home";
import { Donations } from "./pages/Donations";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { BooksByCathegory } from "./pages/BooksByCathegory";

function App() {
  return (
    <Router>
      <div>
        <HeaderContainer />
        <Switch>
          <Route path="/cathegory/books/:nameCathegory">
            <BooksByCathegory />
          </Route>
          <Route path="/donations">
            <Donations />
          </Route>
          <Route path="/users/register">
            <Register />
          </Route>
          <Route path="/users/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export { App };
