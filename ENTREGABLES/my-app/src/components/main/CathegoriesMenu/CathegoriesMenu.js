import React, { useState, useEffect } from "react";
import "./CathegoriesMenu.css";
import { Cathegory } from "../Cathegory/Cathegory";

const CathegoriesMenu = (props) => {
  // const { imageId } = props;
  const [cathegory, setCathegory] = useState({});

  useEffect(() => {
    async function getCathegories() {
      const cathegories = await (
        await fetch("http://localhost:3080/api/v1/bookcathegories")
      ).json();
      console.log(cathegories);
      setCathegory(cathegories);
    }
    getCathegories();
  }, []);

  return (
    <ul className="cathgoriesMenu">
      <Cathegory className="cathegory" cathegoryName="TERROR"></Cathegory>
      <Cathegory className="cathegory" cathegoryName="ROMANCE"></Cathegory>
      <Cathegory className="cathegory" cathegoryName="FANTASÍA"></Cathegory>
      <Cathegory className="cathegory" cathegoryName="AVENTURA"></Cathegory>
      <Cathegory className="cathegory" cathegoryName="HISTORIA"></Cathegory>
      <Cathegory className="cathegory" cathegoryName="CÓMIC"></Cathegory>
    </ul>
  );
};

export { CathegoriesMenu };
