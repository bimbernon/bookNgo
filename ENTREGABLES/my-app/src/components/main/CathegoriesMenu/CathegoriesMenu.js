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

  const render = (ctg) => (
    <Cathegory
      key={ctg.idcategoria}
      imageId={ctg.idcategoria}
      cathegoryName={ctg.nombrecategoria}
    ></Cathegory>
  );

  return (
    <div className="cathegoriesContainer">
      <ul className="cathgoriesMenu">{cathegories.map(render)}</ul>
    </div>
  );
};

export { CathegoriesMenu };
