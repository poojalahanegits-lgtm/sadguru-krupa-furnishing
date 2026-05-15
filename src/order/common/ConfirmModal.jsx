// components/common/ConfirmModal.jsx
import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 animate-fadeIn">
        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 text-red-600 rounded-full">
            <FiAlertTriangle size={20} />
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>

        {/* Message */}
        <p className="text-sm text-gray-600 mb-6">{message}</p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
