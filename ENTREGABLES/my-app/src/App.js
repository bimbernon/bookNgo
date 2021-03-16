import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { UserProvider } from "./components/providers/UserProvider";
import { AuthProvider } from "./components/providers/AuthProvider";
import { BagProvider } from "./components/providers/BagProvider";

import { HeaderContainer } from "./components/header/HeaderContainer/HeaderContainer";
import { Footer } from "../src/components/footer/Footer";

import { Home } from "./pages/Home";
import { UserDonations } from "./pages/UserDonations";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { BooksByCathegory } from "./pages/BooksByCathegory";
import { BookPage } from "./pages/BookPage";
import { BackPack } from "./pages/Backpack";
import { ModifyUserProfile } from "./pages/ModifyUserProfile";
import { ModifyUserPassword } from "./pages/ModifyUserPassword";
import { UserPursePage } from "./pages/UserPursePage";
import { Administration } from "./pages/Administration/Administration";
import { UserProfile } from "./pages/UserProfile";
import { UserReserves } from "./pages/UserReserves";
import { InvoiceDetails } from "./pages/InvoiceDetails";
import { UpdateCards } from "./pages/UpdateCards";
import { AdministrationUsersPage } from "./pages/Administration/AdministrationUsersPage";
import { AdministrationBooksPage } from "./pages/Administration/AdministrationBooksPage";
import { AdministrationDonationsPage } from "./pages/Administration/AdministrationDonationsPage";
import { CreateBook } from "./pages/Administration/AdministrationCreateBooksPage";

function App() {
  const style = {
    backgroundImage: `url("/background_photos/background_image.jpg")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundPosition: "center",
  };

  return (
    <AuthProvider>
      <UserProvider>
        <BagProvider>
          <Router>
            <div className="cuerpo" style={style}>
              <HeaderContainer />
              <main style={{ flexGrow: 1 }}>
                <Switch>
                  <Route path="/cathegory/books/:nameCathegory">
                    <BooksByCathegory />
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
                  <Route path="/user/profile/modify/:userId">
                    <ModifyUserProfile />
                  </Route>
                  <Route path="/user/updatePassword/:userId">
                    <ModifyUserPassword />
                  </Route>
                  <Route path="/reserves/:userId">
                    <UserReserves />
                  </Route>
                  <Route path="/reserve/invoice">
                    <InvoiceDetails />
                  </Route>
                  <Route path="/users/purse/:userId">
                    <UserPursePage />
                  </Route>
                  <Route path="/donations/update/:donationId">
                    <AdministrationDonationsPage />
                  </Route>
                  <Route path="/cards">
                    <UpdateCards />
                  </Route>
                  <Route path="/administration">
                    <Administration />
                  </Route>
                  <Route path="/donations/create">
                    <UserDonations />
                  </Route>
                  <Route path="/users/">
                    <AdministrationUsersPage />
                  </Route>
                  <Route path="/books/create">
                    <CreateBook />
                  </Route>
                  <Route path="/books/">
                    <AdministrationBooksPage />
                  </Route>
                  {/* <Route path="/donations/">
                    <AdministrationDonationsPage />
                  </Route> */}
                  <Route path="/user/book/mochila/:bookId">
                    <BackPack />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </main>
              <Footer />
            </div>
          </Router>
        </BagProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export { App };
