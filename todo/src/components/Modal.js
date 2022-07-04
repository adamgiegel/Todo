import React, { useRef } from "react";
import ReactDom from "react-dom";

export const Modal = ({ message, id, yesDelete, noDelete, confirmDelete, setShowModal }) => {
    const modalRef = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            setShowModal(false);
        }
    };

    return ReactDom.createPortal(
        <div className="container" ref={modalRef} onClick={closeModal}>
            <div className="modal">
                <h2>{message}</h2>
                {confirmDelete ?
                    <div>
                        <button className="addTaskButton" onClick={() => yesDelete(id)}>Yes</button>
                        <button className="addTaskButton" onClick={noDelete}>No</button>
                    </div> :
                    <button className="addTaskButton" onClick={() => setShowModal(false)}>Okay</button>
                }
            </div>
        </div>,
        document.getElementById("portal")
    );
};
