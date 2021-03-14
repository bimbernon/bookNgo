import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../components/providers/AuthProvider";
import { Book } from "../../components/main/Book/Book";
import "./Administration.css";

function AdministrationBooksPage() {
  const [token] = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [deleteBook, setDeleteBook] = useState([]);

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

  useEffect(() => {
    async function deleteBook() {
      const deleteBookResponse = await fetch(
        `http://localhost:3080/api/v1/books/${books.idlibro}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (deleteBookResponse.ok) {
        const deleteBookData = await deleteBookResponse.json();
        setDeleteBook(deleteBookData);
      } else {
        const errorMsg = await deleteBookResponse.json();
        setErrorMsg("Algo ha salido mal...");
      }
    }
    deleteBook();
  }, []);

  const renderBooks = (book) => (
    <div className="admin-book-container">
      <Book
        key={book.idlibro}
        bookName={book.titulo}
        imageId={book.idlibro}
        bookAuthor={`${book.nombreautor} ${book.apel1}`}
        bookPrice={`Precio: ${book.precio}`}
      ></Book>
      <button className="delete-book-button" onSubmit="/">
        <img
          src="/icons/delete.png"
          alt="borrar"
          style={{ height: "1.2rem", width: "1.2rem" }}
        />
      </button>
    </div>
  );

  return (
    <div>
      <ul className="all-books-list">{books.map(renderBooks)}</ul>
    </div>
  );
}

export { AdministrationBooksPage };
