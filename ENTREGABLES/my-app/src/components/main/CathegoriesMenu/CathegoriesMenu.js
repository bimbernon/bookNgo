import React, { useState } from "react";
import "./CathegoriesMenu.css";
import { Cathegory } from "../Cathegory/Cathegory";

const CathegoriesMenu = (props) => {
  const { imageId } = props;
  const [cathegory, setCathegory] = useState({});

  async function handleSubmit(event) {
    const response = await fetch("http://localhost:3002/api/v1/cathegories/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(cathegory),
    });

    const cathegoryResponse = await response.json();

    setCathegory(cathegoryResponse);
  }

  return (
    <div className="cathgoriesMenu">
      <Cathegory className="cathegory" cathegoryName="Terror"></Cathegory>
    </div>
  );
};

export { CathegoriesMenu };
