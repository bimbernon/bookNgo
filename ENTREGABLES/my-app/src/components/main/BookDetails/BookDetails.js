import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import { Book } from "../Book/Book";
import Loading from "../../Loading";
import Swal from "sweetalert2";

import "./BookDetails.css";
import { AuthContext } from "../../providers/AuthProvider";

export const BookDetails = () => {
  const [book, setBook] = useState(null);
  let { bookId } = useParams();
  const [back, setBack] = useState(-1);
  const [date, setDate] = useState([]);
  const [token] = useContext(AuthContext);
  const newDate = date.fechadevolucion;

  useEffect(() => {
    async function getBookById() {
      const bookResponse = await fetch(
        `http://localhost:3080/api/v1/books/id/${bookId}`
      );

      if (bookResponse.ok) {
        const bookResponseData = await bookResponse.json();
        setBook(bookResponseData);
      }
    }
    getBookById();
  }, []);

  useEffect(() => {
    async function getFirstDateToReserve() {
      const dateResponse = await fetch(
        `http://localhost:3080/api/v1/reserves/reserveEnd/${bookId}`
      );

      if (dateResponse.ok) {
        const dateResponseData = await dateResponse.json();
        setDate(dateResponseData);
      }
    }
    getFirstDateToReserve();
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

  const handleLink = (e) =>
    !token ? (
      Swal.fire({
        icon: "error",
        title: "Lo sentimos",
        text: "Tienes que ser Booker para poder hacer reservas.",
      })
    ) : (
      <Redirect to={`/user/book/mochila/${bookId}`} />
    );

  return book.stock === 0 ? (
    <div className="book-details-container">
      <a href={`javascript:history.go(${back})`} className="back-button">
        <img
          src={`/icons/brown-back-button.svg`}
          height="30"
          width="30"
          alt="Botón"
          style={{ position: "relative", top: "4rem", right: "8rem" }}
        />
      </a>
      <Book
        bookId={book.idlibro}
        style={style}
        key={book.idlibro}
        bookName={book.titulo}
        bookAuthor={`${book.nombreautor} ${book.apel1}`}
        bookPrice={`Precio: ${book.precio}`}
        bookSinopsis={book.sinopsis}
        stockMsg={`Actualmente no tenemos stock disponible para este libro. Podras reservarlo a partir del ${newDate}`}
      ></Book>

      <button
        style={styleButton}
        type="submit"
        className="book-details-reserve-button"
        value={bookId}
      >
        Reservar
      </button>
    </div>
  ) : !token ? (
    <div className="book-details-container">
      <a href={`javascript:history.go(${back})`} className="back-button">
        <img
          src={`/icons/brown-back-button.svg`}
          height="30"
          width="30"
          alt="Botón"
          style={{ position: "relative", top: "4rem", right: "8rem" }}
        />
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
      <button
        type="submit"
        className="book-details-reserve-button"
        bookId={bookId}
        onClick={handleLink}
      >
        Reservar
      </button>
    </div>
  ) : (
    <div className="book-details-container">
      <a href={`javascript:history.go(${back})`} className="back-button">
        <img
          src={`/icons/brown-back-button.svg`}
          height="30"
          width="30"
          alt="Botón"
          style={{ position: "relative", top: "4rem", right: "8rem" }}
        />
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
          onClick={handleLink}
        >
          Reservar
        </button>
      </Link>
    </div>
  );
};
{
}
