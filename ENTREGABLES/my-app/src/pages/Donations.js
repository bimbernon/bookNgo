import React, {Router } from "react";
import { DonationsForm } from "../components/DonationsForm/DonationsForm";

function Donations() {
  return (
    <Router>
      <div>
        <DonationsForm />
      </div>
    </Router>
  );
}

export { Donations };
