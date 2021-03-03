import React from "react";
const Avatar = (props) => {
  const { imageId } = props;
  return (
    <div className="avatar">
      <img
        src={`/home/hab01/Escritorio/HaB/proyecto/bookNgo/ENTREGABLES/BACKEND/images/users/${imageId}.jpg`}
        alt="Avatar"
      />
    </div>
  );
};

export default Avatar;
