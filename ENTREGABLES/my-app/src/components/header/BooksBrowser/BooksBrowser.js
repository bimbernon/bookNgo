import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./BooksBrowser.css";

const BookBrowser = () => {
  const history = useHistory();
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [search, setSearch] = useState("");
  const [currentBook, setCurrentBook] = useState([]);

  history.listen((location) => {
    hideResults();
  });

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

  useEffect(() => {
    async function getAllAuthors() {
      const allAuthorsResponse = await fetch(
        "http://localhost:3080/api/v1/authors"
      );

      if (allAuthorsResponse.ok) {
        const allAuthorsData = await allAuthorsResponse.json();
        setAuthors(allAuthorsData);
      }
    }
    getAllAuthors();
  }, []);

  const hideResults = () => {
    setSearch("");
    setCurrentBook([]);
  };

  const filterBooks = (e) => {
    if (e.target.value === "") {
      hideResults();
      return;
    }

    setSearch(e.target.value);
    console.log(books);

    const selectedBook = books
      .filter((book) => {
        const s = search.toLocaleLowerCase();
        return (
          book.titulo.toLocaleLowerCase().includes(s) ||
          book.sipnosis.toLocaleLowerCase().includes(s) ||
          book.nombreautor.toLocaleLowerCase().includes(s) ||
          book.apel1.toLocaleLowerCase().includes(s)
        );
      })
      .slice(0, 5);

    setCurrentBook(selectedBook);
  };

  const renderBooksBrowser = (book) => {
    return (
      <li key={book.idlibro}>
        <Link
          to={`/books/id/${book.idlibro}`}
          style={{
            display: "grid",
            gridTemplateColumns: "60px auto",
            gap: "1rem",
          }}
        >
          <img
            src={`/images/books/${book.idlibro}.jpg`}
            alt={book.titulo}
            style={{ width: "50px" }}
          />
          <p>{book.titulo}</p>
        </Link>
      </li>
    );
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
                value={search}
                onBlur={(e) => {
                  setTimeout(hideResults, 200);
                }}
              />
              {currentBook.length > 0 && (
                <ul id="browser-options">
                  {currentBook.map(renderBooksBrowser)}
                </ul>
              )}
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
