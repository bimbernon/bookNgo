import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../components/providers//UserProvider";
import { Invoice } from "../components/main/Invoice/Invoice";

const InvoiceDetails = () => {
  const [selectedUser] = useContext(UserContext);

  return (
    <div className="reserve-details-container">
      <h1>{}</h1>
    </div>
  );
};

export { InvoiceDetails };
