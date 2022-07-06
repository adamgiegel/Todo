import React, { SyntheticEvent, useRef } from "react";
import ReactDom from "react-dom";

export interface Props {
    message: string;
    id: number | undefined;
    yesDelete: (id: number) => void;
    noDelete: () => void;
    confirmDelete: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const Modal = (props: Props) => {
    const modalRef = React.useRef<HTMLDivElement>(null);
    const closeModal = (e: SyntheticEvent) => {
        if (e.target === modalRef.current) {
            props.setShowModal(false);
        }
    };

    return ReactDom.createPortal(
        <div className="container" ref={modalRef} onClick={closeModal}>
            <div className="modal">
                <h2>{props.message}</h2>
                {props.confirmDelete ?
                    <div>
                        <button className="addTaskButton" onClick={() => props.yesDelete(props.id!)}>Yes</button>
                        <button className="addTaskButton" onClick={props.noDelete}>No</button>
                    </div> :
                    <button className="addTaskButton" onClick={() => props.setShowModal(false)}>Okay</button>
                }
            </div>
        </div>,
        document.getElementById("portal")!
    );
};
