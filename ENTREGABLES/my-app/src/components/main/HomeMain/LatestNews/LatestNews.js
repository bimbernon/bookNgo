import React, { useState, useEffect } from "react";
import { Book } from "../../Book/Book";
import "./LatestNews.css";

const LatestNews = () => {
  const [lastBooks, setLastBooks] = useState([]);

  useEffect(() => {
    async function getLatestBooks() {
      const latestBooks = await (
        await fetch("http://localhost:3080/api/v1/books/lastBooks")
      ).json();
      setLastBooks(latestBooks);
    }
    getLatestBooks();
  }, []);

  const style = {
    backgroundColor: "rgb(219, 187, 135)",
    height: "15rem",
  };

  const render = (book) => (
    <Book
      style={style}
      key={book.idlibro}
      bookName={book.titulo}
      bookId={book.idlibro}
      bookAuthor={`${book.nombreautor} ${book.apel1}`}
    ></Book>
  );

  return (
    <div className="latest-news-container">
      <h2 className="title-latest-news">Ultimas novedades</h2>
      <ul className="last-books-list">{lastBooks.map(render)}</ul>
    </div>
  );
};

export { LatestNews };
