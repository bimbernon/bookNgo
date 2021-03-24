import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../components/providers/AuthProvider";

export const Administration = () => {
  const [token] = useContext(AuthContext);

  if (!token) return <Redirect to="/" />;

  return (
    <div className="administration-page-container">
      <h1 className="administration-title">Administración </h1>
      <div className="administration-item-container">
        <Link to="/users">USUARIOS</Link>
      </div>
      <div className="administration-item-container">
        <Link to="/books">LIBROS</Link>
      </div>
      <div className="administration-item-container">
        <Link to="/donations">DONACIONES</Link>
      </div>
    </div>
  );
};
