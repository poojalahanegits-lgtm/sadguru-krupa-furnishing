import React, { useState } from "react";
import { FiTrash2, FiPlus } from "react-icons/fi";
import ConfirmModal from "./common/ConfirmModal";
import { FiSearch, FiMapPin, FiX, FiChevronDown } from "react-icons/fi";
import AddCustomer from "./CustomerForm";
import TableSkeleton from "./common/TableSkeleton";
import CustomerCard from "./common/CustomerCard";
import { FiEye } from "react-icons/fi";
const ITEMS_PER_PAGE = 6;

const CustomerList = ({
  customers,
  orders,
  loading,
  onViewOrders,
  onAddCustomer,
  onDeleteCustomer,
  onCheckMobile,
}) => {
  // =========================
  // 🔹 STATE MANAGEMENT
  // =========================
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const [showCreateForm, setShowCreateForm] = useState(false);

  // =========================
  // 🔹 FILTER + SEARCH LOGIC
  // =========================

  const filteredCustomers = customers
    .filter((customer) => {
      const term = searchTerm.toLowerCase();

      const matchesSearch =
        customer.name?.toLowerCase().includes(term) ||
        customer.mobile?.toLowerCase().includes(term) ||
        customer.city?.toLowerCase().includes(term) ||
        customer.address?.toLowerCase().includes(term);

      const matchesCity = cityFilter ? customer.city === cityFilter : true;

      return matchesSearch && matchesCity;
    })
    .sort((a, b) => {
      // newest first (descending)
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  //  automatic go to first page if not customer in 2nd page

  const uniqueCities = [
    ...new Set(customers.map((c) => c.city?.trim()).filter(Boolean)),
  ].sort((a, b) => a.localeCompare(b));

  // =========================
  // 🔹 PAGINATION LOGIC
  // =========================
  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);

  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  // =========================
  // 🔹 DELETE CUSTOMER FLOW
  // =========================

  const confirmDeleteCustomer = () => {
    if (onDeleteCustomer && customerToDelete) {
      onDeleteCustomer(customerToDelete._id || customerToDelete.id);
    }

    // adjust page manually
    const newTotal = filteredCustomers.length - 1;
    const newTotalPages = Math.ceil(newTotal / ITEMS_PER_PAGE);

    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages || 1);
    }

    setShowDeleteModal(false);
    setCustomerToDelete(null);
  };
  // =========================
  // 🔹 MAIN RENDER
  // =========================
  return (
    <div className=" border border-gray-200 shadow-sm overflow-hidden ">
      {showCreateForm ? (
        <AddCustomer
          onSave={(data, goToNext) => {
            onAddCustomer(data, goToNext); // ← Pass goToNext to parent
            if (!goToNext) {
              setShowCreateForm(false); // Only close form if NOT going to next page
            }
          }}
          onCancel={() => setShowCreateForm(false)}
          onCheckMobile={onCheckMobile}
        />
      ) : loading ? (
        <TableSkeleton rows={6} columns={5} />
      ) : (
        <div className="flex flex-col  ">
          {/* Filters */}
          <div
            className="
  sticky top-0 z-50 bg-white shadow-sm
  md:static md:z-auto
"
          >
            <div className="p-4 ">
              <div
                className="
   flex flex-col gap-3 md:flex-row md:items-center md:justify-between
  "
              >
                {/* LEFT SECTION: SEARCH + FILTERS */}
                <div
                  className="
      flex flex-col gap-3 
      sm:flex-col 
      md:flex-row md:items-center
    "
                >
                  {/* 🔍 Search */}
                  <div className="relative w-full sm:w-full md:w-[220px]">
                    <FiSearch
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={16}
                    />

                    <input
                      type="text"
                      placeholder="Search customers..."
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl  
          focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400
          transition-all shadow-sm"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </div>

                  {/* 📍 City Filter */}
                  <div className="relative w-full sm:w-full md:w-[160px]">
                    <div
                      onClick={() => setShowCityDropdown((prev) => !prev)}
                      className="pl-10 pr-8 py-2.5 cursor-pointer text-sm border border-gray-300 rounded-xl  
          flex items-center justify-between hover:bg-white transition shadow-sm"
                    >
                      <FiMapPin
                        className="absolute left-3 text-gray-400"
                        size={16}
                      />

                      <span
                        className={`${cityFilter ? "text-gray-800" : "text-gray-400"}`}
                      >
                        {cityFilter || "All Cities"}
                      </span>

                      <FiChevronDown className="text-gray-400" />
                    </div>

                    {showCityDropdown && (
                      <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                        <div
                          onClick={() => {
                            setCityFilter("");
                            setShowCityDropdown(false);
                            setCurrentPage(1);
                          }}
                          className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                        >
                          All Cities
                        </div>

                        {uniqueCities.map((city, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              setCityFilter(city);
                              setShowCityDropdown(false);
                              setCurrentPage(1);
                            }}
                            className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                          >
                            {city}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ❌ CLEAR BUTTON */}
                  {(searchTerm || cityFilter) && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setCityFilter("");
                        setCurrentPage(1);
                      }}
                      className="
            w-full sm:w-full md:w-auto
            flex items-center justify-center gap-2 px-4 py-2.5 text-sm
            bg-gray-100 hover:bg-gray-200 text-gray-700 
            rounded-xl transition shadow-sm
          "
                    >
                      <FiX size={16} />
                      Clear
                    </button>
                  )}
                </div>

                {/* RIGHT SECTION: CREATE BUTTON */}
                <div className="w-full md:w-auto">
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="
          w-full sm:w-full md:w-auto
          flex items-center justify-center gap-2 px-5 py-2.5 
          bg-gradient-to-r from-gray-900 to-gray-700 
          text-white text-sm font-medium 
          rounded-xl shadow-md 
          hover:shadow-lg active:scale-95 transition
        "
                  >
                    <FiPlus className="text-lg transition-transform" />
                    Create Customer
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* 🔥 SCROLLABLE CONTENT */}
          <div className="flex-1 overflow-y-auto">
            {/* DESKTOP TABLE */}
            <div className="hidden h-auto md:block overflow-x-auto bg lg:h-[400px]">
              <table className="w-full table-fixed text-lg">
                <thead className="bg-black text-white sticky top-0 z-[40]">
                  <tr>
                    <th className="px-4 border py-3  text-center font-semibold text-white  whitespace-nowrap  bg-black">
                      Name
                    </th>
                    <th className="px-4 border py-3  text-center font-semibold text-white  whitespace-nowrap  bg-black">
                      Mobile
                    </th>
                    <th className="px-4 border py-3  text-center font-semibold text-white  whitespace-nowrap  bg-black">
                      City
                    </th>
                    <th className="px-4 border py-3  text-center font-semibold text-white  whitespace-nowrap  bg-black">
                      Orders
                    </th>
                    <th className="px-4 py-3 font-bold text-lg sticky right-0 z-[120] bg-black shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.1)]">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="text-[16px]">
                  {paginatedCustomers.map((customer) => {
                    const orderCount = orders.filter((o) => {
                      return (
                        o.customer?._id === customer._id ||
                        o.customer === customer._id
                      );
                    }).length;

                    return (
                      <tr
                        key={customer._id || customer.id}
                        className="hover:bg-gray-50 h-[60px] "
                      >
                        <td className="text-center">{customer.name}</td>

                        <td className="text-center ">{customer.mobile}</td>

                        <td className="text-center ">{customer.city}</td>

                        <td className="text-center">
                          <span className="px-2.5 py-1 text-xs lg:text-lg bg-gray-100 text-gray-700 rounded-full">
                            {orderCount}
                          </span>
                        </td>

                        <td className="flex items-center justify-center pt-4">
                          <div className="flex text-center gap-4">
                            <button
                              onClick={() => onViewOrders(customer)}
                              className="cursor-pointer"
                            >
                              <FiEye size={22} />
                            </button>
                            <button
                              className="text-lg   "
                              onClick={() => onViewOrders(customer)}
                            >
                              <i className="fas fa-edit  cursor-pointer"></i>
                            </button>
                            {/* <button
                              className="px-3 py-1.5 text-sm bg-gray-900 text-white rounded-md cursor-pointer hover:bg-black transition"
                              onClick={() => onViewOrders(customer)}
                            >
                              View Orders
                            </button> */}
                            <button
                              className=" rounded-md text-xl cursor-pointer hover:bg-gray-50  transition"
                              onClick={() => {
                                setCustomerToDelete(customer);
                                setShowDeleteModal(true);
                              }}
                            >
                              <FiTrash2 size={20} />
                            </button>
                            {/* <button
                        className="p-2 rounded-md cursor-pointer hover:bg-gray-50 text-gray-500 transition"
                        onClick={() => onDeleteCustomer(customer.id)}
                      >
                        <FiTrash2 size={16} />
                      </button> */}
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {paginatedCustomers.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-400">
                        No matching customers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* MOBILE CARDS */}
            <div className="md:hidden p-3 space-y-3">
              {paginatedCustomers.map((customer) => (
                <CustomerCard
                  key={customer._id || customer.id}
                  customer={customer}
                  orders={orders}
                  onViewOrders={onViewOrders}
                  onDelete={(c) => {
                    setCustomerToDelete(c);
                    setShowDeleteModal(true);
                  }}
                />
              ))}
            </div>
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mb-8 md:mb-0 items-center gap-6 pt-4 pb-2 border-t border-gray-200">
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>

              <div className="flex gap-6 ">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
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
          )}{" "}
        </div>
      )}

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Customer"
        message={`Are you sure you want to delete ${
          customerToDelete?.name || "this customer"
        }? This action cannot be undone.`}
        onConfirm={confirmDeleteCustomer}
        onCancel={() => {
          setShowDeleteModal(false);
          setCustomerToDelete(null);
        }}
      />
    </div>
  );
};

export default CustomerList;

// import React, { useState } from "react";
// import { FiTrash2, FiPlus } from "react-icons/fi";
// import ConfirmModal from "./common/ConfirmModal";
// import { FiSearch, FiMapPin, FiX } from "react-icons/fi";
// import AddCustomer from "./CustomerForm";
// import TableSkeleton from "./common/TableSkeleton";
// import CustomerCard from "./common/CustomerCard";
// const ITEMS_PER_PAGE = 6;

// const CustomerList = ({
//   customers,
//   orders,
//   loading,
//   onViewOrders,
//   onAddCustomer,
//   onDeleteCustomer,
//   onCheckMobile,
// }) => {
//   const [showCityDropdown, setShowCityDropdown] = useState(false);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [cityFilter, setCityFilter] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [customerToDelete, setCustomerToDelete] = useState(null);

//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const filteredCustomers = customers
//     .filter((customer) => {
//       const term = searchTerm.toLowerCase();

//       const matchesSearch =
//         customer.name?.toLowerCase().includes(term) ||
//         customer.mobile?.toLowerCase().includes(term) ||
//         customer.city?.toLowerCase().includes(term) ||
//         customer.address?.toLowerCase().includes(term);

//       const matchesCity = cityFilter ? customer.city === cityFilter : true;

//       return matchesSearch && matchesCity;
//     })
//     .sort((a, b) => {
//       // newest first (descending)
//       return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
//     });
//   //  automatic go to first page if not customer in 2nd page

//   const uniqueCities = [...new Set(customers.map((c) => c.city))];

//   const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);

//   const paginatedCustomers = filteredCustomers.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE,
//   );
//   const confirmDeleteCustomer = () => {
//     if (onDeleteCustomer && customerToDelete) {
//       onDeleteCustomer(customerToDelete._id || customerToDelete.id);
//     }

//     // adjust page manually
//     const newTotal = filteredCustomers.length - 1;
//     const newTotalPages = Math.ceil(newTotal / ITEMS_PER_PAGE);

//     if (currentPage > newTotalPages) {
//       setCurrentPage(newTotalPages || 1);
//     }

//     setShowDeleteModal(false);
//     setCustomerToDelete(null);
//   };

//   return (
//     <div className="bg-white border border-gray-200 shadow-sm overflow-hidden ">
//       {showCreateForm ? (
//         <AddCustomer
//           onSave={(data, goToNext) => {
//             onAddCustomer(data, goToNext); // ← Pass goToNext to parent
//             if (!goToNext) {
//               setShowCreateForm(false); // Only close form if NOT going to next page
//             }
//           }}
//           onCancel={() => setShowCreateForm(false)}
//           onCheckMobile={onCheckMobile}
//         />
//       ) : loading ? (
//         <TableSkeleton rows={6} columns={5} />
//       ) : (
//         <>
//           {/* Filters */}
//           <div className="p-4    shadow-sm">
//             <div className="flex justify-between items-center mb-0">
//               {/* search and filter */}
//               <div className="flex flex-col md:flex-row md:items-center gap-3">
//                 {/* 🔍 Search Input */}
//                 <div className="relative w-full md:w-1/2 max-w-[220px]">
//                   <FiSearch
//                     className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                     size={16}
//                   />
//                   <input
//                     type="text"
//                     placeholder="Search customers..."
//                     className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl bg-gray-50
//         focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400
//         transition-all duration-200 shadow-sm"
//                     value={searchTerm}
//                     onChange={(e) => {
//                       setSearchTerm(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                   />
//                 </div>

//                 {/* 📍 City Filter */}
//                 <div className="relative w-[150px]">
//                   {/* Trigger */}
//                   <div
//                     onClick={() => setShowCityDropdown((prev) => !prev)}
//                     className="pl-10 pr-8 py-2.5 cursor-pointer text-sm border border-gray-300 rounded-xl bg-gray-50
//     flex items-center justify-between hover:bg-white transition shadow-sm"
//                   >
//                     <FiMapPin
//                       className="absolute left-3 text-gray-400"
//                       size={16}
//                     />
//                     <span
//                       className={`${cityFilter ? "text-gray-800" : "text-gray-400"}`}
//                     >
//                       {cityFilter || "All Cities"}
//                     </span>
//                     <span className="text-gray-200 text-xs">▼</span>
//                   </div>

//                   {/* Dropdown */}
//                   {showCityDropdown && (
//                     <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
//                       <div
//                         onClick={() => {
//                           setCityFilter("");
//                           setShowCityDropdown(false);
//                           setCurrentPage(1);
//                         }}
//                         className="px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer"
//                       >
//                         All Cities
//                       </div>

//                       {uniqueCities.map((city, i) => (
//                         <div
//                           key={i}
//                           onClick={() => {
//                             setCityFilter(city);
//                             setShowCityDropdown(false);
//                             setCurrentPage(1);
//                           }}
//                           className="px-4 py-2 text-sm  hover:bg-gray-200 cursor-pointer"
//                         >
//                           {city}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* ❌ Clear Button */}
//                 {(searchTerm || cityFilter) && (
//                   <button
//                     className="flex cursor-pointer items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium
//       bg-gray-100 hover:bg-gray-50 text-gray-700 hover:text-gray-600
//       rounded-xl transition-all duration-200 border border-gray-200 hover:border-gray-200 shadow-sm"
//                     onClick={() => {
//                       setSearchTerm("");
//                       setCityFilter("");
//                       setCurrentPage(1);
//                     }}
//                   >
//                     <FiX size={16} />
//                     Clear
//                   </button>
//                 )}
//               </div>
//               {/* create customer */}
//               <div>
//                 <button
//                   onClick={() => setShowCreateForm(true)}
//                   className="group flex items-center gap-2 px-5 cursor-pointer py-2.5
//                bg-gradient-to-r from-gray-900 to-gray-700
//                text-white text-sm font-medium
//                rounded-xl shadow-md
//                hover:shadow-lg hover:from-black hover:to-gray-800
//                active:scale-95 transition-all duration-200"
//                 >
//                   <FiPlus className="text-lg transition-transform duration-200 group-hover:rotate-90" />
//                   Create Customer
//                 </button>
//               </div>
//             </div>
//           </div>
//           {/* DESKTOP TABLE */}
//           <div className="hidden md:block overflow-x-auto lg:h-[410px]">
//             <table className="w-full table-fixed text-lg">
//               <thead className="bg-black text-white sticky top-0 z-[40]">
//                 <tr>
//                   <th className="px-4 border py-3  text-center font-semibold text-white  whitespace-nowrap  bg-black">
//                     Name
//                   </th>
//                   <th className="px-4 border py-3  text-center font-semibold text-white  whitespace-nowrap  bg-black">
//                     Mobile
//                   </th>
//                   <th className="px-4 border py-3  text-center font-semibold text-white  whitespace-nowrap  bg-black">
//                     City
//                   </th>
//                   <th className="px-4 border py-3  text-center font-semibold text-white  whitespace-nowrap  bg-black">
//                     Orders
//                   </th>
//                   <th className="px-4 py-3 font-bold text-lg sticky right-0 z-[120] bg-black shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.1)]">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>

//               <tbody className="text-[16px]">
//                 {paginatedCustomers.map((customer) => {
//                   const orderCount = orders.filter((o) => {
//                     return (
//                       o.customer?._id === customer._id ||
//                       o.customer === customer._id
//                     );
//                   }).length;

//                   return (
//                     <tr
//                       key={customer._id || customer.id}
//                       className="hover:bg-gray-50 h-[60px] "
//                     >
//                       <td className="text-center">{customer.name}</td>

//                       <td className="text-center ">{customer.mobile}</td>

//                       <td className="text-center ">{customer.city}</td>

//                       <td className="text-center">
//                         <span className="px-2.5 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
//                           {orderCount}
//                         </span>
//                       </td>

//                       <td className="flex items-center justify-center pt-4">
//                         <div className="flex text-center gap-2">
//                           <button
//                             className="px-3 py-1.5 text-sm bg-gray-900 text-white rounded-md cursor-pointer hover:bg-black transition"
//                             onClick={() => onViewOrders(customer)}
//                           >
//                             View Orders
//                           </button>
//                           <button
//                             className="p-2 rounded-md text-xl cursor-pointer hover:bg-gray-50  transition"
//                             onClick={() => {
//                               setCustomerToDelete(customer);
//                               setShowDeleteModal(true);
//                             }}
//                           >
//                             <FiTrash2 size={16} />
//                           </button>
//                           {/* <button
//                         className="p-2 rounded-md cursor-pointer hover:bg-gray-50 text-gray-500 transition"
//                         onClick={() => onDeleteCustomer(customer.id)}
//                       >
//                         <FiTrash2 size={16} />
//                       </button> */}
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}

//                 {paginatedCustomers.length === 0 && (
//                   <tr>
//                     <td colSpan="5" className="p-8 text-center text-gray-400">
//                       No matching customers found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//           {/* MOBILE CARDS */}
//           <div className="md:hidden p-3 space-y-3">
//             {paginatedCustomers.map((customer) => (
//               <CustomerCard
//                 key={customer._id || customer.id}
//                 customer={customer}
//                 orders={orders}
//                 onViewOrders={onViewOrders}
//                 onDelete={(c) => {
//                   setCustomerToDelete(c);
//                   setShowDeleteModal(true);
//                 }}
//               />
//             ))}
//           </div>
//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex justify-center items-center gap-6 pt-4 pb-2 border-t border-gray-200">
//               <span className="text-sm text-gray-700">
//                 Page {currentPage} of {totalPages}
//               </span>

//               <div className="flex gap-6 ">
//                 <button
//                   disabled={currentPage === 1}
//                   onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//                   className="px-4 py-2 bg-black text-white rounded hover:bg-black-500 disabled:opacity-50  cursor-pointer disabled:cursor-not-allowed"
//                 >
//                   <i className="fa-solid fa-arrow-left"></i> Previous
//                 </button>

//                 <button
//                   disabled={currentPage >= totalPages}
//                   onClick={() => setCurrentPage((p) => p + 1)}
//                   className="px-4 py-2 bg-black text-white rounded hover:bg-black-500 disabled:opacity-50  cursor-pointer disabled:cursor-not-allowed"
//                 >
//                   Next <i className="fa-solid fa-arrow-right"></i>
//                 </button>
//               </div>
//             </div>
//           )}{" "}
//         </>
//       )}

//       <ConfirmModal
//         isOpen={showDeleteModal}
//         title="Delete Customer"
//         message={`Are you sure you want to delete ${
//           customerToDelete?.name || "this customer"
//         }? This action cannot be undone.`}
//         onConfirm={confirmDeleteCustomer}
//         onCancel={() => {
//           setShowDeleteModal(false);
//           setCustomerToDelete(null);
//         }}
//       />
//     </div>
//   );
// };

// export default CustomerList;
