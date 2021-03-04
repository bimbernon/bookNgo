import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Book } from "../components/main/Book/Book";

export function BooksByCathegory() {
  const [books, setBooks] = useState([]);
  let { nameCathegory } = useParams();

  useEffect(() => {
    async function getBooksByCathegoryName() {
      const booksByCahegoryName = await (
        await fetch(
          `http://localhost:3080/api/v1/books/cathegory/nameCathegory/${nameCathegory}`
        )
      ).json();

      console.log(booksByCahegoryName);

      setBooks(booksByCahegoryName);
    }
    getBooksByCathegoryName();
  }, []);

  const render = (book) => (
    <Book key={book.bookId} bookName={book.title} bookId={book.bookId}></Book>
  );

  return (
    <div>
      {nameCathegory}
      <ul>{books.map(render)}</ul>
    </div>
  );
}
