import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../components/providers//UserProvider";
import { AuthContext } from "../components/providers/AuthProvider";
import { Invoice } from "../components/main/Invoice/Invoice";

const InvoiceDetails = () => {
  const [token] = useContext(AuthContext);

  return (
    <div className="reserve-details-container">
      <Invoice></Invoice>
    </div>
  );
};

export { InvoiceDetails };
