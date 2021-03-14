import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class DeleteAlert extends React.Component {
  submit = () => {
    confirmAlert({
      title: "Confirma para eliminar.",
      message: "¿Estás seguro de que quieres eliminar tu cuenta?",
      buttons: [
        {
          label: "Yes",
          onClick: () => alert("Sí"),
        },
        {
          label: "No",
          onClick: () => alert("No"),
        },
      ],
    });
  };

  render() {
    return (
      <div className="container">
        <button onClick={this.submit}>Aceptar</button>
      </div>
    );
  }
}

const options = {
  title: "Title",
  message: "Message",
  buttons: [
    {
      label: "Yes",
      onClick: () => alert("Click Yes"),
    },
    {
      label: "No",
      onClick: () => alert("Click No"),
    },
  ],
  childrenElement: () => <div />,
  customUI: ({ title, message, onClose }) => <div>Custom UI</div>,
  willUnmount: () => {},
};

confirmAlert(options);

confirmAlert({
  customUI: ({ onClose }) => {
    return (
      <div className="custom-ui">
        <h1>Are you sure?</h1>
        <p>You want to delete this file?</p>
        <button onClick={onClose}>No</button>
        <button
          onClick={() => {
            this.handleClickDelete();
            onClose();
          }}
        >
          Yes, Delete it!
        </button>
      </div>
    );
  },
});

export { DeleteAlert };
