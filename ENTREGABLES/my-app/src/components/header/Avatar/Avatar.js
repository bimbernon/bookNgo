import React from "react";

const Avatar = (props) => {
  const { imageId } = props;

  const style = {
    borderRadius: "50%",
    width: "2.5rem",
    height: "2.5rem",
  };

  
  return (
    <div className="avatar">
      <img src={`/images/users/${imageId}.jpg`} alt="Avatar" style={style} />
    </div>
  );
};

export { Avatar };
