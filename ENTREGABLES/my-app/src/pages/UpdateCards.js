import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AddCardForm } from "../components/main/AddCardForm/AddCardForm";

function UpdateCards() {
  return (
    <Router>
      <AddCardForm />
    </Router>
  );
}

export { UpdateCards };
