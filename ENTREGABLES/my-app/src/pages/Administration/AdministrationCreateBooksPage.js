import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../components/providers/AuthProvider";
// import { Cathegory } from "../../components/main/HomeMain/Cathegory/Cathegory";
import "./Administration.css";

export const CreateBook = () => {
  const [cathegories, setCathegory] = useState([]);
  const [currentCathegory, setCurrentCathegory] = useState({});

  useEffect(() => {
    async function getCathegories() {
      const cathegoriesResponse = await (
        await fetch("http://localhost:3080/api/v1/cathegories/")
      ).json();
      setCathegory(cathegoriesResponse);
    }
    getCathegories();
  }, []);

  const renderCathegories = (ctg) => (
    <option value={ctg.idcategoria}>{ctg.nombrecategoria}</option>
  );

  const handleSelectedCathegory = (e) => {
    const selectedCathegory = cathegories.find((ctg) => {
      return parseInt(ctg.idcategoria) === parseInt(e.target.value);
    });
    console.log(selectedCathegory);
    setCurrentCathegory(selectedCathegory);
  };

  const [authors, setAuthors] = useState([]);
  const [currentAuthor, setCurrentAuthor] = useState({});

  useEffect(() => {
    async function getAllAuthors() {
      const authorsResponse = await (
        await fetch("http://localhost:3080/api/v1/authors/")
      ).json();
      setAuthors(authorsResponse);
    }
    getAllAuthors();
  }, []);

  const renderAuthors = (author) => (
    <option
      value={author.idautor}
    >{`${author.nombreautor} ${author.apel1}`}</option>
  );

  const handleSelectedAuthor = (e) => {
    const selectedAuthor = authors.find((author) => {
      return parseInt(author.idautor) === parseInt(e.target.value);
    });
    console.log(selectedAuthor);
    setCurrentAuthor(selectedAuthor);
  };

  const [token] = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [name, setName] = useState("");
  const [lastName1, setLastName1] = useState("");
  const [lastName2, setLastName2] = useState("");

  const handleChangeTitle = (e) => setTitle(e.target.value);
  const handleChangePrice = (e) => setPrice(e.target.value);
  const handleChangeStock = (e) => setStock(e.target.value);
  const handleChangePublisher = (e) => setPublisher(e.target.value);
  const handleChangeYear = (e) => setYear(e.target.value);
  const handleChangeSinopsis = (e) => setSinopsis(e.target.value);

  const handleSubmitBook = async (e) => {
    e.preventDefault();
    console.log(currentCathegory.idcategoria);

    const resp = await fetch("http://localhost:3080/api/v1/books/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        idcategoria: currentCathegory.idcategoria,
        idautor: currentAuthor.idautor,
        titulo: title,
        stock: stock,
        sinopsis: sinopsis,
        precio: price,
        editorial: publisher,
        añopublicacion: year,
      }),
    });

    if (resp.ok) {
      await resp.json();
      setCurrentCathegory({});
      setCurrentAuthor({});
      setTitle("");
      setStock("");
      setPrice("");
      setPublisher("");
      setYear("");
      setSinopsis("");
    }
  };

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeLastName1 = (e) => setLastName1(e.target.value);
  const handleChangeLastName2 = (e) => setLastName2(e.target.value);

  const handleSubmitAuthor = async (e) => {
    e.preventDefault();

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
      console.log(respBody);
      setName("");
      setLastName1("");
      setLastName2("");
    }
  };

  const style = {
    height: "41rem",
  };

  const style2 = {
    height: "21rem",
  };

  return (
    <div>
      <div style={style2} className="register-container">
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
      <div style={style} className="register-container">
        <h1 className="register-form-title">Regístro de libros</h1>
        <button className="upload-book-image-button">Subir foto</button>
        <form className="register-form" onSubmit={handleSubmitBook}>
          <div className="select-cathegoty-container">
            <select
              className="select-form-item"
              onChange={handleSelectedCathegory}
            >
              {cathegories.map(renderCathegories)}
            </select>
          </div>
          <div className="select-cathegoty-container">
            <select
              className="select-form-item"
              onChange={handleSelectedAuthor}
            >
              {authors.map(renderAuthors)}
            </select>
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
            <textarea
              type="text"
              placeholder="Sinopsis"
              value={sinopsis}
              onChange={handleChangeSinopsis}
            ></textarea>
          </div>
          <div className="register-button-container">
            <button className="register-submit-button" type="submit">
              +
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
