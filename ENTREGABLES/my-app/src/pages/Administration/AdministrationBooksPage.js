import React, { useState, useEffect, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { AuthContext } from "../../components/providers/AuthProvider";
import { Book } from "../../components/main/Book/Book";
import Swal from "sweetalert2";
import "./Administration.css";

export function AdministrationBooksPage() {
  const [token] = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [deleteBook, setDeleteBook] = useState(false);

  useEffect(() => {
    async function getAllBooks() {
      const booksResponse = await fetch(`http://localhost:3080/api/v1/books`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (booksResponse.ok) {
        const booksData = await booksResponse.json();
        setBooks(booksData);
      } else {
        const errorMsg = await booksResponse.json();
        setErrorMsg("Algo ha salido mal...");
      }
    }
    getAllBooks();
  }, []);

  const handleDeleteBook = (e) => {
    e.preventDefault();
    console.log(e);

    Swal.fire({
      title: `¿Estás seguro de que quieres eliminar el libro ${e.target.value}?`,
      text: `ejemplo`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e1b470",
      cancelButtonColor: "#ec511d",
      confirmButtonText: "SI",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBookById(e);
      }
    });
  };

  const deleteBookById = async (e) => {
    console.log("EVENTO PROPAGADO " + e.lastChild);
    const deleteBookResponse = await fetch(
      `http://localhost:3080/api/v1/books/delete/${e.target.value}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (deleteBookResponse.ok) {
      setDeleteBook(true);
      const deletedBook = await deleteBookResponse.json();
    } else {
      const errorMsg = await deleteBookResponse.json();
      setErrorMsg("Algo ha salido mal...");
    }
  };

  const style = {
    height: "10rem",
  };
  const deleteStyle = {
    background: `url("/icons/delete.png")`,
    backgroundSize: "cover",
    height: "1.2rem",
    width: "1.2rem",
  };

  const renderBooks = (book) => (
    <div className="admin-book-container">
      <Book
        style={style}
        key={book.idlibro}
        bookName={book.titulo}
        imageId={book.idlibro}
        bookAuthor={`${book.nombreautor} ${book.apel1}`}
        bookPrice={`Precio: ${book.precio}`}
      ></Book>
      <form>
        <button
          className="delete-book-button"
          style={deleteStyle}
          value={book.idlibro}
          onClick={handleDeleteBook}
        >
          {/* <img
            src="/icons/delete.png"
            alt="borrar"
            style={{ height: "1.2rem", width: "1.2rem" }}
          /> */}
        </button>
      </form>
    </div>
  );

  return (
    <div>
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
