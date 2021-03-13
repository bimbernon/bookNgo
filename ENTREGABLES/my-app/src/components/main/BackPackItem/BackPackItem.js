import React, { useEffect, useState, useContext } from "react";
import "./BackPackItem.css";
import { Book } from "../Book/Book";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { InsertReserve } from "../Reserve/InsertReserve/InsertReserve";

export const BackPackItem = () => {
  const [book, setBook] = useState({});
  const [token] = useContext(AuthContext);
  let { bookId } = useParams();

  useEffect(() => {
    async function getBookById() {
      const response = await fetch(
        `http://localhost:3080/api/v1/books/id/${bookId}`
      );
      if (response.ok) {
        const bookById = await response.json();
        setBook(bookById);
      } else {
        const error = new Error("Algo ha salido mal");
        throw error;
      }
    }
    getBookById();
  }, []);

  const result = token ? (
    <div className="backPack-container">
      <h1>Mi mochila</h1>
      <div className="book-backpack-container">
        <Book
          key={book.idlibro}
          bookId={book.idlibro}
          bookName={book.titulo}
          bookPrice={`Precio: ${book.precio}`}
        ></Book>
      </div>
      <div>
        <InsertReserve bookId={bookId} />
      </div>
    </div>
  ) : (
    <div className="backPack-container">
      <div>
        <Book
          key={book.idlibro}
          bookId={book.idlibro}
          bookName={book.titulo}
          bookPrice={`Precio: ${book.precio}`}
        ></Book>
      </div>
      <div bookId={bookId}>
        <InsertReserve />
        <h1
          style={{
            color: "red",
            minHeight: "1rem",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Debes estar logueado para poder reservar un libro
        </h1>
      </div>
    </div>
  );
  return result;
};
