import React from "react";
import './Modal.css'

const Modal = ({ isOpen, onClose, onConfirm, service, editedName, editedPrice, onNameChange, onPriceChange }) => {
  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">{service?.service_name}</h3>
        <div className="pt-6 pb-3 text-start flex flex-col">
          <label htmlFor="ServiceName">Service Name</label>
          <input
            type="text"
            id="ServiceName"
            value={editedName}
            className="input input-bordered input-md w-full mt-2"
            onChange={onNameChange}
          />
        </div>
        <div className="pb-3 text-start flex flex-col">
          <label htmlFor="ServicePrice">Price</label>
          <input
            type="text"
            id="ServicePrice"
            value={`$${editedPrice}`}
            className="input input-bordered input-md w-full mt-2"
            onChange={onPriceChange}
          />
        </div>
        <div className="modal-action justify-center">
          <button className="btn" onClick={onConfirm}>
            Save
          </button>
        </div>
        <button className="btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
