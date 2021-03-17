import React, { useEffect, useState, useContext } from "react";
import "./BackPackItem.css";
import { Book } from "../Book/Book";
import { useParams, Redirect } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { UserContext } from "../../providers/UserProvider";
import { InsertReserve } from "../Reserve/InsertReserve/InsertReserve";

export const BackPackItem = () => {
  const [book, setBook] = useState({});
  const [token] = useContext(AuthContext);
  const [selectedUser] = useContext(UserContext);
  const [user, setUser] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);

  let { bookId } = useParams();
  console.log(bookId);
  useEffect(() => {
    async function getBookById() {
      const response = await fetch(
        `http://localhost:3080/api/v1/books/id/${bookId}`
      );
      if (response.ok) {
        const bookDataById = await response.json();
        setBook(bookDataById);
      } else {
        const error = new Error("Algo ha salido mal");
        throw error;
      }
    }
    getBookById();
  }, []);

  console.log(book);

  useEffect(() => {
    if (token) {
      async function getUserProfile() {
        const userResponse = await (
          await fetch(
            `http://localhost:3080/api/v1/users/id/${selectedUser.idusuario}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
        ).json();
        setUser(userResponse);
      }
      getUserProfile();
    } else {
      setErrorMsg()
    }
  }, []);

  if (!token) return <Redirect to="/" />;

   return (
    <div className="backPack-container">
      <h1>Mi mochila</h1>
      <div className="book-backpack-container">
        <Book
          key={book.idlibro}
          bookId={book.idlibro}
          bookName={book.titulo}
          bookPrice={`Precio: ${book.precio}`}
        ></Book>
      </div>
      <div>
        <InsertReserve book={book} userMoney={user.monedero} />
      </div>
    </div>
  ) 
};