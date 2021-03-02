import React, { useState, useEffect } from "react";
import { Book } from "../Book/Book";

const LatestNews = (props) => {
  const [lastBooks, setLastBooks] = useState([]);

  useEffect(() => {
    async function getLatestBooks() {
      const latestBooks = await (
        await fetch("http://localhost:3080/api/v1/books")
      ).json();
      setLastBooks(latestBooks);
    }
    getLatestBooks();
  }, []);

  const render = (book) => {
    <Book key={book.bookId} bookName={book.title} bookId={book.bookId}></Book>;
    console.log(book);
  };

  return (
    <div className="div-latest-news">
      <h2 className="title-latest-news">Ultimas novedades</h2>
      <ul className="last-books-list">{lastBooks.map(render)}</ul>
    </div>
  );
};

export { LatestNews };
