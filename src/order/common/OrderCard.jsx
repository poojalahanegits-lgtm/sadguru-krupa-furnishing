import { FiTrash2 } from "react-icons/fi";
const OrderCard = ({ order, customers, onViewDetails, onDeleteOrder }) => {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-3 space-y-2 text-sm">
      {/* TOP */}
      <div className="flex justify-between items-center">
        <div className="font-semibold text-gray-800">#{order.orderNo}</div>

        <button
          onClick={() => onDeleteOrder(order._id)}
          className="text-red-500"
        >
          <FiTrash2 size={16} />
        </button>
      </div>

      {/* DETAILS */}
      <div className="text-gray-600 space-y-1">
        <p>
          <b>Customer:</b> {order.customer?.name || "N/A"}
        </p>
        <p>
          <b>Date:</b> {order.orderDate}
        </p>
        <p>
          <b>Status:</b> {order.orderStatus}
        </p>

        <p>
          <b>Total:</b> ₹
          {parseInt(order.totalAmount || order.total || 0).toLocaleString()}
        </p>

        <p>
          <b>Products:</b> {order.products?.length || 0}
        </p>
      </div>

      {/* ACTION */}
      <button
        onClick={() => {
          const customer = customers.find(
            (c) => c._id === (order.customer?._id || order.customer),
          );
          onViewDetails(order, customer);
        }}
        className="w-full bg-black text-white py-2 rounded-lg text-sm"
      >
        View Details
      </button>
    </div>
  );
};

export default OrderCard;
