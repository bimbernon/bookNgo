import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { DonationsForm } from "../components/main/DonationsForm/DonationsForm";

function UserDonations() {
  return (
    <Router>
      <div>
        <DonationsForm />
      </div>
    </Router>
  );
}

export { UserDonations };
