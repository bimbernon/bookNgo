import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AdministrationUsersPage } from "./AdministrationUsersPage";
import { AdministrationBooksPage } from "./AdministrationBooksPage";
import { AdministrationDonationsPage } from "./AdministrationDonationsPage";
import { AdministrationInvoicesPage } from "./AdministrationInvoicesPage";
import { AuthContext } from "../../components/providers/AuthProvider";

export const Administration = () => {
  const [token] = useContext(AuthContext);

  return (
    <div className="administration-page-container">
      <div className="administration-item-container">
        <Link to="/users">USUARIOS</Link>
      </div>
      <div className="administration-item-container">
        <Link to="/books">LIBROS</Link>
      </div>
      <div className="administration-item-container">
        <Link to="/donations">DONACIONES</Link>
      </div>
      <div className="administration-item-container">
        <Link to="/invoices">FACTURAS</Link>
      </div>
    </div>
  );
};
