import React from "react";

const Modal = ({ isOpen, onClose, isEditing, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
        {/* Header Modal */}

        {/* Isi Modal */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
