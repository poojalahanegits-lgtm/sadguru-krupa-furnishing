import React from "react";
import { FiTrash2, FiSearch, FiX } from "react-icons/fi";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import TableSkeleton from "./common/TableSkeleton";
const ITEMS_PER_PAGE = 6;
import { FiChevronDown } from "react-icons/fi";
import OrderCard from "./common/OrderCard";
import { formatDateTime } from "../../constants/Config.js";
const statusOptions = [
  { label: "All Orders", value: "all" },
  { label: "Open", value: "open" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
  { label: "Cancelled", value: "cancelled" },
];
const OrderList = ({
  orders,
  customers,
  loading,
  onViewDetails,
  onDeleteOrder,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  // 🔽 Sort + Filter
  // const filteredOrders = [...orders]
  //   .filter((order) => {
  //     const term = searchTerm.toLowerCase();

  //     return (
  //       order.orderNo?.toLowerCase().includes(term) ||
  //       order.customerName?.toLowerCase().includes(term) ||
  //       order.orderStatus?.toLowerCase().includes(term) ||
  //       order.orderDate?.toLowerCase().includes(term)
  //     );
  //   })
  //   .sort((a, b) => {
  //     return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  //   });

  const filteredOrders = [...orders]
    .filter((order) => {
      const term = searchTerm.toLowerCase();

      const matchesSearch =
        order.orderNo?.toLowerCase().includes(term) ||
        order.customer?.name?.toLowerCase().includes(term) ||
        order.orderStatus?.toLowerCase().includes(term) ||
        order.orderDate?.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === "all" ||
        order.orderStatus?.toLowerCase() === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  // 📄 Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  // const sortedOrders = [...orders].sort((a, b) => {
  //   return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  // });
  if (loading) {
    return <TableSkeleton rows={6} columns={8} />;
  }
  return (
    <div className="bg-white border border-gray-300 overflow-hidden">
      {/* 🔍 filters */}
      <div className="flex flex-col p-4 sm:flex-row gap-3 w-full md:w-auto">
        <div
          className="
      flex flex-col gap-3 
      sm:flex-col 
      md:flex-row md:items-center
    "
        >
          {/* search */}
          <div className="relative w-full sm:w-full md:w-[220px]">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-gray-200 outline-none"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* 📍Order Filter */}
          <div className="relative w-full sm:w-full md:w-[160px]">
            {/* Trigger */}
            <div
              onClick={() => setShowStatusDropdown((prev) => !prev)}
              className="pl-3 pr-8 py-2.5 cursor-pointer text-sm border border-gray-300 rounded-xl 
    flex items-center justify-between hover:bg-white transition shadow-sm"
            >
              <span
                className={`${statusFilter ? "text-gray-800" : "text-gray-400"}`}
              >
                {statusOptions.find((s) => s.value === statusFilter)?.label ||
                  "All Orders"}
              </span>

              <FiChevronDown className="text-gray-400" />
            </div>

            {/* Dropdown */}
            {showStatusDropdown && (
              <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                {statusOptions.map((status) => (
                  <div
                    key={status.value}
                    onClick={() => {
                      setStatusFilter(status.value);
                      setShowStatusDropdown(false);
                      setCurrentPage(1);
                    }}
                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    {status.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                setCurrentPage(1);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <FiX size={14} /> Clear
            </button>
          )}
        </div>
      </div>
      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto lg:h-[416px]">
        <table className="w-full table-fixed text-lg">
          <thead className="bg-black text-white sticky top-0 z-[40]">
            <tr>
              <th className="px-4 border py-3  text-center font-semibold text-white  whitespace-nowrap  bg-black">
                Order No
              </th>
              <th className="px-4 border py-3  text-center font-semibold text-white  whitespace-nowrap  bg-black">
                Customer
              </th>
              <th className="px-4 border py-3  text-center font-semibold text-white  whitespace-nowrap  bg-black">
                Order Date
              </th>
              <th className="px-4 border py-3  text-center font-semibold text-white  whitespace-nowrap  bg-black">
                Delivery
              </th>
              <th className="px-4 border py-3  text-center font-semibold text-white  whitespace-nowrap  bg-black">
                Status
              </th>
              <th className="px-4 border py-3  text-center font-semibold text-white  whitespace-nowrap  bg-black">
                Total
              </th>
              <th className="px-4 border py-3  text-center font-semibold text-white  whitespace-nowrap  bg-black">
                Products
              </th>
              <th className="px-4 py-3 font-bold text-lg sticky right-0 z-[120] bg-black shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.1)]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => (
              <tr key={order._id} className="border-t text-sm border-gray-200">
                <td className="text-center ">{order.orderNo}</td>
                <td className="text-center">{order.customer?.name || "N/A"}</td>
                <td className="text-center">
                  {" "}
                  {formatDateTime(order.orderDate)}
                </td>
                <td className="text-center">
                  {" "}
                  {formatDateTime(order.deliveryDate)}
                </td>
                <td className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs lg:text-[14px] font-semibold border
    ${
      order.orderStatus === "Cancelled"
        ? "text-red-600 bg-red-50 border-red-200"
        : ""
    }
    ${
      order.orderStatus === "Pending"
        ? "text-yellow-700 bg-yellow-50 border-yellow-200"
        : ""
    }
    ${
      order.orderStatus === "Completed"
        ? "text-green-600 bg-green-50 border-green-200"
        : ""
    }
    ${
      order.orderStatus === "Processing"
        ? "text-blue-600 bg-blue-50 border-blue-200"
        : ""
    }
  `}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td className="p-3 text-center">
                  ₹
                  {parseInt(
                    order.totalAmount || order.total || 0,
                  ).toLocaleString()}
                </td>
                <td className="p-3 text-center relative group">
                  <div className="cursor-help">
                    {/* Show total count */}
                    <div className="font-semibold text-blue-600">
                      {order.products?.length || 0} Product
                      {order.products?.length !== 1 ? "s" : ""}
                    </div>

                    {/* Hover tooltip with product list */}
                    {order.products?.length > 0 && (
                      <div className="absolute left-0 top-full mt-1 z-50 hidden group-hover:block bg-gray-900 text-white text-xs rounded-lg p-2 min-w-[200px] shadow-lg">
                        {order.products.map((p, idx) => (
                          <div
                            key={p._id || idx}
                            className="py-1 border-b border-gray-700 last:border-0"
                          >
                            <span className="font-semibold">
                              {p.category || "Product"}
                            </span>
                            {p.quantity && (
                              <span className="ml-2">Qty: {p.quantity}</span>
                            )}
                            {p.productCode && (
                              <div className="text-gray-300 text-xs">
                                {p.productCode}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex gap-2  ] rounded-md px-2 py-1 cursor-pointer">
                    <button
                      className="px-3 py-1.5 text-sm bg-gray-900 text-white rounded-md cursor-pointer hover:bg-black transition"
                      onClick={() => {
                        const customer = customers.find(
                          (c) =>
                            c._id === (order.customer?._id || order.customer),
                        );
                        onViewDetails(order, customer);
                      }}
                    >
                      View Details
                    </button>
                    <button
                      className="p-2 rounded-md text-xl cursor-pointer hover:bg-gray-50  transition"
                      onClick={() => onDeleteOrder(order._id)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="8" className="p-8 text-center text-gray-500">
                  No orders found. Add an order.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* MOBILE CARDS */}
      <div className="md:hidden p-3 space-y-3">
        {paginatedOrders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            customers={customers}
            onViewDetails={onViewDetails}
            onDeleteOrder={onDeleteOrder}
          />
        ))}
      </div>

      {/* 📄 Pagination (hide if only 1 page) */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mb-8 md:mb-0 gap-6 pt-4 pb-2 border-t border-gray-200">
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex gap-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 bg-black text-white rounded hover:bg-black-500 disabled:opacity-50  cursor-pointer disabled:cursor-not-allowed"
            >
              <i className="fa-solid fa-arrow-left"></i> Previous
            </button>

            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 bg-black text-white rounded hover:bg-black-500 disabled:opacity-50  cursor-pointer disabled:cursor-not-allowed"
            >
              Next <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;

// // components/orders/OrderList.jsx
// import React from "react";
// import { FiTrash2, FiSearch, FiX } from "react-icons/fi";
// import { useState } from "react";
// import { FiArrowLeft } from "react-icons/fi";
// const ITEMS_PER_PAGE = 6;

// const OrderList = ({ orders, customers, onViewDetails, onDeleteOrder }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   // 🔽 Sort + Filter
//   const filteredOrders = [...orders]
//     .filter((order) => {
//       const term = searchTerm.toLowerCase();

//       return (
//         order.orderNo?.toLowerCase().includes(term) ||
//         order.customerName?.toLowerCase().includes(term) ||
//         order.orderStatus?.toLowerCase().includes(term) ||
//         order.orderDate?.toLowerCase().includes(term)
//       );
//     })
//     .sort((a, b) => {
//       return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
//     });

//   // 📄 Pagination logic
//   const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

//   const paginatedOrders = filteredOrders.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE,
//   );
//   const sortedOrders = [...orders].sort((a, b) => {
//     return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
//   });
//   return (
//     <div className="bg-white border border-gray-300 overflow-hidden">
//       {/* 🔍 Search Bar */}
//       <div className="p-4 border-b flex flex-col md:flex-row gap-3 items-center">
//         <div className="relative w-full md:w-1/3">
//           <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search orders..."
//             className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-gray-200 outline-none"
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setCurrentPage(1);
//             }}
//           />
//         </div>

//         <button
//           onClick={() => {
//             setSearchTerm("");
//             setCurrentPage(1);
//           }}
//           className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200"
//         >
//           <FiX size={14} /> Clear
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-black text-white">
//             <tr>
//               <th className="p-3 text-left">Order No</th>
//               <th className="p-3 text-left">Customer</th>
//               <th className="p-3 text-left">Date</th>
//               <th className="p-3 text-left">Delivery</th>
//               <th className="p-3 text-left">Status</th>
//               <th className="p-3 text-left">Total</th>
//               <th className="p-3 text-left">Products</th>
//               <th className="p-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sortedOrders.map((order) => (
//               <tr key={order.id} className="border-t border-gray-200">
//                 <td className="p-3 font-medium">{order.orderNo}</td>
//                 <td className="p-3">{order.customerName}</td>
//                 <td className="p-3">{order.orderDate}</td>
//                 <td className="p-3">{order.deliveryDate}</td>
//                 <td className="p-3">
//                   <span className="px-2 py-1 rounded-full text-xs bg-blue-100">
//                     {order.orderStatus}
//                   </span>
//                 </td>
//                 <td className="p-3">
//                   ₹{parseInt(order.total).toLocaleString()}
//                 </td>
//                 <td className="p-3">
//                   <div className="space-y-1">
//                     {order.products.slice(0, 2).map((p) => (
//                       <div key={p.id} className="text-sm">
//                         {p.category} - {p.roomName || "N/A"} (Qty: {p.quantity})
//                       </div>
//                     ))}
//                     {order.products.length > 2 && (
//                       <div className="text-xs text-gray-500">
//                         +{order.products.length - 2} more
//                       </div>
//                     )}
//                   </div>
//                 </td>
//                 <td className="p-3">
//                   <div className="flex gap-2  ] rounded-md px-2 py-1 cursor-pointer">
//                     <button
//                       className="py-2 px-4 bg-black text-white  rounded flex items-center gap-1"
//                       onClick={() => {
//                         const customer = customers.find(
//                           (c) => c.id === order.customerId,
//                         );
//                         onViewDetails(order, customer);
//                       }}
//                     >
//                       View Details
//                     </button>
//                     <button
//                       className="p-2  rounded"
//                       onClick={() => onDeleteOrder(order.id)}
//                     >
//                       <FiTrash2 />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//             {orders.length === 0 && (
//               <tr>
//                 <td colSpan="8" className="p-8 text-center text-gray-500">
//                   No orders found. Add an order.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default OrderList;
