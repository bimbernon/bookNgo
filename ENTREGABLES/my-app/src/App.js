import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HeaderContainer } from "./components/header/HeaderContainer/HeaderContainer";
import { Footer } from "../src/components/footer/Footer";
import { Home } from "./pages/Home";
import { Donations } from "./pages/Donations";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { BooksByCathegory } from "./pages/BooksByCathegory";
import { UserProvider } from "./components/providers/UserProvider";
import { BookPage } from "./pages/BookPage";
import { BackPack } from "./pages/Backpack";
import { AuthProvider } from "./components/providers/AuthProvider";
import { UserProfile } from "./pages/UserProfile";
import { UserReservesPage } from "./pages/UserReservesPage";
import { UserPursePage } from "./pages/UserPursePage";
import { Administration } from "./pages/Administration";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
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
              <Route path="/books/id/:bookId">
                <BookPage />
              </Route>
              <Route path="/users/profile/:userId">
                <UserProfile />
              </Route>
              <Route path="/reserves/:userId">
                <UserReservesPage/>
              </Route>
              <Route path="/users/purse/:userId">
                <UserPursePage />
              </Route>
              <Route path="/administration">
                <Administration />
              </Route>
              <Route path="/user/:bookId/mochila">
                <BackPack />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
            <Footer />
          </div>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export { App };
