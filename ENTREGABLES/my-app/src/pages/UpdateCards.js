import React, { useContext } from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { AddCardForm } from "../components/main/AddCardForm/AddCardForm";
import { AuthContext } from "../components/providers/AuthProvider";

function UpdateCards() {
  const [token] = useContext(AuthContext);

  if (!token) return <Redirect to="/" />;

  return (
    <Router>
      <AddCardForm />
    </Router>
  );
}

export { UpdateCards };
