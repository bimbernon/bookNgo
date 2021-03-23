import React, { useState, useContext, useEffect } from "react";
import {useParams} from "react-router-dom";
import { UserContext } from "../components/providers//UserProvider";
import { AuthContext } from "../components/providers/AuthProvider";
import { Invoice } from "../components/main/Invoice/Invoice";

const InvoiceDetails = (props) => {
  const {reserve} = props;


  return (
    <div className="reserve-details-container">
      <Invoice ></Invoice>
    </div>
  );
};

export { InvoiceDetails };
