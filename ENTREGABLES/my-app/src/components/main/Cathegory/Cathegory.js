import React from "react";

const Cathegory = (props) => {
  const { cathegoryName, img } = props;

  const divStyle = {
    backgroundImage: 'url("/booksIcons/libro1.png")',
  };

  return (
    <div style={divStyle} className="cathegory__img">
      <h1 name={cathegoryName} className="cathegory__tittle">
        {cathegoryName}
      </h1>
    </div>
  );
};

export { Cathegory };
