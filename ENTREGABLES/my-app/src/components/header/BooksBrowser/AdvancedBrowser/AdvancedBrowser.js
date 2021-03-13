import React, { useState } from "react";
import "./AdvancedBrowser.css";

const AdvancedBrowser = (props) => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState([]);
  const [author, setAuthor] = useState([]);
  const [cathegory, setCathegory] = useState([]);
  const [editorial, setEditorial] = useState([]);
  const [publicationYear, setPublicationYear] = useState([]);

  const handleChangeTitle = (e) => setTitle(e.target.value);
  const handleChangeAuthor = (e) => setAuthor(e.target.value);
  const handleChangeCathegory = (e) => setCathegory(e.target.value);
  const handleChangeEditorial = (e) => setEditorial(e.target.value);
  const handleChangePublicationYear = (e) => setPublicationYear(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    async function getAllBooks() {
      const allBooksResponse = await (
        await fetch("http://localhost:3080/api/v1/books/")
      ).json();
      setBooks(allBooksResponse);
    }
    getAllBooks();
  };

  return (
    <div className="search-container">
      <h1 className="search-form-title">Filtra tu búsqueda</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-form-item">
          <input
            type="text"
            placeholder="Titulo"
            value={title}
            onChange={handleChangeTitle}
          ></input>
        </div>
        <div className="search-form-item">
          <input
            type="text"
            placeholder="Autor"
            value={author}
            onChange={handleChangeAuthor}
          ></input>
        </div>
        <div className="search-form-item">
          <input
            type="text"
            placeholder="Categoría"
            value={cathegory}
            onChange={handleChangeCathegory}
          ></input>
        </div>
        <div className="search-form-item">
          <input
            type="text"
            placeholder="Editorial"
            value={editorial}
            onChange={handleChangeEditorial}
          ></input>
        </div>
        <div className="search-form-item">
          <input
            type="text"
            placeholder="Año de Publicación"
            value={publicationYear}
            onChange={handleChangePublicationYear}
          ></input>
        </div>
        <div className="search-button-container">
          <button className="search-submit-button" type="submit">
            BUSCAR
          </button>
        </div>
      </form>
    </div>
  );
};

export { AdvancedBrowser };
