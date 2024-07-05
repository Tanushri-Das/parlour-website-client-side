// import React from "react";
// import './Modal.css'

// const Modal = ({ isOpen, onClose, onConfirm, service, editedName, editedPrice, onNameChange, onPriceChange }) => {
//   return (
//     <div className={`modal ${isOpen ? "open" : ""}`}>
//       <div className="modal-box">
//         <h3 className="font-bold text-lg">{service?.service_name}</h3>
//         <div className="pt-6 pb-3 text-start flex flex-col">
//           <label htmlFor="ServiceName">Service Name</label>
//           <input
//             type="text"
//             id="ServiceName"
//             value={editedName}
//             className="input input-bordered input-md w-full mt-2"
//             onChange={onNameChange}
//           />
//         </div>
//         <div className="pb-3 text-start flex flex-col">
//           <label htmlFor="ServicePrice">Price</label>
//           <input
//             type="text"
//             id="ServicePrice"
//             value={`$${editedPrice}`}
//             className="input input-bordered input-md w-full mt-2"
//             onChange={onPriceChange}
//           />
//         </div>
//         <div className="modal-action justify-center">
//           <button className="btn" onClick={onConfirm}>
//             Save
//           </button>
//         </div>
//         <button className="btn" onClick={onClose}>
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Modal;





import React from "react";
import "./Modal.css";

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  service,
  editedName,
  editedPrice,
  onNameChange,
  onPriceChange,
}) => {
  return (
    <>
      {isOpen && (
        <div className={`overlay ${isOpen ? "open" : ""}`} onClick={onClose}></div>
      )}
      <div className={`modal ${isOpen ? "open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-semibold text-xl">{service?.service_name}</h3>
          <hr className="my-3"/>
          <div className="mb-3 text-start flex flex-col">
            <label htmlFor="ServiceName" className="block text-black text-lg font-semibold mb-1">Service Name</label>
            <input
              type="text"
              id="ServiceName"
              value={editedName}
              className="form-input w-full mt-2 text-[16px] font-medium"
              onChange={onNameChange}
            />
          </div>
          <div className="mb-5 text-start flex flex-col">
            <label htmlFor="ServicePrice" className="block text-black text-lg font-semibold mb-1">Price</label>
            <input
              type="text"
              id="ServicePrice"
              value={`$${editedPrice}`}
              className="form-input w-full mt-2 text-[16px] font-medium"
              onChange={onPriceChange}
            />
          </div>
          <div className="flex justify-evenly">
            <button className="btn bg-green-600 text-[16px] font-medium text-white py-2 px-4 rounded-lg" onClick={onConfirm}>
              Save
            </button>
            <button className="btn bg-red-600 text-[16px] font-medium text-white py-2 px-4 rounded-lg" onClick={onClose}>
            Cancel
          </button>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Modal;

