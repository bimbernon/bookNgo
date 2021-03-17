import React from "react";
import { Link } from "react-router-dom";
// import { UserContext } from "../../providers/UserProvider";
import "./Reserve.css";

const Reserve = (props) => {
  // const [selectedUser] = useContext(UserContext);

  const {
    reservedBookTitle,
    reserveDate,
    reserveExpiration,
    bookId,
    idInvoice,
    children,
  } = props;
  console.log(props);

  return (
    <li
      bookId={bookId}
      reservedBookTitle={reservedBookTitle}
      reserveDate={reserveDate}
      reserveExpiration={reserveExpiration}
      reservesErrorMsg={"Todavia no tienes reservas disponibles."}
    >
      {/* <Link to={`/reserve/${selectedUser.idusuario}/${bookId}/${reserveDate}`}> */}
      <div
        className="reserve-info"
        reservedBookTitle={reservedBookTitle}
        reserveExpiration={reserveExpiration}
        reserveDate={reserveDate}
      >
        {children}
      </div>
      {/* <Link to={`/reserve/invoice/${idInvoice}`}>
        <img
          src="/icons/icono-factura.png"
          alt="edit"
          style={{ height: "1.2rem", width: "1.2rem" }}
        />
      </Link> */}
      {/* </Link> */}
    </li>
  );
};

export { Reserve };
