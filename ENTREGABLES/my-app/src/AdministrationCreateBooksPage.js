import React, { useState, useContext} from "react";
import { AuthContext } from "./components/providers/AuthProvider";
import "./pages/Administration/Administration.css";

export const CreateBook = () => {
    const [token] = useContext(AuthContext);
  const [cathegory, setCathegory] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [sinopsis, setSinopsis] = useState("")

  const handleChangeCathegory = (e) => setCathegory(e.target.value);
  const handleChangeAuthor = (e) => setAuthor(e.target.value);
  const handleChangeTitle = (e) => setTitle(e.target.value);
  const handleChangePrice = (e) => setPrice(e.target.value);
  const handleChangeStock = (e) => setStock(e.target.value);
  const handleChangePublisher = (e) => setPublisher(e.target.value);
  const handleChangeYear = (e) => setYear(e.target.value);
  const handleChangeSinopsis = (e) => setSinopsis(e.target.value);

  const handleSubmitBook = async (e) => {
    e.preventDefault();

    const resp = await fetch("http://localhost:3080/api/v1/books/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cathegory: cathegory,
        author: author,
        title: title,
        stock: stock,
        price: price,
        publisher: publisher,
        year: year,
        sinopsis: sinopsis,
      }),
    });
    if (resp.ok) {
      const respBody = await resp.json();
      setCathegory("");
      setAuthor("");
      setTitle("");
      setStock("");
      setPrice("");
      setPublisher("");
      setYear("");
      setSinopsis("");
    }
  };

  const [name, setName] = useState("");
  const [lastName1, setLastName1] = useState("");
  const [lastName2, setLastName2] = useState("");
  console.log(name, 'nombre')

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeLastName1 = (e) => setLastName1(e.target.value);
  const handleChangeLastName2 = (e) => setLastName2(e.target.value);

  const handleSubmitAuthor = async (e) => {
    e.preventDefault();
    console.log('holaa')

    const resp = await fetch("http://localhost:3080/api/v1/authors", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombreautor: name,
        apel1: lastName1,
        apel2: lastName2,
      }),
    });
    if (resp.ok) {
      const respBody = await resp.json();
      console.log(respBody)
      setName("");
      setLastName1("");
      setLastName2("");
    }
  };

  return (
    <div>
      <div className="register-container">
        <h1 className="register-form-title">Regístro de autores</h1>
        <form className="register-form" onSubmit={handleSubmitAuthor}>
          <div className="register-form-item">
            <input
              type="text"
              placeholder="Nombre del autor"
              value={name}
              onChange={handleChangeName}
            ></input>
          </div>
          <div className="register-form-item">
            <input
              type="text"
              placeholder="Primer apellido del autor"
              value={lastName1}
              onChange={handleChangeLastName1}
            ></input>
          </div>
          <div className="register-form-item">
            <input
              type="text"
              placeholder="segundo apellido del autor"
              value={lastName2}
              onChange={handleChangeLastName2}
            ></input>
          </div>
          <div className="register-button-container">
            <button className="register-submit-button" type="submit">
              +
            </button>
          </div>
        </form>
      </div>
      <div className="register-container">
        <h1 className="register-form-title">Regístro de libros</h1>

        <form className="register-form" onSubmit={handleSubmitBook}>
          <div className="register-form-item">
            <input
              type="text"
              placeholder="id de Categoria"
              value={cathegory}
              onChange={handleChangeCathegory}
            ></input>
          </div>
          <div className="register-form-item">
            <input
              type="text"
              placeholder="id de Autor"
              value={author}
              onChange={handleChangeAuthor}
            ></input>
          </div>
          <div className="register-form-item">
            <input
              type="text"
              placeholder="Titulo"
              value={title}
              onChange={handleChangeTitle}
            ></input>
          </div>
          <div className="register-form-item">
            <input
              type="text"
              placeholder="Stock"
              value={stock}
              onChange={handleChangeStock}
            ></input>
          </div>
          <div className="register-form-item">
            <input
              type="text"
              placeholder="Precio"
              value={price}
              onChange={handleChangePrice}
            ></input>
          </div>
          <div className="register-form-item">
            <input
              type="text"
              placeholder="Editorial"
              value={publisher}
              onChange={handleChangePublisher}
            ></input>
          </div>
          <div className="register-form-item">
            <input
              type="text"
              placeholder="Año de publicacion"
              value={year}
              onChange={handleChangeYear}
            ></input>
          </div>
          <div className="register-form-item">
            <input
              type="text"
              placeholder="Sinopsis"
              value={sinopsis}
              onChange={handleChangeSinopsis}
            ></input>
          </div>
          <div className="register-button-container">
            <button className="register-submit-button" type="submit">
              +
            </button>
          </div>
        </form>
        <button className="upload-book-photo-button">Subir foto</button>
      </div>
    </div>
  );
};
