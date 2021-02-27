import React, { useState, useEffect } from "react";

export const LatestNews = () => {
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

  const latest = lastBooks.map((book) => (
    <li key={book.title}>
      <a href="fefverf">{book.title}</a>
    </li>
  ));

  return (
    <div className="div-latest-news">
      <h2 className="title-latest-news">Ultimas novedades</h2>
      <ul>{latest}</ul>
    </div>
  );
};
