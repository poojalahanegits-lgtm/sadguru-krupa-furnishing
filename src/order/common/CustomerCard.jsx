import { FiTrash2 } from "react-icons/fi";

const CustomerCard = ({ customer, orders, onViewOrders, onDelete }) => {
  const orderCount = orders.filter((o) => {
    return o.customer?._id === customer._id || o.customer === customer._id;
  }).length;

  return (
    <div className="bg-white border rounded-lg shadow-sm p-3 text-sm space-y-2">
      {/* Top row */}
      <div className="flex justify-between items-center">
        <div className="font-semibold text-gray-800">{customer.name}</div>

        <button onClick={() => onDelete(customer)} className="text-red-500">
          <FiTrash2 size={16} />
        </button>
      </div>

      {/* Details */}
      <div className="text-gray-600 space-y-1">
        <p>
          <b>Mobile:</b> {customer.mobile}
        </p>
        <p>
          <b>City:</b> {customer.city}
        </p>

        <p>
          <b>Orders:</b>{" "}
          <span className="px-2 py-0.5 text-xs bg-gray-100 rounded-full">
            {orderCount}
          </span>
        </p>
      </div>

      {/* Actions */}
      <button
        onClick={() => onViewOrders(customer)}
        className="w-full bg-black text-white text-sm py-2 rounded-md"
      >
        View Orders
      </button>
    </div>
  );
};

export default CustomerCard;
