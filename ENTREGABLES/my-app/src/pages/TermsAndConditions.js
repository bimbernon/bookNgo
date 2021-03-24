import React from "react";
import "../../src/pages/Administration/Administration.css";

function TermsAndConditions() {
  return (
    <div className="terms-container">
      <h1 className="terms-title">Términos y Condiciones</h1>
      <div className="recharge-conditions-container">
        <ul>
          <h2>Sistema de recarga</h2>
          <li>1b === 1€</li>
        </ul>
        <ul>
          <h2>Condiciones de reserva</h2>
          <li>1 reserva === 30 días</li>
          <p>30 días dura el total de la reserva:</p>
          <p>25 dias para disfrutar de tu libro</p>
          <p>5 dias de plazo para gestionar el envío</p>
        </ul>
      </div>
    </div>
  );
}

export { TermsAndConditions };
