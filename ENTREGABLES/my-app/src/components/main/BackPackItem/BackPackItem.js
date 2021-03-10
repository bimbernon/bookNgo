import React, { useEffect, useState, useContext } from "react";
import "./BackPackItem.css";
import { Book } from "../Book/Book";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

export const BackPackItem = () => {
  const [book, setBook] = useState({});
  const [token] = useContext(AuthContext);
  let { bookId } = useParams();
  console.log(bookId, "bookId del params");
  console.log(book, "book");

  useEffect(() => {
    async function getBookById() {
      const response = await fetch(
        `http://localhost:3080/api/v1/books/id/${bookId}`
      );
      console.log(response, "response");
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
        <button className="pay-button" type="submit">
          Pagar
        </button>
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
      <div>
        <button className="pay-button" type="submit">
          Pagar
        </button>
        <h1
          style={{
            color: "red",
            minHeight: "1.5em",
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
