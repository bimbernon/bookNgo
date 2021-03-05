import React, { useState, useEffect } from "react";
import "./CathegoriesMenu.css";
import { Cathegory } from "../Cathegory/Cathegory";
import { Link } from "react-router-dom";

const CathegoriesMenu = () => {
  const [cathegories, setCathegory] = useState([]);

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
    <Link to={`/cathegory/books/${ctg.nombrecategoria}`}>
      <Cathegory
        key={ctg.idcategoria}
        cathegoryId={ctg.idcategoria}
        cathegoryName={ctg.nombrecategoria}
      ></Cathegory>
    </Link>
  );

  return (
    <div className="cathegories-container">
      <ul className="cathegories-menu">{cathegories.map(renderCathegories)}</ul>
    </div>
  );
};

export { CathegoriesMenu };
