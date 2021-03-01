import React, { useState, useEffect } from "react";
import "./CathegoriesMenu.css";
import { Cathegory } from "../Cathegory/Cathegory";

const CathegoriesMenu = (props) => {
  const [cathegories, setCathegory] = useState([]);

  useEffect(() => {
    async function getCathegories() {
      const cathegoriesResponse = await (
        await fetch("http://localhost:3080/api/v1/cathegories")
      ).json();
      setCathegory(cathegoriesResponse);
    }
    getCathegories();
  }, []);

  const allCathegories = cathegories.map((cathegory) => {
    return cathegory;
  });

  console.log(allCathegories[0]);

  return (
    <div className="cathegoriesContainer">
      <ul className="cathgoriesMenu">
        <Cathegory
          imageId={allCathegories.idcategoria}
          cathegoryName={allCathegories.nombrecategoria}
        ></Cathegory>
      </ul>
    </div>
  );
};

export { CathegoriesMenu };
