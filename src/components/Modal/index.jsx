import { XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

const Modal = ({ title, children, isOpen, setIsOpen }) => {
  return (
    <>
      {isOpen && (
        <div>
          <div
            className="backdrop"
            onClick={() => {
              setIsOpen(false);
            }}
          ></div>
          <div className="modal">
            <div className="modal__header">
              <h2 className="title">{title}</h2>
              <div>
                <XCircleIcon
                  className="icon close close-modal-btn"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                />
              </div>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
export default Modal;
