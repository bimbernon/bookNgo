import React from "react";
import "./Donation.css";

const Donation = (props) => {
  const {
    donationId,
    userId,
    donationTitle,
    donationDate,
    donationCheck,
    donationState,
  } = props;

  return (
    // <div className="donation-info-container">
    <ul className="donation-main-info">
      {/* <td className="donation-info">{`${donationId} $ ${userId}`}</td> */}
      <li className="donation-li">{donationId}</li>
      <li className="donation-li">{donationTitle}</li>
      <li className="donation-li">{userId}</li>
      <li className="donation-li">{donationDate}</li>
      {/* <h2 className="donation-date"></h2> */}
      <li className="donation-li">
        <div className="donation-main-item">
          <form className="update-donation-form">
            <label className="donation-state-checkbox-label">
              Revisado
              <input type="checkbox" value={donationCheck} />
            </label>
            <label className="donation-state-checkbox-label">
              Correcto
              <input type="checkbox" value={donationState} />
            </label>
            <button className="update-donation-button" type="submit">
              +
            </button>
          </form>
        </div>
      </li>
    </ul>
    // </div>
  );
};

export { Donation };
