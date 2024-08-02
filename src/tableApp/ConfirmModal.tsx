import React, { FC } from "react";
import "./ConfirmModal.css";

interface ConfirmModalProps {
    show: boolean;
    text: string
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
    show,
    text,
    onConfirm,
    onCancel,
}) => {

    const modalClassName = "modal " + (!show ? "modal-hide": "" )

    return (
        <div className={modalClassName} onClick={onCancel}  >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <p className="modal-item">{text}</p>
                <span className="modal-item">
                    <button className="modal-button" onClick={onCancel}>Cancel</button>
                    <button className="modal-button" onClick={onConfirm}>Confirm</button>
                </span>
            </div>
        </div>
    );
}