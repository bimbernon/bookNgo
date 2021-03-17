import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../components/providers/AuthProvider";
import { Book } from "../../components/main/Book/Book";
import Swal from "sweetalert2";
import "./Administration.css";

export function AdministrationBooksPage() {
  const [token] = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [, setErrorMsg] = useState("");

  useEffect(() => {
    async function getAllBooks() {
      const booksResponse = await fetch(`http://localhost:3080/api/v1/books`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (booksResponse.ok) {
        const booksData = await booksResponse.json();
        setBooks(booksData);
      } else {
        await booksResponse.json();
        setErrorMsg("Algo ha salido mal...");
      }
    }
    getAllBooks();
  }, []);

  const handleDeleteBook = (id) => {
    Swal.fire({
      title: `¿Estás seguro de que quieres eliminar el libro ${
        books.find((book) => book.idlibro === id).titulo
      }?`,
      // text: `ejemplo`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e1b470",
      cancelButtonColor: "#ec511d",
      confirmButtonText: "SI",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBookById(id);
      }
    });
  };

  const deleteBookById = async (id) => {
    const deleteBookResponse = await fetch(
      `http://localhost:3080/api/v1/books/delete/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (deleteBookResponse.ok) {
      setBooks(books.filter((book) => book.idlibro !== id));
    } else {
      setErrorMsg("Algo ha salido mal...");
    }
  };

  const style = {
    height: "12.5rem",
    width: "17rem",
  };

  const deleteStyle = {
    background: `url("/icons/delete-red-button.png")`,
    backgroundSize: "cover",
    height: "1.9rem",
    width: "1.7rem",
  };

  const renderBooks = (book) => (
    <div className="admin-book-container">
      <Book
        style={style}
        bookId={book.idlibro}
        key={book.idlibro}
        bookName={book.titulo}
        imageId={book.idlibro}
      />
      <form>
        <button
          className="delete-book-button"
          style={deleteStyle}
          value={book.idlibro}
          onClick={(e) => {
            e.preventDefault();
            handleDeleteBook(book.idlibro);
          }}
        />
      </form>
    </div>
  );

  if (!token) return <Redirect to="/" />;

  return (
    <div>
      <Link to={`/administration`}>
        <img
          src={`/icons/back.png`}
          height="30"
          width="30"
          alt="Botón"
          style={{ position: "relative", left: "3.5rem", top: "1rem" }}
        />
      </Link>
      <Link to="/books/create">
        <div className="add-book-button-container">
          <button className="add-book-submit-button" type="submit">
            +
          </button>
        </div>
      </Link>

      <ul className="all-books-list">{books.map(renderBooks)}</ul>
    </div>
  );
}
