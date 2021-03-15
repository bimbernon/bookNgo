import React, { useState, useEffect } from "react";
import "./BooksBrowser.css";

const BookBrowser = () => {
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState([]);

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

  // const renderCoincidences = (book) => (
  //   <li key={book.idlibro}>{book.titulo}</li>
  // );

  console.log(currentBook);

  const renderBooksBrowser = (book) => {
    return <option value={book.titulo}></option>;
  };

  return (
    <>
      <div className="browser-container">
        <ul className="browser-list">
          <li className="browser-item">
            <form className="ppal-browser-form">
              <input
                list="browser-options"
                type="search"
                className="ppal-browser"
                placeholder={`  Busca por título, autor, editorial...`}
                onChange={filterBooks}
              />
              <datalist id="browser-options">
                {currentBook.map(renderBooksBrowser)}
              </datalist>
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
          {/* <li className="browser-item">
            <button type="button" className="advanced-browser-button">
              <img
                className="button-logo"
                src="/logosProyecto/logoPrincipal/logo/logo_small_icon_only_inverted.png"
                alt="logo"
              />
            </button>
          </li> */}
        </ul>
      </div>
    </>
  );
};

export { BookBrowser };
