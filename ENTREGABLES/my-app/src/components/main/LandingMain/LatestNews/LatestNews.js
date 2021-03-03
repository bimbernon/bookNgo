import React, { useState, useEffect } from "react";
import { Book } from "../Book/Book";
import "./LatestNews.css";

const LatestNews = () => {
  const [lastBooks, setLastBooks] = useState([]);

  useEffect(() => {
    async function getLatestBooks() {
      const latestBooks = await (
        await fetch("http://localhost:3080/api/v1/books")
      ).json();
      setLastBooks(latestBooks);
      console.log(latestBooks);
    }
    getLatestBooks();
  }, []);

  const render = (book) => (
    <Book key={book.bookId} bookName={book.title} bookId={book.bookId}></Book>
  );

  return (
    <div className="latest-news-container">
      <h2 className="title-latest-news">Ultimas novedades</h2>
      <ul className="last-books-list">{lastBooks.map(render)}</ul>
    </div>
  );
};

export { LatestNews };
