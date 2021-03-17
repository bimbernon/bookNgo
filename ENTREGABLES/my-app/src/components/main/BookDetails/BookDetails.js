import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Book } from "../Book/Book";
// import { BagContext } from "../../providers/BagProvider";
import Loading from "../../Loading";

import "./BookDetails.css";

export const BookDetails = () => {
  const [book, setBook] = useState(null);
  let { bookId } = useParams();
  const [back, setBack] = useState(-1);
  // const [reserve, setReserve] = useState([]);
  // const doSuccessInsert = (responseBody) => setReserve(bookId);

  useEffect(() => {
    async function getBookById() {
      const bookResponse = await fetch(
        `http://localhost:3080/api/v1/books/id/${bookId}`
      );

      if (bookResponse.ok) {
        const bookResponseData = await bookResponse.json();
        setBook(bookResponseData);
        // onSuccessInsert(bookResponseData);
      }
    }
    getBookById();
  }, []);

  if (!book) return <Loading />;

  const style = {
    borderRadius: "1rem",
    backgroundColor: "white",
    margin: "20px",
    width: "85vw",
  };

  const styleButton = {
    backgroundColor: "red",
  };

  return book.stock === 0 ? (
    <div className="book-details-container">
      <a href={`javascript:history.go(${back})`} className="back-button">
        <img src={`/icons/back.png`} height="30" width="30" alt="Botón" />
      </a>
      <Book
        bookId={book.idlibro}
        style={style}
        key={book.idlibro}
        bookName={book.titulo}
        bookAuthor={`${book.nombreautor} ${book.apel1}`}
        bookPrice={`Precio: ${book.precio}`}
        bookSinopsis={book.sinopsis}
        stockMsg={`Actualmente no tenemos stock disponible para este libro.`}
      ></Book>

      <button
        style={styleButton}
        type="submit"
        className="book-details-reserve-button"
        bookId={bookId}
        // onSuccessInsert={doSuccessInsert}
      >
        Reservar
      </button>
    </div>
  ) : (
    <div className="book-details-container">
      <a href={`javascript:history.go(${back})`} className="back-button">
        <img src={`/icons/back.png`} height="30" width="30" alt="Botón" />
      </a>
      <Book
        bookId={book.idlibro}
        style={style}
        key={book.idlibro}
        bookName={book.titulo}
        bookAuthor={`${book.nombreautor} ${book.apel1}`}
        bookPrice={`Precio: ${book.precio}`}
        bookSinopsis={book.sinopsis}
      ></Book>
      <Link to={`/user/book/mochila/${bookId}`}>
        <button
          type="submit"
          className="book-details-reserve-button"
          bookId={bookId}
        >
          Reservar
        </button>
      </Link>
    </div>
  );
};
