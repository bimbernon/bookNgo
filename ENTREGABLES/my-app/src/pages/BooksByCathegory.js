import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Book } from "../components/main/Book/Book";

export function BooksByCathegory() {
  const [books, setBooks] = useState([]);
  const [back, setBack] = useState(-1);

  let { nameCathegory } = useParams();

  useEffect(() => {
    async function getBooksByCathegoryName() {
      const booksByCathegoryName = await (
        await fetch(
          `http://localhost:3080/api/v1/books/cathegory/nameCathegory/${nameCathegory}`
        )
      ).json();
      setBooks(booksByCathegoryName);
      setBack(back - 1);
    }
    getBooksByCathegoryName();
  }, []);

  const renderBooks = (book) => (
    <Book
      key={book.idLibro}
      bookName={book.titulo}
      bookId={book.idLibro}
      bookAuthor={`${book.Autor.nombreAutor} ${book.Autor.apellido1} `}
    />
  );

  return (
    <div className="book-list-container">
      <h1 className="cathegory-list-title">{nameCathegory}</h1>

      <ul className="book-list-ul">{books.map(renderBooks)}</ul>
    </div>
  );
}
