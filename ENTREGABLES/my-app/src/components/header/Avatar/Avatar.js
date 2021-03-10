import React from "react";

const Avatar = (props) => {
  const { imageId } = props;

  const style = {
    width: "1rem",
    height: "1rem",
  };

  return (
    <div className="avatar">
      <img src={`/images/users/${imageId}.jpg`} alt="Avatar" style={style} />
    </div>
  );
};

export { Avatar };
