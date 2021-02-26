import React, { useState, useEffect } from "react";

export const LatestNews = () => {
  const [lastBooks, setLastBooks] = useState([]);

  useEffect(() => {
    async function getLatestBooks() {
      const latestBooks = await (
        await fetch("http://localhost:3080/api/v1/books")
      ).json();
      console.log(latestBooks);
    }
    getLatestBooks();
  }, []);

  return (
    <div className="div-latest-news">
      <h2 className="title-latest-news">Ultimas novedades</h2>
      <ul className="list-latest-news">
        <li>
          <a href="grtgwrg">Libro 1</a>
        </li>
        <li>
          <a href="wregwgt">Libro 2</a>
        </li>
        <li>
          <a href="gwrgwgtr">Libro 3</a>
        </li>
        <li>
          <a href="gwtrgwrgt">Libro 4</a>
        </li>
        <li>
          <a href="ehtheth">Libro 5</a>
        </li>
      </ul>
    </div>
  );
};
