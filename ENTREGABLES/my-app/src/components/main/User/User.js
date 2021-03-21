import React, { useContext, useState } from "react";
import { Avatar } from "../../header/Avatar/Avatar";
import { Link } from "react-router-dom";
import "./User.css";

const User = (props) => {
  const {
    userid,
    userName,
    userProfileName,
    userEmail,
    userLastname1,
    userLastname2,
    userAddress,
    userPurse,
    value,
    onDeleteUser,
  } = props;

  const deleteButtonStyle = {
    background: `url("/icons/delete-red-button.png")`,
    backgroundSize: "cover",
    height: "1.5rem",
    width: "1.3rem",
  };

  const editButtonStyle = {
    height: "1.5rem",
    width: "1.3rem",
    margin: "0 8px",
  };

  return (
    <div className="user-info-container">
      <li className="user-main-info" userId={userid} userAddress={userAddress}>
        <div className="user-main-item">
          <div className="user-principal-info">
            <Avatar imageId={userid} style={{ objectFit: "cover" }} />
            <h1 className="user-profile-name"> {userProfileName}</h1>
          </div>
          <h1 className="user-name">
            {`${userName} ${userLastname1} ${userLastname2}`}
          </h1>
          <h2 className="user-email">{userEmail}</h2>
        </div>
        <div className="user-main-item user-right-item">
          <div className="user-purse-container">
            SALDO
            <h1 className="user-purse">{userPurse}</h1>
          </div>
          <form className="update-delete-container">
            <button
              className="delete-user-button"
              value={value}
              onClick={onDeleteUser}
              style={deleteButtonStyle}
            />
            <Link to={`/users/profile/${userid}`}>
              <img
                src="/icons/edit-blue-square-pen.png"
                alt="edit"
                style={editButtonStyle}
              />
            </Link>
          </form>
        </div>
      </li>
    </div>
  );
};

export { User };
