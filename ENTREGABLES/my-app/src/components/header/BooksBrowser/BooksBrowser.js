import React, { useState, useEffect } from "react";
import { AdvancedBrowser } from "./AdvancedBrowser/AdvancedBrowser";
import "./BooksBrowser.css";

const BookBrowser = () => {
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState({});

  useEffect(() => {
    async function getAllBooks() {
      const allBooksResponse = await fetch(
        "http://localhost:3080/api/v1/books"
      );

      if (allBooksResponse.ok) {
        const allBooksData = await allBooksResponse.json();
        setBooks(allBooksData);
      }
    }
    getAllBooks();
  }, []);

  const filterBooks = (e) => {
    const selectedBook = books.filter((book) =>
      book.titulo.includes(e.target.value)
    );

    setCurrentBook(selectedBook);
  };

  console.log(currentBook);

  return (
    <>
      <div className="browser-container">
        <ul className="browser-list">
          <li className="browser-item">
            <form className="ppal-browser-form">
              <input
                type="search"
                className="ppal-browser"
                onChange={filterBooks}
              />
              <button type="submit" className="ppal-browser-submit-button">
                <img
                  className="search-logo"
                  src="/icons/search.png"
                  alt="search"
                  style={{ height: "1rem", width: "1rem" }}
                />
              </button>
            </form>
          </li>
          <li className="browser-item">
            <button type="button" className="advanced-browser-button">
              <img
                className="button-logo"
                src="/logosProyecto/logoPrincipal/logo/logo_small_icon_only_inverted.png"
                alt="logo"
              />
            </button>
            <AdvancedBrowser />
          </li>
        </ul>
      </div>
    </>
  );
};

export { BookBrowser };
