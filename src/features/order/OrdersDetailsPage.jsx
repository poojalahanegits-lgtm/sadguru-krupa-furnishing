/**
 * =========================================================
 * OrderDetailsPage.jsx
 * =========================================================
 * Handles complete customer order management workflow:
 *
 * Features:
 * - View customer order history
 * - Search/filter customer orders
 * - Edit customer details
 * - Create new orders
 * - Edit existing orders
 * - Edit individual products inside orders
 * - Delete orders/products with confirmation
 * - Product detail modal
 * - Responsive split-screen layout
 *
 * Architecture:
 * - Left Panel  → Customer + Orders Snapshot
 * - Right Panel → Dynamic Edit/Create Forms
 *
 * Optimizations:
 * - useMemo for filtered order calculations
 * - Debounced search input
 * - Centralized panel state management

 * =========================================================
 */

import React, { useState, useEffect, useMemo } from "react";
import { FiArrowLeft, FiSearch, FiX } from "react-icons/fi";
import AddOrder from "./OrderForm";
import AddCustomer from "./CustomerForm";
import ProductForm from "./ProductForm";
import ConfirmModal from "./common/ConfirmModal";
import { toast } from "react-toastify";
import { FiEye } from "react-icons/fi";
import FIELD_CONFIG from "../../constants/inputFieldConfig";
import ProductDetailsModal from "./common/ProductDetailsModal";

/**
 * =========================================================
 * CustomerSnapshot Component
 * =========================================================
 * Displays:
 * - Customer profile details
 * - Order summary cards
 * - Product listing for each order
 * - Edit/Delete actions
 *
 * This component is purely presentational and receives
 * all state/actions from parent component.
 * =========================================================
 */
const CustomerSnapshot = ({
  filteredOrders,
  selectedCustomer,
  customerOrders,
  onBack,
  searchTerm,
  setSearchTerm,
  closeAllPanels,
  setEditingCustomer,
  setShowAddOrderForm,
  setEditingOrder,
  deleteOrder,
  startProductEdit,
  deleteProduct,
  formatDate,
  isEditingActive,
  setSelectedProduct,
  setShowProductModal,
}) => {
  if (!selectedCustomer) {
    return (
      <div className="border border-gray-200 rounded-2xl px-6  text-center">
        <p className="text-gray-500">
          No customer selected. Add a customer first.
        </p>
      </div>
    );
  }

  return (
    <div className="sticky lg:top-0 z-30 ">
      <div className="px-4 sm:px-5 pt-3 pb-4 border-b">
        {/* TOP ROW */}
        {/* DESKTOP TITLE */}
        <div className="hidden lg:flex pb-2 justify-center flex-1">
          <h2
            className={`text-xl font-medium  ${
              isEditingActive() ? "block" : "hidden"
            }`}
          >
            Customer and Order Details
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* LEFT SIDE */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-sm px-3 py-2 bg-gray-900 hover:bg-black text-white rounded-lg cursor-pointer shrink-0"
            >
              <FiArrowLeft />
              Back
            </button>

            {/* MOBILE TITLE */}
            <h2 className="text-sm sm:text-base font-medium lg:hidden text-right">
              Customer & Order Details
            </h2>
          </div>

          {/* DESKTOP TITLE */}
          <div className="hidden lg:flex justify-center flex-1">
            <h2
              className={`text-xl font-medium  ${
                isEditingActive() ? "hidden" : "block"
              }`}
            >
              Customer and Order Details
            </h2>
          </div>

          {/* SEARCH */}
          <div className="relative w-full lg:w-80">
            <input
              type="text"
              placeholder="Search orders, products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl outline-none text-sm sm:text-base"
            />

            {/* SEARCH ICON */}
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FiSearch className="w-4 h-4" />
            </span>

            {/* CLEAR BUTTON */}
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
              >
                <FiX size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
      {/* all customers details */}
      <div className="flex-1 min-h-0 px-5 pb-1  bg-black ">
        <div className=" lg:px-3   ">
          <div className="flex justify-between gap-3 flex-wrap items-start h-full ">
            <div>
              <h3 className="text-md sm:text-2xl lg:text-3xl  mb-2 pt-1  break-words text-white">
                {selectedCustomer.name}{" "}
                <span className="px-3 mx-2 py-1 rounded-full text-[12px]  bg-gray-600 text-white border ">
                  <span className="text bold  text-[14px] lg:text-[16px] pt-1">
                    {" "}
                    {customerOrders.length}{" "}
                  </span>
                  Order(s)
                </span>
              </h3>

              <div className="text-white text-xs sm:text-sm break-words">
                {[
                  selectedCustomer?.mobile,
                  selectedCustomer?.city,
                  selectedCustomer?.address,
                ]
                  .filter(Boolean)
                  .join(" • ")}
              </div>

              {/* <div className="flex gap-2 bg-amber-700 flex-wrap lg:mt-3">
                {hasPartial && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30">
                    Partial Payment
                  </span>
                )}
              </div> */}
            </div>

            <div
              className={`flex justify-between gap-3 mb-1 md:mb-0  mt-0   ${
                isEditingActive() ? "" : "mt-4"
              }`}
            >
              <div>
                <button
                  className="px-4 py-1 md:py-2 rounded-xl cursor-pointer bg-white text-black font-semibold hover:bg-gray-200 transition"
                  onClick={() => {
                    closeAllPanels();
                    setEditingCustomer(selectedCustomer);
                  }}
                >
                  Edit Customer
                </button>
              </div>
              <div>
                <button
                  className="px-4 py-1 md:py-2 rounded-xl cursor-pointer bg-white text-black font-semibold hover:bg-gray-200 transition"
                  onClick={() => {
                    closeAllPanels();
                    setShowAddOrderForm(true);
                  }}
                >
                  Create New Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* all orders */}
      <div className="lg:flex-1 lg:overflow-y-auto min-h-0 bg-[#fbfbfb] lg:h-[350px] px-3 sm:px-5 pb-5 space-y-3 pt-2">
        {filteredOrders.map((order) => (
          <div key={order._id} className="md::border rounded-2xl p-4 ">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:items-center">
              <div className="flex items-start justify-between gap-3 w-full sm:w-auto">
                <div className="font-extrabold text-base sm:text-xl break-all">
                  {order.orderNo}
                </div>

                {/* MOBILE STATUS */}
                <div
                  className={`sm:hidden  flex px-3 lg:py-1 py-1 border rounded-full text-xs lg:text-[16px] `}
                >
                  {order.orderStatus}
                </div>

                <div className="sm:hidden">
                  <div className="flex justify-end sm:justify-start gap-2 items-center w-full sm:w-auto">
                    <button
                      className="px-1 py-1 cursor-pointer rounded-lg   text-md "
                      onClick={() => {
                        closeAllPanels(); // ✅ reset everything first
                        setEditingOrder(order);
                      }}
                      // onClick={() => {
                      //   setEditingOrder(order);
                      //   setEditingProductState(null);
                      // }}
                    >
                      <i className="fas fa-edit text-green-600 hover:text-green-800 cursor-pointer"></i>
                    </button>
                    <button
                      className="px-1 py-1 cursor-pointer rounded-lg bg-white  text-red-600 text-sm hover:bg-red-50"
                      onClick={() => deleteOrder(order._id)}
                    >
                      <i className="fas fa-trash-alt text-red-600 hover:text-red-800 cursor-pointer"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div
                className={`px-3 hidden md:flex lg:py-1 py-2 rounded-full text-xs lg:text-[16px]   border 

  `}
              >
                {order.orderStatus}
              </div>
              <div className=" hidden sm:flex justify-end sm:justify-start gap-2 items-center w-full sm:w-auto">
                <button
                  className="px-3 py-1 cursor-pointer rounded-lg   text-lg "
                  onClick={() => {
                    closeAllPanels(); // ✅ reset everything first
                    setEditingOrder(order);
                  }}
                  // onClick={() => {
                  //   setEditingOrder(order);
                  //   setEditingProductState(null);
                  // }}
                >
                  <i className="fas fa-edit text-green-600 hover:text-green-800 cursor-pointer"></i>
                </button>
                <button
                  className="px-3 py-1 cursor-pointer rounded-lg bg-white border border-red-300 text-red-600 text-sm hover:bg-red-50"
                  onClick={() => deleteOrder(order._id)}
                >
                  <i className="fas fa-trash-alt text-red-600 hover:text-red-800 cursor-pointer"></i>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
              <div className="bg-white rounded-xl p-3 border border-gray-200">
                <small className="text-gray-800  lg:text-[17px]   block">
                  Total
                </small>
                <strong className="text-base sm:text-lg">
                  ₹
                  {parseInt(
                    order.totalAmount || order.total || 0,
                  ).toLocaleString()}
                </strong>
              </div>
              <div className="bg-white rounded-xl p-3 border border-gray-200">
                <small className="text-gray-800  lg:text-[17px]   block">
                  Received Amount
                </small>
                <strong className="text-base sm:text-lg">
                  ₹{parseInt(order.receivedAmount || 0).toLocaleString()}
                </strong>
              </div>
              <div className="bg-white rounded-xl p-3 border border-gray-200">
                <small className="text-gray-800  lg:text-[17px]  block">
                  Delivery
                </small>
                <strong className="text-base sm:text-lg">
                  {formatDate(order.deliveryDate)}
                </strong>
              </div>
              <div className="bg-white rounded-xl p-3 border border-gray-200">
                <small className="text-gray-800  lg:text-[17px]  block">
                  Due Amount
                </small>
                <strong className="text-base sm:text-lg">
                  ₹{parseInt(order.dueAmount || 0).toLocaleString()}
                </strong>
              </div>
            </div>

            {/* Products list - now without inline editing */}
            {order.products
              ?.filter((p) => p.isActive)
              .map((product, idx) => (
                <div
                  key={product._id || idx}
                  className="mt-3 border border-gray-200 bg-white rounded-xl p-3 sm:p-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between gap-3 sm:items-center">
                    <p className="font-semibold text-base sm:text-[18px] break-words">
                      {product.category?.charAt(0).toUpperCase() +
                        product.category?.slice(1)}

                      {product?.productCode && (
                        <span className="text-[16px]  ">
                          {" "}
                          <span className="font-normal">- </span>
                          {product.productCode}
                        </span>
                      )}
                    </p>
                    {/* <span className="px-2 py-1 rounded-full text-xs bg-gray-100 border border-gray-200">
        {product.curtainType}
      </span> */}
                    <div>
                      {/* Order Status */}
                      <span
                        className={`px-3 py-1 rounded-full text-xs lg:text-[16px]   border
      
    `}
                        //                     className={`px-2 py-1 rounded-full text-xs font-semibold border
                        //   ${product?.orderStatus === "Cancelled" ? " text-red-700 " : ""}
                        //   ${product?.orderStatus === "Pending" ? "text-yellow-700 " : ""}
                        //   ${product?.orderStatus === "Completed" ? " text-green-700 " : ""}
                        //   ${product?.orderStatus === "Processing" ? " text-blue-700 " : ""}
                        // `}
                      >
                        {product?.orderStatus}
                      </span>
                    </div>
                    <div className="flex items-center flex-wrap gap-3 mt-2 sm:mt-0">
                      {/* View Product */}
                      <div className="relative group ">
                        <button
                          className="cursor-pointer pt-2"
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowProductModal(true);
                          }}
                        >
                          <FiEye size={20} />
                        </button>
                      </div>
                      {/* Edit Product */}
                      <button
                        className="text-md text-green-500 cursor-pointer hover:text-green-700"
                        onClick={() => startProductEdit(order._id, product)}
                      >
                        <i className="fas fa-edit text-green-600 hover:text-green-800 cursor-pointer"></i>
                      </button>
                      {/* Delete Product */}
                      <button
                        className="text-md text-red-500 cursor-pointer hover:text-red-700"
                        onClick={() => deleteProduct(order._id, product._id)}
                      >
                        <i className="fas fa-trash-alt text-red-600 hover:text-red-800 cursor-pointer"></i>
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-[13px] sm:text-[14px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 text-gray-900">
                    {Object.entries(product.attributes || {}).map(
                      ([key, value]) => (
                        <div key={key} className="flex gap-1">
                          <span className="text-gray-600 whitespace-nowrap">
                            {FIELD_CONFIG[key]?.label || key}:
                          </span>
                          <span className="font-medium text-gray-800 break-words">
                            {value || "-"}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};
const OrderDetailsPage = ({
  customer,
  orders,
  onBack,
  onDeleteOrder,
  onDeleteProduct,
  onAddNewOrder,
  customers,
  onUpdateCustomer,
  onUpdateOrder,
  onUpdateProduct,
}) => {
  // Controls different editing panels/forms
  const [showAddOrderForm, setShowAddOrderForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);

  const [selectedCustomer, setSelectedCustomer] = useState(customer);

  // Stores currently editing product + parent order id
  const [editingProductState, setEditingProductState] = useState(null); // Track product being edited
  const [editingProductOrderId, setEditingProductOrderId] = useState(null); // Track which order contains the product

  // Delete confirmation states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productOrderId, setProductOrderId] = useState(null);
  const [showProductDeleteModal, setShowProductDeleteModal] = useState(false);

  // Search state with debounce optimization
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  /**
   * Closes all active editing panels/forms
   * Used before opening another panel to avoid UI conflicts
   */
  const closeAllPanels = () => {
    setEditingCustomer(null);
    setEditingOrder(null);
    setEditingProductState(null);
    setEditingProductOrderId(null);
    setShowAddOrderForm(false);
  };
  /**
   * Handles newly created order
   * Adds metadata and updates parent state
   */
  const handleOrderCreated = (newOrder) => {
    setShowAddOrderForm(false);

    const completeOrder = {
      ...newOrder,
      orderNo: newOrder.orderNo || `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      customer: selectedCustomer._id,
    };

    if (onAddNewOrder) {
      onAddNewOrder(completeOrder);
    }
  };
  /**
   * Opens delete confirmation modal for selected order
   */
  const deleteOrder = (orderId) => {
    setOrderToDelete(orderId);
    setShowDeleteModal(true);
  };
  /**
   * Confirms order deletion and resets modal state
   */
  const confirmDeleteOrder = () => {
    if (onDeleteOrder && orderToDelete) {
      onDeleteOrder(orderToDelete);
    }
    setShowDeleteModal(false);
    setOrderToDelete(null);
    setEditingOrder(null);
  };
  /**
   * Opens delete confirmation modal for product
   */
  const deleteProduct = (orderId, productId) => {
    setProductOrderId(orderId);
    setProductToDelete(productId);
    setShowProductDeleteModal(true);
  };
  /**
   * Deletes selected product from order
   * Also clears editing state if same product is being edited
   */
  const confirmDeleteProduct = () => {
    if (onDeleteProduct && productOrderId && productToDelete) {
      onDeleteProduct(productOrderId, productToDelete);
    }

    // Reset states
    setShowProductDeleteModal(false);
    setProductToDelete(null);
    setProductOrderId(null);

    // If editing same product → reset
    if (editingProductState?.id === productToDelete) {
      setEditingProductState(null);
      setEditingProductOrderId(null);
    }
  };
  /**
   * Updates existing order
   * Merges old + new products before saving
   */
  const handleUpdateOrder = async (updatedOrder) => {
    if (onUpdateOrder) {
      const originalOrder = orders.find((o) => o._id === updatedOrder._id);

      const finalOrder = {
        ...updatedOrder,
        products: [
          ...(originalOrder?.products || []),
          ...(updatedOrder.products || []),
        ],
      };

      await onUpdateOrder(finalOrder);
    }

    // ✅ CLOSE FORM ONLY AFTER SAVE
    setEditingOrder(null);
  };
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowProductModal(false);
        setSelectedProduct(null);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, []);
  /**
   * Opens product edit form
   * Closes other panels before opening
   */
  const startProductEdit = (orderId, product) => {
    closeAllPanels(); // ✅ important
    setEditingProductState(product);
    setEditingProductOrderId(orderId);
  };

  const handleUpdateProductInline = (updatedProduct) => {
    console.log("✅ Updated Product From Form:", updatedProduct);

    setEditingProductState(updatedProduct);
  };
  /**
   * Saves inline product changes
   * Calls parent update handler
   */
  const saveProductEdit = () => {
    console.log("editingProductOrderId:", editingProductOrderId);
    console.log("editingProductState:", editingProductState);
    console.log("onUpdateProduct exists:", !!onUpdateProduct);
    if (onUpdateProduct && editingProductOrderId && editingProductState) {
      // Call the parent's update function
      onUpdateProduct(editingProductOrderId, editingProductState);
      toast.dismiss();
      toast.success("Product details updated successfully!");
    } else {
      console.error("Cannot update product:", {
        hasOnUpdateProduct: !!onUpdateProduct,
        hasOrderId: !!editingProductOrderId,
        hasProduct: !!editingProductState,
      });
      toast.error("Failed to update product");
    }

    // Close the edit panel
    setEditingProductState(null);
    setEditingProductOrderId(null);
  };

  const cancelProductEdit = () => {
    setEditingProductState(null);
    setEditingProductOrderId(null);
  };
  /**
   * Debounces search input
   * Prevents expensive filtering on every keystroke
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);
  // Helper to check if any editing is active
  const isEditingActive = () => {
    return (
      editingCustomer || editingOrder || editingProductState || showAddOrderForm
    );
  };
  /**
   * Memoized customer orders
   * Prevents unnecessary recalculations
   */
  const customerOrders = useMemo(() => {
    return orders.filter(
      (o) =>
        o.customer?._id === selectedCustomer._id ||
        o.customer === selectedCustomer._id,
    );
  }, [orders, selectedCustomer._id]);
  /**
   * Filters orders/products based on search term
   * Supports searching:
   * - Order number
   * - Order status
   * - Product attributes
   */
  const filteredOrders = useMemo(() => {
    if (!debouncedSearch.trim()) return customerOrders;

    const term = debouncedSearch.toLowerCase();

    return customerOrders.filter((order) => {
      // Match order-level fields
      const orderMatch =
        order.orderNo?.toLowerCase().includes(term) ||
        order.orderStatus?.toLowerCase().includes(term);
      // Match product-level searchable fields
      const productMatch = order.products?.some((p) =>
        [p.category, p.roomName, p.fabricName, p.fabricType, p.curtainRod]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(term),
      );

      return orderMatch || productMatch;
    });
  }, [debouncedSearch, customerOrders]);

  // format date
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  /**
   * =========================================================
   * MAIN LAYOUT
   * =========================================================
   * Left  → Customer snapshot + orders
   * Right → Dynamic editing forms
   * =========================================================
   */
  return (
    <div className=" lg:h-[600px] overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full h-full p-2 sm:p-3 lg:p-4 gap-3 lg:gap-6 overflow-hidden">
        {/* LEFT SECTION → Customer snapshot + order listing */}

        <div
          className={`transition-all duration-500 ease-in-out 
${isEditingActive() ? "hidden lg:flex lg:w-[40%]" : "w-full"}
  w-full rounded-2xl border bg-white shadow-sm 
  lg:h-[calc(100vh-2rem)] flex flex-col min-h-0`}
        >
          <div
            className={`transition-opacity duration-300 flex-1   ${
              isEditingActive() ? "opacity-100" : "opacity-100"
            }`}
          >
            <CustomerSnapshot
              filteredOrders={filteredOrders}
              selectedCustomer={selectedCustomer}
              customerOrders={customerOrders}
              onBack={onBack}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              closeAllPanels={closeAllPanels}
              setEditingCustomer={setEditingCustomer}
              setShowAddOrderForm={setShowAddOrderForm}
              setEditingOrder={setEditingOrder}
              deleteOrder={deleteOrder}
              startProductEdit={startProductEdit}
              deleteProduct={deleteProduct}
              formatDate={formatDate}
              isEditingActive={isEditingActive}
              setSelectedProduct={setSelectedProduct}
              setShowProductModal={setShowProductModal}
            />
          </div>
        </div>
        {/* RIGHT SECTION → Dynamic forms/edit panels */}
        <div
          className={`transition-all duration-500 ease-in-out  lg:h-[calc(90vh-2rem)]  transform  min-h-0
  ${
    isEditingActive()
      ? "w-full lg:w-[60%] lg:translate-x-0 opacity-100"
      : "hidden lg:block lg:w-0 lg:translate-x-10 opacity-0"
  } 
  w-full  mt-4 lg:mt-0`}
        >
          <div className="h-full  rounded-2xl shadow-sm md:border md:border-gray-100 animate-slideInRight  flex flex-col  lg:overflow-y-auto">
            <div className="min-h-full  animate-slideInRight">
              {isEditingActive() && (
                <div className="sticky top-0 bg-white  z-10 flex justify-end px-3 lg:pt-1 pt-3">
                  <button
                    onClick={closeAllPanels}
                    className=" rounded-full hover:bg-gray-100 transition cursor-pointer"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              )}

              {editingCustomer ? (
                <AddCustomer
                  customer={editingCustomer}
                  showNextButton={false}
                  onCancel={() => setEditingCustomer(null)}
                  onSave={async (updatedCustomer) => {
                    try {
                      const finalCustomer = {
                        ...editingCustomer,
                        ...updatedCustomer,
                      };

                      await onUpdateCustomer(finalCustomer);

                      // ✅ instant UI update
                      setSelectedCustomer(finalCustomer);

                      setEditingCustomer(null);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                />
              ) : editingOrder ? (
                <AddOrder
                  // Force form re-render when editing different order
                  key={editingOrder?._id}
                  order={{ ...editingOrder, products: [] }}
                  customers={customers}
                  selectedCustomerId={
                    selectedCustomer._id || selectedCustomer._id
                  }
                  onSave={handleUpdateOrder}
                  onCancel={() => setEditingOrder(null)}
                  title="Edit Order"
                />
              ) : editingProductState ? (
                <div className="bg-white rounded-2xl px-3 sm:px-5 py-3">
                  <h3 className="text-2xl font-bold mb-4">Edit Product</h3>
                  <ProductForm
                    product={editingProductState}
                    index={0}
                    onUpdate={handleUpdateProductInline}
                    hideRemove={true}
                  />
                  <div className="flex gap-2 mt-6 mb-12 justify-end">
                    <button
                      onClick={cancelProductEdit}
                      className="
  w-full sm:w-auto
  px-6 py-3
  cursor-pointer font-extrabold
  rounded-xl
  border border-gray-300
  text-gray-600
  hover:bg-gray-100
  transition
  text-md sm:text-base
"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveProductEdit}
                      className="px-5 py-2 bg-gray-800  cursor-pointer text-white rounded-xl"
                    >
                      Save Changes
                    </button>
                    {/* <button
                      onClick={() => {
                        console.log("Manual save test");
                        saveProductEdit();
                      }}
                      className="px-5 py-2 bg-green-600 cursor-pointer text-white rounded-xl"
                    >
                      Test Save
                    </button> */}
                  </div>
                </div>
              ) : showAddOrderForm ? (
                <AddOrder
                  key="create-order"
                  selectedCustomerId={selectedCustomer._id}
                  customers={customers}
                  onSave={handleOrderCreated}
                  onCancel={() => setShowAddOrderForm(false)}
                  title="Create New Order"
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Product full details modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={showProductModal}
        onClose={() => {
          setShowProductModal(false);
          setSelectedProduct(null);
        }}
        formatDate={formatDate}
      />
      {/* Order delete confirmation modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Order"
        message="Are you sure you want to delete this order? This action cannot be undone."
        onConfirm={confirmDeleteOrder}
        onCancel={() => {
          setShowDeleteModal(false);
          setOrderToDelete(null);
        }}
      />
      {/* Product delete confirmation modal */}
      <ConfirmModal
        isOpen={showProductDeleteModal}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={confirmDeleteProduct}
        onCancel={() => {
          setShowProductDeleteModal(false);
          setProductToDelete(null);
          setProductOrderId(null);
        }}
      />
    </div>
  );
};

export default OrderDetailsPage;

// import React, { useState, useEffect, useMemo } from "react";
// import { FiArrowLeft, FiSearch, FiX } from "react-icons/fi";
// import AddOrder from "./OrderForm";
// import AddCustomer from "./CustomerForm";
// import ProductForm from "./ProductForm";
// import ConfirmModal from "./common/ConfirmModal";
// import { toast } from "react-toastify";
// import { FiEye } from "react-icons/fi";
// import FIELD_CONFIG from "../../constants/inputFieldConfig";
// import ProductDetailsModal from "./common/ProductDetailsModal";
// const CustomerSnapshot = ({
//   filteredOrders,
//   selectedCustomer,
//   customerOrders,
//   onBack,
//   searchTerm,
//   setSearchTerm,
//   closeAllPanels,
//   setEditingCustomer,
//   setShowAddOrderForm,
//   setEditingOrder,
//   deleteOrder,
//   startProductEdit,
//   deleteProduct,
//   formatDate,
//   isEditingActive,
//   setSelectedProduct,
//   setShowProductModal,
// }) => {
//   if (!selectedCustomer) {
//     return (
//       <div className="border border-gray-200 rounded-2xl px-6  text-center">
//         <p className="text-gray-500">
//           No customer selected. Add a customer first.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="sticky lg:top-0 z-30 ">
//       <div className="px-4 sm:px-5 pt-3 pb-4 border-b">
//         {/* TOP ROW */}
//         {/* DESKTOP TITLE */}
//         <div className="hidden lg:flex pb-2 justify-center flex-1">
//           <h2
//             className={`text-xl font-medium  ${
//               isEditingActive() ? "block" : "hidden"
//             }`}
//           >
//             Customer and Order Details
//           </h2>
//         </div>
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//           {/* LEFT SIDE */}
//           <div className="flex items-center justify-between gap-3">
//             <button
//               onClick={onBack}
//               className="flex items-center gap-2 text-sm px-3 py-2 bg-gray-900 hover:bg-black text-white rounded-lg cursor-pointer shrink-0"
//             >
//               <FiArrowLeft />
//               Back
//             </button>

//             {/* MOBILE TITLE */}
//             <h2 className="text-sm sm:text-base font-medium lg:hidden text-right">
//               Customer & Order Details
//             </h2>
//           </div>

//           {/* DESKTOP TITLE */}
//           <div className="hidden lg:flex justify-center flex-1">
//             <h2
//               className={`text-xl font-medium  ${
//                 isEditingActive() ? "hidden" : "block"
//               }`}
//             >
//               Customer and Order Details
//             </h2>
//           </div>

//           {/* SEARCH */}
//           <div className="relative w-full lg:w-80">
//             <input
//               type="text"
//               placeholder="Search orders, products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl outline-none text-sm sm:text-base"
//             />

//             {/* SEARCH ICON */}
//             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//               <FiSearch className="w-4 h-4" />
//             </span>

//             {/* CLEAR BUTTON */}
//             {searchTerm && (
//               <button
//                 onClick={() => setSearchTerm("")}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
//               >
//                 <FiX size={16} />
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//       {/* all customers details */}
//       <div className="flex-1 min-h-0 px-5 pb-1  bg-black ">
//         <div className=" lg:px-3   ">
//           <div className="flex justify-between gap-3 flex-wrap items-start h-full ">
//             <div>
//               <h3 className="text-md sm:text-2xl lg:text-3xl  mb-2 pt-1  break-words text-white">
//                 {selectedCustomer.name}{" "}
//                 <span className="px-3 mx-2 py-1 rounded-full text-[12px]  bg-gray-600 text-white border ">
//                   <span className="text bold  text-[14px] lg:text-[16px] pt-1">
//                     {" "}
//                     {customerOrders.length}{" "}
//                   </span>
//                   Order(s)
//                 </span>
//               </h3>

//               <div className="text-white text-xs sm:text-sm break-words">
//                 {[
//                   selectedCustomer?.mobile,
//                   selectedCustomer?.city,
//                   selectedCustomer?.address,
//                 ]
//                   .filter(Boolean)
//                   .join(" • ")}
//               </div>

//               {/* <div className="flex gap-2 bg-amber-700 flex-wrap lg:mt-3">
//                 {hasPartial && (
//                   <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30">
//                     Partial Payment
//                   </span>
//                 )}
//               </div> */}
//             </div>

//             <div
//               className={`flex justify-between gap-3 mb-1 md:mb-0  mt-0   ${
//                 isEditingActive() ? "" : "mt-4"
//               }`}
//             >
//               <div>
//                 <button
//                   className="px-4 py-1 md:py-2 rounded-xl cursor-pointer bg-white text-black font-semibold hover:bg-gray-200 transition"
//                   onClick={() => {
//                     closeAllPanels();
//                     setEditingCustomer(selectedCustomer);
//                   }}
//                 >
//                   Edit Customer
//                 </button>
//               </div>
//               <div>
//                 <button
//                   className="px-4 py-1 md:py-2 rounded-xl cursor-pointer bg-white text-black font-semibold hover:bg-gray-200 transition"
//                   onClick={() => {
//                     closeAllPanels();
//                     setShowAddOrderForm(true);
//                   }}
//                 >
//                   Create New Order
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* all orders */}
//       <div className="lg:flex-1 lg:overflow-y-auto min-h-0 bg-[#fbfbfb] lg:h-[350px] px-3 sm:px-5 pb-5 space-y-3 pt-2">
//         {filteredOrders.map((order) => (
//           <div key={order._id} className="md::border rounded-2xl p-4 ">
//             <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:items-center">
//               <div className="flex items-start justify-between gap-3 w-full sm:w-auto">
//                 <div className="font-extrabold text-base sm:text-xl break-all">
//                   {order.orderNo}
//                 </div>

//                 {/* MOBILE STATUS */}
//                 <div
//                   className={`sm:hidden  flex px-3 lg:py-1 py-1 border rounded-full text-xs lg:text-[16px] `}
//                 >
//                   {order.orderStatus}
//                 </div>

//                 <div className="sm:hidden">
//                   <div className="flex justify-end sm:justify-start gap-2 items-center w-full sm:w-auto">
//                     <button
//                       className="px-1 py-1 cursor-pointer rounded-lg   text-md "
//                       onClick={() => {
//                         closeAllPanels(); // ✅ reset everything first
//                         setEditingOrder(order);
//                       }}
//                       // onClick={() => {
//                       //   setEditingOrder(order);
//                       //   setEditingProductState(null);
//                       // }}
//                     >
//                       <i className="fas fa-edit text-green-600 hover:text-green-800 cursor-pointer"></i>
//                     </button>
//                     <button
//                       className="px-1 py-1 cursor-pointer rounded-lg bg-white  text-red-600 text-sm hover:bg-red-50"
//                       onClick={() => deleteOrder(order._id)}
//                     >
//                       <i className="fas fa-trash-alt text-red-600 hover:text-red-800 cursor-pointer"></i>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <div
//                 className={`px-3 hidden md:flex lg:py-1 py-2 rounded-full text-xs lg:text-[16px]   border

//   `}
//               >
//                 {order.orderStatus}
//               </div>
//               <div className=" hidden sm:flex justify-end sm:justify-start gap-2 items-center w-full sm:w-auto">
//                 <button
//                   className="px-3 py-1 cursor-pointer rounded-lg   text-lg "
//                   onClick={() => {
//                     closeAllPanels(); // ✅ reset everything first
//                     setEditingOrder(order);
//                   }}
//                   // onClick={() => {
//                   //   setEditingOrder(order);
//                   //   setEditingProductState(null);
//                   // }}
//                 >
//                   <i className="fas fa-edit text-green-600 hover:text-green-800 cursor-pointer"></i>
//                 </button>
//                 <button
//                   className="px-3 py-1 cursor-pointer rounded-lg bg-white border border-red-300 text-red-600 text-sm hover:bg-red-50"
//                   onClick={() => deleteOrder(order._id)}
//                 >
//                   <i className="fas fa-trash-alt text-red-600 hover:text-red-800 cursor-pointer"></i>
//                 </button>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
//               <div className="bg-white rounded-xl p-3 border border-gray-200">
//                 <small className="text-gray-800  lg:text-[17px]   block">
//                   Total
//                 </small>
//                 <strong className="text-base sm:text-lg">
//                   ₹
//                   {parseInt(
//                     order.totalAmount || order.total || 0,
//                   ).toLocaleString()}
//                 </strong>
//               </div>
//               <div className="bg-white rounded-xl p-3 border border-gray-200">
//                 <small className="text-gray-800  lg:text-[17px]   block">
//                   Received Amount
//                 </small>
//                 <strong className="text-base sm:text-lg">
//                   ₹{parseInt(order.receivedAmount || 0).toLocaleString()}
//                 </strong>
//               </div>
//               <div className="bg-white rounded-xl p-3 border border-gray-200">
//                 <small className="text-gray-800  lg:text-[17px]  block">
//                   Delivery
//                 </small>
//                 <strong className="text-base sm:text-lg">
//                   {formatDate(order.deliveryDate)}
//                 </strong>
//               </div>
//               <div className="bg-white rounded-xl p-3 border border-gray-200">
//                 <small className="text-gray-800  lg:text-[17px]  block">
//                   Due Amount
//                 </small>
//                 <strong className="text-base sm:text-lg">
//                   ₹{parseInt(order.dueAmount || 0).toLocaleString()}
//                 </strong>
//               </div>
//             </div>

//             {/* Products list - now without inline editing */}
//             {order.products
//               ?.filter((p) => p.isActive)
//               .map((product, idx) => (
//                 <div
//                   key={product._id || idx}
//                   className="mt-3 border border-gray-200 bg-white rounded-xl p-3 sm:p-4"
//                 >
//                   <div className="flex flex-col sm:flex-row justify-between gap-3 sm:items-center">
//                     <p className="font-semibold text-base sm:text-[18px] break-words">
//                       {product.category?.charAt(0).toUpperCase() +
//                         product.category?.slice(1)}

//                       {product?.productCode && (
//                         <span className="text-[16px]  ">
//                           {" "}
//                           <span className="font-normal">- </span>
//                           {product.productCode}
//                         </span>
//                       )}
//                     </p>
//                     {/* <span className="px-2 py-1 rounded-full text-xs bg-gray-100 border border-gray-200">
//         {product.curtainType}
//       </span> */}
//                     <div>
//                       {/* Order Status */}
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs lg:text-[16px]   border

//     `}
//                         //                     className={`px-2 py-1 rounded-full text-xs font-semibold border
//                         //   ${product?.orderStatus === "Cancelled" ? " text-red-700 " : ""}
//                         //   ${product?.orderStatus === "Pending" ? "text-yellow-700 " : ""}
//                         //   ${product?.orderStatus === "Completed" ? " text-green-700 " : ""}
//                         //   ${product?.orderStatus === "Processing" ? " text-blue-700 " : ""}
//                         // `}
//                       >
//                         {product?.orderStatus}
//                       </span>
//                     </div>
//                     <div className="flex items-center flex-wrap gap-3 mt-2 sm:mt-0">
//                       {/* View Product */}
//                       <div className="relative group ">
//                         <button
//                           className="cursor-pointer pt-2"
//                           onClick={() => {
//                             setSelectedProduct(product);
//                             setShowProductModal(true);
//                           }}
//                         >
//                           <FiEye size={20} />
//                         </button>
//                       </div>
//                       {/* Edit Product */}
//                       <button
//                         className="text-md text-green-500 cursor-pointer hover:text-green-700"
//                         onClick={() => startProductEdit(order._id, product)}
//                       >
//                         <i className="fas fa-edit text-green-600 hover:text-green-800 cursor-pointer"></i>
//                       </button>
//                       {/* Delete Product */}
//                       <button
//                         className="text-md text-red-500 cursor-pointer hover:text-red-700"
//                         onClick={() => deleteProduct(order._id, product._id)}
//                       >
//                         <i className="fas fa-trash-alt text-red-600 hover:text-red-800 cursor-pointer"></i>
//                       </button>
//                     </div>
//                   </div>
//                   <div className="mt-2 text-[13px] sm:text-[14px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 text-gray-900">
//                     {Object.entries(product.attributes || {}).map(
//                       ([key, value]) => (
//                         <div key={key} className="flex gap-1">
//                           <span className="text-gray-600 whitespace-nowrap">
//                             {FIELD_CONFIG[key]?.label || key}:
//                           </span>
//                           <span className="font-medium text-gray-800 break-words">
//                             {value || "-"}
//                           </span>
//                         </div>
//                       ),
//                     )}
//                   </div>
//                 </div>
//               ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// const OrderDetailsPage = ({
//   customer,
//   orders,
//   onBack,
//   onDeleteOrder,
//   onDeleteProduct,
//   onAddNewOrder,
//   customers,
//   onUpdateCustomer,
//   onUpdateOrder,
//   onUpdateProduct,
// }) => {
//   const [showAddOrderForm, setShowAddOrderForm] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(customer);
//   const [editingCustomer, setEditingCustomer] = useState(null);
//   const [editingOrder, setEditingOrder] = useState(null);
//   const [editingProductState, setEditingProductState] = useState(null); // Track product being edited
//   const [editingProductOrderId, setEditingProductOrderId] = useState(null); // Track which order contains the product
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [orderToDelete, setOrderToDelete] = useState(null);
//   const [productToDelete, setProductToDelete] = useState(null);
//   const [productOrderId, setProductOrderId] = useState(null);
//   const [showProductDeleteModal, setShowProductDeleteModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showProductModal, setShowProductModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const closeAllPanels = () => {
//     setEditingCustomer(null);
//     setEditingOrder(null);
//     setEditingProductState(null);
//     setEditingProductOrderId(null);
//     setShowAddOrderForm(false);
//   };
//   const handleOrderCreated = (newOrder) => {
//     setShowAddOrderForm(false);

//     const completeOrder = {
//       ...newOrder,
//       orderNo: newOrder.orderNo || `ORD-${Date.now()}`,
//       createdAt: new Date().toISOString(),
//       customer: selectedCustomer._id,
//     };

//     if (onAddNewOrder) {
//       onAddNewOrder(completeOrder);
//     }
//   };

//   const deleteOrder = (orderId) => {
//     setOrderToDelete(orderId);
//     setShowDeleteModal(true);
//   };
//   const confirmDeleteOrder = () => {
//     if (onDeleteOrder && orderToDelete) {
//       onDeleteOrder(orderToDelete);
//     }
//     setShowDeleteModal(false);
//     setOrderToDelete(null);
//     setEditingOrder(null);
//   };
//   const deleteProduct = (orderId, productId) => {
//     setProductOrderId(orderId);
//     setProductToDelete(productId);
//     setShowProductDeleteModal(true);
//   };
//   const confirmDeleteProduct = () => {
//     if (onDeleteProduct && productOrderId && productToDelete) {
//       onDeleteProduct(productOrderId, productToDelete);
//     }

//     // Reset states
//     setShowProductDeleteModal(false);
//     setProductToDelete(null);
//     setProductOrderId(null);

//     // If editing same product → reset
//     if (editingProductState?.id === productToDelete) {
//       setEditingProductState(null);
//       setEditingProductOrderId(null);
//     }
//   };
//   const handleUpdateOrder = async (updatedOrder) => {
//     if (onUpdateOrder) {
//       const originalOrder = orders.find((o) => o._id === updatedOrder._id);

//       const finalOrder = {
//         ...updatedOrder,
//         products: [
//           ...(originalOrder?.products || []),
//           ...(updatedOrder.products || []),
//         ],
//       };

//       await onUpdateOrder(finalOrder);
//     }

//     // ✅ CLOSE FORM ONLY AFTER SAVE
//     setEditingOrder(null);
//   };
//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.key === "Escape") {
//         setShowProductModal(false);
//         setSelectedProduct(null);
//       }
//     };

//     window.addEventListener("keydown", handleEsc);

//     return () => window.removeEventListener("keydown", handleEsc);
//   }, []);
//   const startProductEdit = (orderId, product) => {
//     closeAllPanels(); // ✅ important
//     setEditingProductState(product);
//     setEditingProductOrderId(orderId);
//   };

//   const handleUpdateProductInline = (updatedProduct) => {
//     console.log("✅ Updated Product From Form:", updatedProduct);

//     setEditingProductState(updatedProduct);
//   };
//   const saveProductEdit = () => {
//     console.log("editingProductOrderId:", editingProductOrderId);
//     console.log("editingProductState:", editingProductState);
//     console.log("onUpdateProduct exists:", !!onUpdateProduct);
//     if (onUpdateProduct && editingProductOrderId && editingProductState) {
//       // Call the parent's update function
//       onUpdateProduct(editingProductOrderId, editingProductState);
//       toast.dismiss();
//       toast.success("Product details updated successfully!");
//     } else {
//       console.error("Cannot update product:", {
//         hasOnUpdateProduct: !!onUpdateProduct,
//         hasOrderId: !!editingProductOrderId,
//         hasProduct: !!editingProductState,
//       });
//       toast.error("Failed to update product");
//     }

//     // Close the edit panel
//     setEditingProductState(null);
//     setEditingProductOrderId(null);
//   };

//   const cancelProductEdit = () => {
//     setEditingProductState(null);
//     setEditingProductOrderId(null);
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(searchTerm);
//     }, 300); // 300ms delay

//     return () => clearTimeout(timer);
//   }, [searchTerm]);
//   // Helper to check if any editing is active
//   const isEditingActive = () => {
//     return (
//       editingCustomer || editingOrder || editingProductState || showAddOrderForm
//     );
//   };
//   const customerOrders = useMemo(() => {
//     return orders.filter(
//       (o) =>
//         o.customer?._id === selectedCustomer._id ||
//         o.customer === selectedCustomer._id,
//     );
//   }, [orders, selectedCustomer._id]);

//   const filteredOrders = useMemo(() => {
//     if (!debouncedSearch.trim()) return customerOrders;

//     const term = debouncedSearch.toLowerCase();

//     return customerOrders.filter((order) => {
//       const orderMatch =
//         order.orderNo?.toLowerCase().includes(term) ||
//         order.orderStatus?.toLowerCase().includes(term);

//       const productMatch = order.products?.some((p) =>
//         [p.category, p.roomName, p.fabricName, p.fabricType, p.curtainRod]
//           .filter(Boolean)
//           .join(" ")
//           .toLowerCase()
//           .includes(term),
//       );

//       return orderMatch || productMatch;
//     });
//   }, [debouncedSearch, customerOrders]);

//   // format date
//   const formatDate = (date) => {
//     if (!date) return "";
//     return new Date(date).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   return (
//     <div className=" lg:h-[600px] overflow-hidden">
//       <div className="flex flex-col lg:flex-row w-full h-full p-2 sm:p-3 lg:p-4 gap-3 lg:gap-6 overflow-hidden">
//         {/* Left Section - Order Details */}
//         <div
//           className={`transition-all duration-500 ease-in-out
// ${isEditingActive() ? "hidden lg:flex lg:w-[40%]" : "w-full"}
//   w-full rounded-2xl border bg-white shadow-sm
//   lg:h-[calc(100vh-2rem)] flex flex-col min-h-0`}
//         >
//           <div
//             className={`transition-opacity duration-300 flex-1   ${
//               isEditingActive() ? "opacity-100" : "opacity-100"
//             }`}
//           >
//             <CustomerSnapshot
//               filteredOrders={filteredOrders}
//               selectedCustomer={selectedCustomer}
//               customerOrders={customerOrders}
//               onBack={onBack}
//               searchTerm={searchTerm}
//               setSearchTerm={setSearchTerm}
//               closeAllPanels={closeAllPanels}
//               setEditingCustomer={setEditingCustomer}
//               setShowAddOrderForm={setShowAddOrderForm}
//               setEditingOrder={setEditingOrder}
//               deleteOrder={deleteOrder}
//               startProductEdit={startProductEdit}
//               deleteProduct={deleteProduct}
//               formatDate={formatDate}
//               isEditingActive={isEditingActive}
//               setSelectedProduct={setSelectedProduct}
//               setShowProductModal={setShowProductModal}
//             />
//           </div>
//         </div>
//         {/* Right Section - Editing Forms (Slide in animation) */}
//         <div
//           className={`transition-all duration-500 ease-in-out  lg:h-[calc(90vh-2rem)]  transform  min-h-0
//   ${
//     isEditingActive()
//       ? "w-full lg:w-[60%] lg:translate-x-0 opacity-100"
//       : "hidden lg:block lg:w-0 lg:translate-x-10 opacity-0"
//   }
//   w-full  mt-4 lg:mt-0`}
//         >
//           <div className="h-full  rounded-2xl shadow-sm md:border md:border-gray-100 animate-slideInRight  flex flex-col  lg:overflow-y-auto">
//             <div className="min-h-full  animate-slideInRight">
//               {isEditingActive() && (
//                 <div className="sticky top-0 bg-white  z-10 flex justify-end px-3 lg:pt-1 pt-3">
//                   <button
//                     onClick={closeAllPanels}
//                     className=" rounded-full hover:bg-gray-100 transition cursor-pointer"
//                   >
//                     <FiX size={18} />
//                   </button>
//                 </div>
//               )}

//               {editingCustomer ? (
//                 <AddCustomer
//                   customer={editingCustomer}
//                   showNextButton={false}
//                   onCancel={() => setEditingCustomer(null)}
//                   onSave={async (updatedCustomer) => {
//                     try {
//                       const finalCustomer = {
//                         ...editingCustomer,
//                         ...updatedCustomer,
//                       };

//                       await onUpdateCustomer(finalCustomer);

//                       // ✅ instant UI update
//                       setSelectedCustomer(finalCustomer);

//                       setEditingCustomer(null);
//                     } catch (error) {
//                       console.log(error);
//                     }
//                   }}
//                 />
//               ) : editingOrder ? (
//                 <AddOrder
//                   key={editingOrder?._id}
//                   order={{ ...editingOrder, products: [] }}
//                   customers={customers}
//                   selectedCustomerId={
//                     selectedCustomer._id || selectedCustomer._id
//                   }
//                   onSave={handleUpdateOrder}
//                   onCancel={() => setEditingOrder(null)}
//                   title="Edit Order"
//                 />
//               ) : editingProductState ? (
//                 <div className="bg-white rounded-2xl px-3 sm:px-5 py-3">
//                   <h3 className="text-2xl font-bold mb-4">Edit Product</h3>
//                   <ProductForm
//                     product={editingProductState}
//                     index={0}
//                     onUpdate={handleUpdateProductInline}
//                     hideRemove={true}
//                   />
//                   <div className="flex gap-2 mt-6 mb-12 justify-end">
//                     <button
//                       onClick={cancelProductEdit}
//                       className="
//   w-full sm:w-auto
//   px-6 py-3
//   cursor-pointer font-extrabold
//   rounded-xl
//   border border-gray-300
//   text-gray-600
//   hover:bg-gray-100
//   transition
//   text-md sm:text-base
// "
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={saveProductEdit}
//                       className="px-5 py-2 bg-gray-800  cursor-pointer text-white rounded-xl"
//                     >
//                       Save Changes
//                     </button>
//                     {/* <button
//                       onClick={() => {
//                         console.log("Manual save test");
//                         saveProductEdit();
//                       }}
//                       className="px-5 py-2 bg-green-600 cursor-pointer text-white rounded-xl"
//                     >
//                       Test Save
//                     </button> */}
//                   </div>
//                 </div>
//               ) : showAddOrderForm ? (
//                 <AddOrder
//                   key="create-order"
//                   selectedCustomerId={selectedCustomer._id}
//                   customers={customers}
//                   onSave={handleOrderCreated}
//                   onCancel={() => setShowAddOrderForm(false)}
//                   title="Create New Order"
//                 />
//               ) : (
//                 <></>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Product Details Modal */}
//       <ProductDetailsModal
//         product={selectedProduct}
//         isOpen={showProductModal}
//         onClose={() => {
//           setShowProductModal(false);
//           setSelectedProduct(null);
//         }}
//         formatDate={formatDate}
//       />
//       <ConfirmModal
//         isOpen={showDeleteModal}
//         title="Delete Order"
//         message="Are you sure you want to delete this order? This action cannot be undone."
//         onConfirm={confirmDeleteOrder}
//         onCancel={() => {
//           setShowDeleteModal(false);
//           setOrderToDelete(null);
//         }}
//       />
//       <ConfirmModal
//         isOpen={showProductDeleteModal}
//         title="Delete Product"
//         message="Are you sure you want to delete this product? This action cannot be undone."
//         onConfirm={confirmDeleteProduct}
//         onCancel={() => {
//           setShowProductDeleteModal(false);
//           setProductToDelete(null);
//           setProductOrderId(null);
//         }}
//       />
//     </div>
//   );
// };

// export default OrderDetailsPage;
