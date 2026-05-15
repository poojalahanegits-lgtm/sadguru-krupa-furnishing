// src/components/orders/ProductDetailsModal.jsx

import React from "react";
import { FiX } from "react-icons/fi";
import FIELD_CONFIG from "../../../constants/inputFieldConfig";

const ProductDetailsModal = ({ product, isOpen, onClose, formatDate }) => {
  if (!isOpen || !product) return null;

  const basicFields = [
    {
      label: "Category",
      value:
        product.category?.charAt(0).toUpperCase() + product.category?.slice(1),
    },
    {
      label: "Product Code",
      value: product.productCode,
    },
    {
      label: "Brand",
      value: product.brand,
    },
    {
      label: "Quantity",
      value: product.quantity,
    },
    {
      label: "Unit",
      value: product.unit,
    },
    {
      label: "Price",
      value: product.price ? `₹${Number(product.price).toLocaleString()}` : "-",
    },
    {
      label: "Total",
      value: product.total ? `₹${Number(product.total).toLocaleString()}` : "-",
    },
    {
      label: "Status",
      value: product.orderStatus,
    },
    {
      label: "Delivery Date",
      value: formatDate(product.deliveryDate),
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-3"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="bg-black text-white px-6 py-5 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">
              {product.category?.charAt(0).toUpperCase() +
                product.category?.slice(1)}
            </h2>

            <p className="text-sm text-gray-300 mt-1">Product Details</p>
          </div>

          <button onClick={onClose} className="hover:text-red-300 transition">
            <FiX size={24} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 max-h-[85vh] overflow-y-auto space-y-8">
          {/* BASIC DETAILS */}
          <div>
            <h3 className="text-lg font-bold mb-4">Basic Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {basicFields.map((item) => (
                <div
                  key={item.label}
                  className="bg-gray-50 border border-gray-200 rounded-2xl p-4"
                >
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    {item.label}
                  </p>

                  <p className="text-base font-semibold text-gray-800 break-words">
                    {item.value || "-"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ATTRIBUTES */}
          {Object.keys(product.attributes || {}).length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-4">Product Specifications</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(product.attributes || {}).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="bg-white border border-gray-200 rounded-2xl p-4"
                    >
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        {FIELD_CONFIG[key]?.label || key}
                      </p>

                      <p className="text-base font-semibold text-gray-800 break-words">
                        {value || "-"}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}

          {/* NOTES */}
          {(product.specialNotes || product.notes) && (
            <div>
              <h3 className="text-lg font-bold mb-3">Notes</h3>

              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 whitespace-pre-wrap leading-relaxed text-gray-800">
                {product.specialNotes || product.notes}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
