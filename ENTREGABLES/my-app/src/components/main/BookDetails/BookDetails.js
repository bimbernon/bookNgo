import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Book } from "../Book/Book";
import "./BookDetails.css";

export const BookDetails = (props) => {
  const [book, setBook] = useState({});

  let { bookId } = useParams();

  useEffect(() => {
    async function getBookById() {
      const bookById = await (
        await fetch(`http://localhost:3080/api/v1/books/id/${bookId}`)
      ).json();
      setBook(bookById);
    }
    getBookById();
  }, []);

  console.log(book);

  const style = {
    borderRadius: "1rem",
    backgroundColor: "white",
    margin: "20px",
    width: "85vw",
  };

  return (
    <div className="book-details-container">
      <Book
        bookId={book.idLibro}
        style={style}
        key={book.idLibro}
        bookName={book.titulo}
        // bookAuthor={`${book.Autor.nombreAutor} ${book.Autor.apellido1}`}
        bookPrice={`Precio: ${book.precio}`}
        bookSinopsis={book.sinopsis}
      ></Book>
    </div>
  );
};
