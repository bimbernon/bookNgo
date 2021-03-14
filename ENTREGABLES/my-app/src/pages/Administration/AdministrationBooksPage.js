import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../components/providers/AuthProvider";
import { Book } from "../../components/main/Book/Book";
import "./Administration.css";

export function AdministrationBooksPage() {
  const [token] = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [deleteBook, setDeleteBook] = useState("");
  console.log(books);
  console.log(deleteBook);

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

  const handleDeleteBook = (e) => setDeleteBook(e.targuet.value);

  useEffect(() => {
    async function deleteBookById() {
      const deleteBookResponse = await fetch(
        `http://localhost:3080/api/v1/books/${books.idlibro}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (deleteBookResponse.ok) {
        const deletedBook = await deleteBookResponse.json();
      } else {
        const errorMsg = await deleteBookResponse.json();
        setErrorMsg("Algo ha salido mal...");
      }
    }
    deleteBookById();
  }, []);

  const style = {
    height: "10rem",
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
      <form onSubmit={AdministrationBooksPage}>
        <button
          className="delete-book-button"
          value={books.idlibro}
          onClick={handleDeleteBook}
        >
          <img
            src="/icons/delete.png"
            alt="borrar"
            style={{ height: "1.2rem", width: "1.2rem" }}
          />
        </button>
      </form>
    </div>
  );

  return (
    <div>
      <ul className="all-books-list">{books.map(renderBooks)}</ul>
    </div>
  );
}
