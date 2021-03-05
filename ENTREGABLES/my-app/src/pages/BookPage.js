import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Book } from "../components/main/Book/Book";

function BookPage() {
  //CREAR UN USEEFFECT CON POST PARA CUANDO HAGAS ONCLIK EN EL BUTTON TE CREE UNA RESERVA
  const [book, setBook] = useState([]);
  let { bookId } = useParams();

  useEffect(() => {
    async function getBooksByCathegoryName() {
      const bookById = await (
        await fetch(`http://localhost:3080/api/v1/books/id/${bookId}`)
      ).json();

      console.log(bookById);

      setBook(bookById);
    }
    getBooksByCathegoryName();
  }, []);

  return (
    <div>
      <Book bookId={bookId}></Book>
      <button className="reserve-button">RESERVA</button>
    </div>
  );
}

export { BookPage };
