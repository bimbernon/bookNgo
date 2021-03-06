import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BookDetails } from "../components/main/BookDetails/BookDetails";

function BookPage() {
  const [book, setBook] = useState([]);
  let { bookId } = useParams();

  useEffect(() => {
    async function getBooksByCathegoryName() {
      const bookById = await (
        await fetch(`http://localhost:3080/api/v1/books/id/${bookId}`)
      ).json();

      setBook(bookById);
    }
    getBooksByCathegoryName();
  }, []);

  const render = (book) => (
    <BookDetails
      key={book.bookId}
      bookName={book.title}
      bookId={book.bookId}
      bookPrice={book.price}
      bookAuthor={`${book.Autor.nameAuthor} ${book.Autor.lastname1} `}
    ></BookDetails>
  );

  return (
    <div className="book-details-container">
      <ul className="book-details-list">{book.map(render)}</ul>
      <Link to={`/user/${bookId}/mochila`}>
      <button className="book-details-reserve-button">RESERVAR</button>
      </Link>
    </div>
  );
};

export { BookPage };
