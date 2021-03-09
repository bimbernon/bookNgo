import React, { useEffect, useState } from "react";
import "./BackPackItem.css"
import { Book } from "../Book/Book";
import { useParams} from "react-router-dom";

export const BackPackItem = () => {
  const [book, setBook] = useState([]);
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

  return (
    <div className="backPack-container">
      <Book
        key={book.idlibro}
        bookId={book.idlibro}
        bookName={book.titulo}
        bookPrice={`Precio: ${book.precio}`}
      ></Book>
      <button className="pay-button" type="submit"></button>
    </div>
  );
};

