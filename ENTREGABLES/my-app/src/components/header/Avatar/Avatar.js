import React from "react";

const Avatar = (props) => {
  const { imageId, styleAux } = props;

  let style = {
    borderRadius: "50%",
    width: "2.5rem",
    height: "2.5rem",
  };
  if (styleAux !== undefined) {
    style = styleAux;
  }

  return (
    <div className="avatar">
      <img
        src={`/images/users/${imageId}.jpg`}
        onError={(e) => {
          console.log(e);
          e.target.src = "/images/users/0.jpg";
        }}
        alt="Avatar"
        style={style}
      />
    </div>
  );
};

export { Avatar };
