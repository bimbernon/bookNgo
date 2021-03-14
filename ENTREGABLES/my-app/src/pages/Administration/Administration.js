import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../components/providers/AuthProvider";

export const Administration = () => {
  const [token] = useContext(AuthContext);

  return (
    <div className="administration-page-container">
      <div className="administration-item-container">
        <Link to="/users">USUARIOS</Link>
      </div>
      <div className="administration-item-container-books">
        <div>LIBROS</div>
        <div className="books-links-container">
          <Link to="/books/create">Añadir</Link>
          <Link to="/books">Borrar</Link>
        </div>
      </div>
      <div className="administration-item-container">
        <Link to="/donations">DONACIONES</Link>
      </div>
    </div>
  );
};
