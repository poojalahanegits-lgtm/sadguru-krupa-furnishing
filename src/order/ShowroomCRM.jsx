import React, { useState } from "react";
import { toast } from "react-toastify";
import Tabs from "./Tabs";
import CustomerList from "./CustomerList";
import AddCustomer from "./CustomerForm.jsx";
import OrderList from "./OrderList";
import ConfirmModal from "./common/ConfirmModal";
import OrderDetailsPage from "./OrdersDetailsPage";
import {
  useCustomers,
  useCreateCustomer,
  useUpdateCustomer,
  useDeleteCustomer,
  useCheckCustomerMobile,
} from "./services/customerApi.js";
import {
  useOrders,
  useCreateOrder,
  useUpdateOrder,
  useDeleteOrder,
  useUpdateOrderProduct,
  useDeleteOrderProduct,
} from "./services/orderApi.js";
import AddOrder from "./OrderForm.jsx";

const ShowroomCRM = () => {
  // =========================
  // 🔹 STATE MANAGEMENT
  // =========================
  const [activeTab, setActiveTab] = useState("customerList");

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  if (selectedOrder) {
    console.log(selectedOrder);
  }
  const [activePage, setActivePage] = useState("list");
  const [editingOrder, setEditingOrder] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  // =========================
  // 🔹 INITIAL DATA LOAD
  // =========================

  //! customers react query hooks
  const { data: customerResponse, isLoading: customersLoading } =
    useCustomers();
  // all customers
  const customers = customerResponse?.data || [];

  // create customer
  const createCustomerMutation = useCreateCustomer();

  // update customer
  const updateCustomerMutation = useUpdateCustomer();

  // delete customer
  const deleteCustomerMutation = useDeleteCustomer();

  // check customer is exists with mobile number
  const checkMobileMutation = useCheckCustomerMobile();

  //!  orders react query hooks
  // orders
  const { data: orders = [], isLoading: ordersLoading } = useOrders();

  // create order
  const createOrderMutation = useCreateOrder();

  // update order
  const updateOrderMutation = useUpdateOrder();

  // delete order
  const deleteOrderMutation = useDeleteOrder();

  //! products react query hooks
  const updateProductMutation = useUpdateOrderProduct();

  const deleteProductMutation = useDeleteOrderProduct();

  // =========================
  // 🔹 CUSTOMER CRUD WITH API
  // =========================

  // ➕ Add new customer
  const addCustomer = async (customerData) => {
    try {
      const response = await createCustomerMutation.mutateAsync(customerData);

      return response.data.data;
    } catch (error) {
      console.log("ADD CUSTOMER ERROR:", error);
      throw error;
    }
  };

  // ✏️ Update existing customer
  const updateCustomerDetails = async (customerData) => {
    try {
      await updateCustomerMutation.mutateAsync({
        id: customerData._id,
        data: customerData,
      });
    } catch (error) {
      console.log("UPDATE CUSTOMER ERROR:", error);
      throw error;
    }
  };

  // ❌ Delete customer + their orders
  const deleteCustomerById = async (id) => {
    try {
      await deleteCustomerMutation.mutateAsync(id);
      // Remove all orders belonging to this customer
    } catch (error) {
      console.log("DELETE CUSTOMER ERROR:", error);
      throw error;
    }
  };

  // =========================
  // 🔹 ADD CUSTOMER FLOW CONTROL
  // =========================
  const handleAddCustomer = async (customerData, goToNext = false) => {
    try {
      const newCustomer = await addCustomer(customerData);
      if (goToNext) {
        setSelectedCustomer(newCustomer);
        setActivePage("details");
      } else {
        setActiveTab("customerList");
      }
    } catch (error) {
      console.log("Failed to add customer:", error);
    }
  };
  // =========================
  // 🔹 ORDER CRUD WITH API
  // =========================

  const updateOrderDetails = async (orderData) => {
    try {
      await updateOrderMutation.mutateAsync({
        id: orderData._id,
        data: orderData,
      });

      setEditingOrder(null);
      setEditingProduct(null);
    } catch (error) {
      console.log("UPDATE ORDER ERROR:", error);
      throw error;
    }
  };
  // order delete
  const handleAskDeleteOrder = (orderId) => {
    setOrderToDelete(orderId);
    setConfirmOpen(true);
  };

  // order delete confirmation
  const handleConfirmDelete = async () => {
    try {
      await deleteOrderMutation.mutateAsync(orderToDelete);
      setConfirmOpen(false);
      setOrderToDelete(null);
    } catch (error) {
      console.log("DELETE ORDER ERROR:", error);
    }
  };

  // =========================
  // 🔹 PRODUCT MANAGEMENT INSIDE ORDER
  // =========================

  // ❌ Delete product from order
  const deleteProduct = async (orderId, productId) => {
    try {
      const order = orders.find((o) => o._id === orderId);

      if (!order) return;

      if (order.products.length === 1) {
        // const confirmDelete = window.confirm(
        //   "Order has only one product. Deleting it will remove the entire order. Continue?",
        // );

        const confirmDelete = toast.warning(
          "Order has only one product. Deleting it will remove the entire order. Continue?",
        );
        if (confirmDelete) {
          handleAskDeleteOrder(orderId);
        }

        return;
      }

      await deleteProductMutation.mutateAsync({
        orderId,
        productId,
      });
    } catch (error) {
      console.log("DELETE PRODUCT ERROR:", error);
    }
  };

  // ✏️ Update product inside order
  const updateProductInOrder = async (orderId, updatedProduct) => {
    try {
      await updateProductMutation.mutateAsync({
        orderId,
        productId: updatedProduct._id,
        data: updatedProduct,
      });
    } catch (error) {
      console.log("UPDATE PRODUCT ERROR:", error);
    }
  };

  // check customer is exists with the mobile number
  const handleCheckMobile = async (mobile) => {
    try {
      const res = await checkMobileMutation.mutateAsync(mobile);

      if (res.exists) {
        toast.dismiss();
        toast.warning(
          `Customer already exists: ${res.data.name},  Do you want to create again`,
        );
      }

      return res;
    } catch (error) {
      console.log(error);
    }
  };
  // =========================
  // 🔹 TABS CONFIGURATION
  // =========================
  const tabs = [
    { id: "customerList", label: "Customer List", icon: "FiUsers" },
    { id: "orderList", label: "Order List", icon: "FiShoppingCart" },
  ];

  // =========================
  // 🔹 MAIN RENDER LOGIC
  // =========================
  const renderContent = () => {
    if (activePage === "details" && selectedCustomer) {
      return (
        <OrderDetailsPage
          customer={selectedCustomer}
          orders={orders.filter(
            (o) => o.customer?._id === selectedCustomer._id,
          )}
          onBack={() => {
            setActivePage("list");
            setSelectedCustomer(null);
          }}
          onDeleteOrder={handleAskDeleteOrder}
          onDeleteProduct={deleteProduct}
          onAddNewOrder={async (newOrder) => {
            try {
              const response = await createOrderMutation.mutateAsync(newOrder);

              return response.data.data;
            } catch (error) {
              console.log("Failed to add order:", error);
            }
          }}
          customers={customers}
          onUpdateCustomer={updateCustomerDetails}
          onUpdateOrder={updateOrderDetails}
          onUpdateProduct={updateProductInOrder}
        />
      );
    }

    if (activeTab === "customerList") {
      return (
        <CustomerList
          customers={customers}
          orders={orders}
          loading={customersLoading}
          onViewOrders={(customer) => {
            setSelectedCustomer(customer);
            setActivePage("details");
          }}
          onDeleteCustomer={deleteCustomerById}
          onAddCustomer={handleAddCustomer}
          onCheckMobile={handleCheckMobile}
        />
      );
    }

    if (activeTab === "orderList") {
      return (
        <OrderList
          orders={orders}
          customers={customers}
          loading={ordersLoading}
          onViewDetails={(order, customer) => {
            setSelectedOrder(order);
            setSelectedCustomer(customer);
            setActivePage("details");
          }}
          onDeleteOrder={handleAskDeleteOrder}
        />
      );
    }

    return null;
  };

  // =========================
  // 🔹 MAIN JSX
  // =========================
  return (
    <div className="tracking-wider">
      {activePage === "list" && (
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      )}

      <div className="bg-white">{renderContent()}</div>

      {/* Edit Order Modal */}
      {editingOrder && !editingProduct && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-auto"
          onClick={() => {
            setEditingOrder(null);
            setEditingProduct(null);
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-6xl w-full max-h-[90vh] overflow-auto"
          >
            <AddOrder
              order={editingOrder}
              customers={customers}
              selectedCustomerId={editingOrder.customer?._id}
              onSave={(data) => {
                updateOrderDetails(data);
                setEditingOrder(null);
              }}
              onCancel={() => {
                setEditingOrder(null);
                setEditingProduct(null);
              }}
            />
          </div>
        </div>
      )}

      {/* confirm modal for order delete */}
      <ConfirmModal
        isOpen={confirmOpen}
        title="Delete Order"
        message="Are you sure you want to delete this order? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setConfirmOpen(false);
          setOrderToDelete(null);
        }}
      />
    </div>
  );
};

export default ShowroomCRM;

// import React, { useState, useEffect } from "react";
// // UI Components (child components)
// import Tabs from "./Tabs";
// import CustomerList from "./CustomerList";
// import AddCustomer from "./AddCustomer";
// import OrderList from "./OrderList";
// import ConfirmModal from "./common/ConfirmModal";
// import OrderDetailsPage from "./OrdersDetailsPage";
// import {
//   useCustomers,
//   useCreateCustomer,
//   useUpdateCustomer,
//   useDeleteCustomer,
// } from "./services/index.js";
// import {
//   getOrders,
//   createOrder,
//   updateOrder,
//   deleteOrder,
// } from "./services/orderApi.js";
// import AddOrder from "./AddOrder.jsx";

// const ShowroomCRM = () => {
//   // =========================
//   // 🔹 STATE MANAGEMENT
//   // =========================
//   const [activeTab, setActiveTab] = useState("customerList");

//   const [orders, setOrders] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   if (selectedOrder) {
//     console.log(selectedOrder);
//   }
//   const [activePage, setActivePage] = useState("list");
//   const [editingOrder, setEditingOrder] = useState(null);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [orderToDelete, setOrderToDelete] = useState(null);
//   const [showAddCustomer, setShowAddCustomer] = useState(false);

//   // =========================
//   // 🔹 INITIAL DATA LOAD
//   // =========================

//   // customers react query hooks
//   const { data: customerResponse, isLoading } = useCustomers();

//   // all customers
//   const customers = customerResponse?.data || [];

//   // create customer
//   const createCustomerMutation = useCreateCustomer();

//   // update customer
//   const updateCustomerMutation = useUpdateCustomer();

//   // delete customer
//   const deleteCustomerMutation = useDeleteCustomer();

//   const fetchOrders = async () => {
//     try {
//       const response = await getOrders();
//       console.log("ORDERS API:", response.data);
//       setOrders(response.data.data || []);
//     } catch (error) {
//       console.log("ORDER FETCH ERROR:", error);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const handleUpdateProduct = (orderId, updatedProduct) => {
//     setOrders((prevOrders) =>
//       prevOrders.map((order) => {
//         if (order.id === orderId) {
//           return {
//             ...order,
//             products: order.products.map((product) =>
//               product.id === updatedProduct.id ? updatedProduct : product,
//             ),
//           };
//         }
//         return order;
//       }),
//     );
//     alert("Product updated successfully!");
//   };

//   // =========================
//   // 🔹 CUSTOMER CRUD WITH API
//   // =========================

//   // ➕ Add new customer
//   const addCustomer = async (customerData) => {
//     try {
//       const response = await createCustomerMutation.mutateAsync(customerData);

//       return response.data.data;
//     } catch (error) {
//       console.log("ADD CUSTOMER ERROR:", error);
//       throw error;
//     }
//   };

//   // ✏️ Update existing customer
//   const updateCustomerDetails = async (customerData) => {
//     try {
//       await updateCustomerMutation.mutateAsync({
//         id: customerData._id,
//         data: customerData,
//       });
//     } catch (error) {
//       console.log("UPDATE CUSTOMER ERROR:", error);
//       throw error;
//     }
//   };

//   // ❌ Delete customer + their orders
//   const deleteCustomerById = async (id) => {
//     try {
//       await deleteCustomerMutation.mutateAsync(id);
//       // Remove all orders belonging to this customer
//       setOrders(orders.filter((o) => o.customer?._id !== id));
//     } catch (error) {
//       console.log("DELETE CUSTOMER ERROR:", error);
//       throw error;
//     }
//   };

//   // =========================
//   // 🔹 ORDER CRUD WITH API
//   // =========================

//   const updateOrderDetails = async (orderData) => {
//     try {
//       const response = await updateOrder(orderData._id, orderData);
//       const updatedOrder = response.data.data;
//       setOrders(
//         orders.map((o) => (o._id === updatedOrder._id ? updatedOrder : o)),
//       );
//       setEditingOrder(null);
//       setEditingProduct(null);
//     } catch (error) {
//       console.log("UPDATE ORDER ERROR:", error);
//       throw error;
//     }
//   };

//   // order delete
//   const handleAskDeleteOrder = (orderId) => {
//     setOrderToDelete(orderId);
//     setConfirmOpen(true);
//   };

//   // order delete confirmation
//   const handleConfirmDelete = async () => {
//     try {
//       await deleteOrder(orderToDelete);
//       setOrders(orders.filter((o) => o._id !== orderToDelete));
//       setConfirmOpen(false);
//       setOrderToDelete(null);
//     } catch (error) {
//       console.log("DELETE ORDER ERROR:", error);
//     }
//   };

//   // =========================
//   // 🔹 PRODUCT MANAGEMENT INSIDE ORDER
//   // =========================

//   // ❌ Delete product from order
//   const deleteProduct = async (orderId, productId) => {
//     const order = orders.find((o) => o._id === orderId);
//     if (order && order.products.length === 1) {
//       if (
//         confirm(
//           "Order has only one product. Deleting it will remove entire order. Continue?",
//         )
//       ) {
//         handleAskDeleteOrder(orderId);
//       }
//     } else {
//       const updatedProducts = order.products.filter((p) => p.id !== productId);
//       const updatedOrder = { ...order, products: updatedProducts };
//       try {
//         const response = await updateOrder(orderId, updatedOrder);
//         setOrders(
//           orders.map((o) => (o._id === orderId ? response.data.data : o)),
//         );
//       } catch (error) {
//         console.log("DELETE PRODUCT ERROR:", error);
//       }
//     }
//   };

//   // ✏️ Update product inside order
//   const updateProductInOrder = async (orderId, updatedProduct) => {
//     const order = orders.find((o) => o._id === orderId);
//     const updatedProducts = order.products.map((p) =>
//       p.id === updatedProduct.id ? updatedProduct : p,
//     );
//     const updatedOrder = { ...order, products: updatedProducts };

//     try {
//       const response = await updateOrder(orderId, updatedOrder);
//       setOrders(
//         orders.map((o) => (o._id === orderId ? response.data.data : o)),
//       );
//     } catch (error) {
//       console.log("UPDATE PRODUCT ERROR:", error);
//     }
//   };

//   // =========================
//   // 🔹 TABS CONFIGURATION
//   // =========================
//   const tabs = [
//     { id: "customerList", label: "Customer List", icon: "FiUsers" },
//     { id: "orderList", label: "Order List", icon: "FiShoppingCart" },
//   ];

//   // =========================
//   // 🔹 ADD CUSTOMER FLOW CONTROL
//   // =========================
//   const handleAddCustomer = async (customerData, goToNext = false) => {
//     try {
//       const newCustomer = await addCustomer(customerData);
//       if (goToNext) {
//         setSelectedCustomer(newCustomer);
//         setActivePage("details");
//       } else {
//         setActiveTab("customerList");
//       }
//     } catch (error) {
//       console.log("Failed to add customer:", error);
//     }
//   };

//   // =========================
//   // 🔹 MAIN RENDER LOGIC
//   // =========================
//   const renderContent = () => {
//     if (activePage === "details" && selectedCustomer) {
//       return (
//         <OrderDetailsPage
//           customer={selectedCustomer}
//           orders={orders.filter(
//             (o) => o.customer?._id === selectedCustomer._id,
//           )}
//           onBack={() => {
//             setActivePage("list");
//             setSelectedCustomer(null);
//           }}
//           onDeleteOrder={handleAskDeleteOrder}
//           onDeleteProduct={deleteProduct}
//           onAddNewOrder={async (newOrder) => {
//             try {
//               const response = await createOrder(newOrder);
//               setOrders([...orders, response.data.data]);
//             } catch (error) {
//               console.log("Failed to add order:", error);
//             }
//           }}
//           customers={customers}
//           onUpdateCustomer={updateCustomerDetails}
//           onUpdateOrder={updateOrderDetails}
//           onUpdateProduct={updateProductInOrder}
//         />
//       );
//     }

//     if (activeTab === "customerList") {
//       return (
//         <CustomerList
//           customers={customers}
//           orders={orders}
//           onViewOrders={(customer) => {
//             setSelectedCustomer(customer);
//             setActivePage("details");
//           }}
//           onDeleteCustomer={deleteCustomerById}
//           onAddCustomer={handleAddCustomer}
//         />
//       );
//     }

//     if (activeTab === "orderList") {
//       return (
//         <OrderList
//           orders={orders}
//           customers={customers}
//           onViewDetails={(order, customer) => {
//             setSelectedOrder(order);
//             setSelectedCustomer(customer);
//             setActivePage("details");
//           }}
//           onDeleteOrder={handleAskDeleteOrder}
//         />
//       );
//     }

//     return null;
//   };

//   // =========================
//   // 🔹 MAIN JSX
//   // =========================
//   return (
//     <div className="max-h-screen">
//       {activePage === "list" && (
//         <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
//       )}

//       <div className="bg-white">{renderContent()}</div>

//       {/* Edit Order Modal */}
//       {editingOrder && !editingProduct && (
//         <div
//           className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-auto"
//           onClick={() => {
//             setEditingOrder(null);
//             setEditingProduct(null);
//           }}
//         >
//           <div
//             onClick={(e) => e.stopPropagation()}
//             className="max-w-6xl w-full max-h-[90vh] overflow-auto"
//           >
//             <AddOrder
//               order={editingOrder}
//               customers={customers}
//               selectedCustomerId={editingOrder.customer?._id}
//               onSave={(data) => {
//                 updateOrderDetails(data);
//                 setEditingOrder(null);
//               }}
//               onCancel={() => {
//                 setEditingOrder(null);
//                 setEditingProduct(null);
//               }}
//             />
//           </div>
//         </div>
//       )}

//       {/* confirm modal for order delete */}
//       <ConfirmModal
//         isOpen={confirmOpen}
//         title="Delete Order"
//         message="Are you sure you want to delete this order? This action cannot be undone."
//         onConfirm={handleConfirmDelete}
//         onCancel={() => {
//           setConfirmOpen(false);
//           setOrderToDelete(null);
//         }}
//       />
//     </div>
//   );
// };

// export default ShowroomCRM;
