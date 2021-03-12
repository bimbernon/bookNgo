import React from "react";
import "./User.css";

const User = (props) => {
  const {
    userId,
    userName,
    userProfileName,
    userEmail,
    userLastname1,
    userLastname2,
    userAddress,
    userPurse,
  } = props;

  return (
    <div className="user-info-container">
      <li className="user-main-info" userId={userId} userAddress={userAddress}>
        <div className="user-main-item">
          <h1 className="user-name">
            {`${userName} ${userLastname1} ${userLastname2} - ${userProfileName}`}
          </h1>
          <h2 className="user-email">{userEmail}</h2>
        </div>
        <div className="user-main-item">
          saldo
          <h1 className="user-purse">{userPurse}</h1>
        </div>
      </li>
    </div>
  );
};

export { User };
