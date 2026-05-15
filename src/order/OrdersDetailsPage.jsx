import React, { useState, useEffect, useMemo } from "react";
import { FiArrowLeft, FiSearch, FiX } from "react-icons/fi";
import AddOrder from "./OrderForm";
import AddCustomer from "./CustomerForm";
import ProductForm from "./ProductForm";
import ConfirmModal from "./common/ConfirmModal";
import { toast } from "react-toastify";
import { FiEye } from "react-icons/fi";
import FIELD_CONFIG from "../constants/inputFieldConfig";

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

  const hasPartial = customerOrders.some((o) => o.paymentStatus === "Partial");

  return (
    <div className="sticky lg:top-0 z-30 ">
      {/* Top bar */}
      <div className="px-5 pt-2 pb-4 flex flex-row lg:flex-row lg:items-center lg:justify-between gap-3 border-b">
        {/* Left side */}
        <div className="flex items-center gap-3 ">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm px-3 py-2 bg-gray-900 hover:bg-black text-white rounded-lg cursor-pointer"
          >
            <FiArrowLeft /> Back
          </button>

          {/* <h2 className="text-lg font-semibold">Orders - {customer?.name}</h2> */}
        </div>
        <div>
          <h2 className="lg:text-xl font-medium">
            {" "}
            Customer and Order Details
          </h2>{" "}
        </div>
        {/* 🔍 Search Input */}
        <div className="relative w-full sm:w-full lg:w-80">
          <input
            type="text"
            placeholder="Search orders, products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl  outline-none"
          />

          {/* Search Icon */}
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <FiSearch className="w-4 h-4" />
          </span>

          {/* Clear Button */}
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
      {/* all customers details */}
      <div className="flex-1 min-h-0 px-5  bg-black ">
        <div className="border border-gray-800 rounded-2xl px-3 bg-black shadow-sm m">
          <div className="flex justify-between gap-3 flex-wrap items-start h-full ">
            <div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl  mb-2 pt-1  break-words text-white">
                {selectedCustomer.name}{" "}
                <span className="px-3 mx-2 py-1 rounded-full text-[15px]  bg-gray-900 text-white border ">
                  {customerOrders.length} Order(s)
                </span>
              </h3>

              <div className=" text-white  text-xs sm:text-sm  break-words ">
                {selectedCustomer.mobile} • {selectedCustomer.city} •{" "}
                {selectedCustomer.address}
              </div>

              {/* <div className="flex gap-2 bg-amber-700 flex-wrap lg:mt-3">
                {hasPartial && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30">
                    Partial Payment
                  </span>
                )}
              </div> */}
            </div>

            <div className="flex justify-between gap-3 mb-1 md:mb-0  mt-0 md:mt-2 lg:mt-4 b ">
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
            <div className="flex flex-row justify-between gap-3 sm:items-center">
              <div>
                <div className="font-extrabold text-lg sm:text-xl break-all">
                  {order.orderNo}
                </div>
              </div>{" "}
              <div
                className={`px-3 lg:py-1 py-2 rounded-full text-xs lg:text-[16px]   border 

  `}
                //                   className={`px-3 py-1 rounded-full text-xs lg:text-[16px]  font-bold border bg-white
                //   ${order.orderStatus === "Cancelled" ? "text-red-500  bg-green-700  border-red-300 " : ""}
                //   ${order.orderStatus === "Pending" ? "text-yellow-800 bg-green-700    0border-yellow-300" : "bg-white"}
                //   ${order.orderStatus === "Completed" ? "text-green-500  rder-green-300" : ""}
                //   ${order.orderStatus === "Processing" ? "text-blue-500 bg-red-700 border-blue-300" : ""}
                // `}
              >
                {order.orderStatus}
              </div>
              <div className="flex flex-wrap gap-2 items-center ">
                <button
                  className="px-3 py-1 cursor-pointer rounded-lg   text-sm "
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
                        <button className="cursor-pointer pt-2">
                          <FiEye size={20} />
                        </button>

                        {/* Hover Card */}
                        <div
                          className="
hidden lg:block
absolute right-0 top-8 z-50
w-140 h-60 overflow-y-auto bg-white border border-gray-200
rounded-2xl shadow-2xl
opacity-0 invisible
group-hover:opacity-100
group-hover:visible
transition-all duration-300
p-4
"
                        >
                          {/* Header */}
                          <div className="border-b pb-2 mb-3">
                            <h4 className="font-bold text-lg text-gray-800">
                              {product.category?.charAt(0).toUpperCase() +
                                product.category?.slice(1)}
                            </h4>

                            <p className="text-sm text-gray-500 tracking-[8px]s">
                              Code: {product.productCode || "-"}
                            </p>
                          </div>

                          {/* Status */}
                          <div className="mb-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold border
            ${
              product?.orderStatus === "Cancelled"
                ? "text-red-700 bg-red-50 border-red-200"
                : ""
            }
            ${
              product?.orderStatus === "Pending"
                ? "text-yellow-700 bg-yellow-50 border-yellow-200"
                : ""
            }
            ${
              product?.orderStatus === "Completed"
                ? "text-green-700 bg-green-50 border-green-200"
                : ""
            }
            ${
              product?.orderStatus === "Processing"
                ? "text-blue-700 bg-blue-50 border-blue-200"
                : ""
            }
          `}
                            >
                              {product?.orderStatus}
                            </span>
                          </div>

                          {/* Product Attributes */}
                          <div className="grid grid-cols-2 gap-3 tracking-wider text-sm">
                            {Object.entries(product.attributes || {}).map(
                              ([key, value]) => (
                                <div
                                  key={key}
                                  className="bg-gray-50 rounded-lg p-2 border border-gray-100"
                                >
                                  <p className="text-gray-500 text-xs">
                                    {FIELD_CONFIG[key]?.label || key}
                                  </p>

                                  <p className="font-semibold text-gray-800 break-words">
                                    {value || "-"}
                                  </p>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
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
                  {/* <div className=" text-sm mt-1 text-gray-800">
                    {Object.entries(product.attributes || {}).map(
                      ([key, value], idx) => (
                        <span key={key}>
                          <span className="font-medium text-black">
                            {" "}
                            {FIELD_CONFIG[key]?.label || key}
                          </span>
                          : {value}
                          {idx <
                            Object.keys(product.attributes || {}).length - 1 &&
                            " • "}
                        </span>
                      ),
                    )}
                  </div> */}
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
  const [showAddOrderForm, setShowAddOrderForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(customer);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editingProductState, setEditingProductState] = useState(null); // Track product being edited
  const [editingProductOrderId, setEditingProductOrderId] = useState(null); // Track which order contains the product
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productOrderId, setProductOrderId] = useState(null);
  const [showProductDeleteModal, setShowProductDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const closeAllPanels = () => {
    setEditingCustomer(null);
    setEditingOrder(null);
    setEditingProductState(null);
    setEditingProductOrderId(null);
    setShowAddOrderForm(false);
  };
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

  const deleteOrder = (orderId) => {
    setOrderToDelete(orderId);
    setShowDeleteModal(true);
  };
  const confirmDeleteOrder = () => {
    if (onDeleteOrder && orderToDelete) {
      onDeleteOrder(orderToDelete);
    }
    setShowDeleteModal(false);
    setOrderToDelete(null);
    setEditingOrder(null);
  };
  const deleteProduct = (orderId, productId) => {
    setProductOrderId(orderId);
    setProductToDelete(productId);
    setShowProductDeleteModal(true);
  };
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
  // const handleUpdateOrder = async (updatedOrder) => {
  //   if (onUpdateOrder) {
  //     const originalOrder = orders.find((o) => o._id === updatedOrder._id);

  //     const finalOrder = {
  //       ...updatedOrder,
  //       products: [
  //         ...(originalOrder?.products || []),
  //         ...(updatedOrder.products || []),
  //       ],
  //     };

  //     // ✅ instant local UI update
  //     const updatedOrders = orders.map((o) =>
  //       o._id === finalOrder._id ? finalOrder : o,
  //     );

  //     // optional local state if you add one later

  //     await onUpdateOrder(finalOrder);
  //   }

  //   setEditingOrder(null);
  // };

  const startProductEdit = (orderId, product) => {
    closeAllPanels(); // ✅ important
    setEditingProductState(product);
    setEditingProductOrderId(orderId);
  };

  const handleUpdateProductInline = (updatedProduct) => {
    console.log("✅ Updated Product From Form:", updatedProduct);

    setEditingProductState(updatedProduct);
  };
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
  const customerOrders = useMemo(() => {
    return orders.filter(
      (o) =>
        o.customer?._id === selectedCustomer._id ||
        o.customer === selectedCustomer._id,
    );
  }, [orders, selectedCustomer._id]);

  const filteredOrders = useMemo(() => {
    if (!debouncedSearch.trim()) return customerOrders;

    const term = debouncedSearch.toLowerCase();

    return customerOrders.filter((order) => {
      const orderMatch =
        order.orderNo?.toLowerCase().includes(term) ||
        order.orderStatus?.toLowerCase().includes(term);

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

  return (
    <div className=" lg:h-[600px] overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full h-full p-2 sm:p-3 lg:p-4 gap-3 lg:gap-6 overflow-hidden">
        {/* Left Section - Order Details */}
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
            />
          </div>
        </div>
        {/* Right Section - Editing Forms (Slide in animation) */}
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

      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideInRight {
          animation: slideInRight 0.4s ease-out forwards;
        }
      `}</style>
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
// import FIELD_CONFIG from "../constants/inputFieldConfig";

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
// }) => {
//   if (!selectedCustomer) {
//     return (
//       <div className="border border-gray-200 rounded-2xl px-6 bg-red-500 text-center">
//         <p className="text-gray-500">
//           No customer selected. Add a customer first.
//         </p>
//       </div>
//     );
//   }

//   const hasPartial = customerOrders.some((o) => o.paymentStatus === "Partial");

//   return (
//     <div className="sticky lg:top-0 z-30 ">
//       {/* Top bar */}
//       <div className="px-5 pt-2 pb-4 flex flex-row lg:flex-row lg:items-center lg:justify-between gap-3 border-b">
//         {/* Left side */}
//         <div className="flex items-center gap-3 ">
//           <button
//             onClick={onBack}
//             className="flex items-center gap-2 text-sm px-3 py-2 bg-gray-900 hover:bg-black text-white rounded-lg cursor-pointer"
//           >
//             <FiArrowLeft /> Back
//           </button>

//           {/* <h2 className="text-lg font-semibold">Orders - {customer?.name}</h2> */}
//         </div>

//         {/* 🔍 Search Input */}
//         <div className="relative w-full sm:w-full lg:w-80">
//           <input
//             type="text"
//             placeholder="Search orders, products..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl  outline-none"
//           />

//           {/* Search Icon */}
//           <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//             <FiSearch className="w-4 h-4" />
//           </span>

//           {/* Clear Button */}
//           {searchTerm && (
//             <button
//               onClick={() => setSearchTerm("")}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
//             >
//               <FiX size={16} />
//             </button>
//           )}
//         </div>
//       </div>
//       {/* all customers details */}
//       <div className="flex-1 min-h-0 px-5 pb-5 space-y-3 bg-black pt-4">
//         <div className="border border-gray-800 rounded-2xl p-3 bg-black shadow-sm mt-1">
//           <div className="flex justify-between gap-3 flex-wrap items-start">
//             <div>
//               <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 break-words text-white">
//                 {selectedCustomer.name}{" "}
//                 <span className="px-3 mx-2 py-1 rounded-full text-xs font-bold bg-gray-900 text-white border border-gray-700">
//                   {customerOrders.length} Order(s)
//                 </span>
//               </h3>

//               <div className="text-gray-300 text-xs sm:text-sm break-words">
//                 {selectedCustomer.mobile} • {selectedCustomer.city} •{" "}
//                 {selectedCustomer.address}
//               </div>

//               <div className="flex gap-2 flex-wrap mt-3">
//                 {hasPartial && (
//                   <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30">
//                     Partial Payment
//                   </span>
//                 )}
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
//               <button
//                 className="px-4 py-2 rounded-xl cursor-pointer bg-white/10 border border-white/20 text-white font-semibold hover:bg-white hover:text-black transition"
//                 onClick={() => {
//                   closeAllPanels();
//                   setEditingCustomer(selectedCustomer);
//                 }}
//               >
//                 Edit Customer
//               </button>

//               <button
//                 className="px-4 py-2 rounded-xl cursor-pointer bg-white text-black font-semibold hover:bg-gray-200 transition"
//                 onClick={() => {
//                   closeAllPanels();
//                   setShowAddOrderForm(true);
//                 }}
//               >
//                 Create New Order
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* all orders */}
//       <div className="lg:flex-1 lg:overflow-y-auto min-h-0 bg-[#fbfbfb] lg:h-[350px] px-3 sm:px-5 pb-5 space-y-3 pt-2">
//         {filteredOrders.map((order) => (
//           <div key={order._id} className="border rounded-2xl p-4 ">
//             <div className="flex flex-col sm:flex-row justify-between gap-3 sm:items-center">
//               <div>
//                 <div className="font-extrabold text-lg sm:text-xl break-all">
//                   {order.orderNo}
//                 </div>
//               </div>
//               <div className="flex flex-wrap gap-2 items-center bg-white">
//                 <span
//                   className={`px-3 py-1 rounded-full text-xs lg:text-[16px]  font-bold border bg-white

//   `}
//                   //                   className={`px-3 py-1 rounded-full text-xs lg:text-[16px]  font-bold border bg-white
//                   //   ${order.orderStatus === "Cancelled" ? "text-red-500  bg-green-700  border-red-300 " : ""}
//                   //   ${order.orderStatus === "Pending" ? "text-yellow-800 bg-green-700    0border-yellow-300" : "bg-white"}
//                   //   ${order.orderStatus === "Completed" ? "text-green-500  rder-green-300" : ""}
//                   //   ${order.orderStatus === "Processing" ? "text-blue-500 bg-red-700 border-blue-300" : ""}
//                   // `}
//                 >
//                   {order.orderStatus}
//                 </span>
//                 <button
//                   className="px-3 py-1 cursor-pointer rounded-lg   text-sm "
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
//                 <small className="text-gray-700  text-md  block">Total</small>
//                 <strong className="text-base sm:text-lg">
//                   ₹
//                   {parseInt(
//                     order.totalAmount || order.total || 0,
//                   ).toLocaleString()}
//                 </strong>
//               </div>
//               <div className="bg-white rounded-xl p-3 border border-gray-200">
//                 <small className="text-gray-700  text-md  block">
//                   Received Amount
//                 </small>
//                 <strong className="text-base sm:text-lg">
//                   ₹{parseInt(order.receivedAmount || 0).toLocaleString()}
//                 </strong>
//               </div>
//               <div className="bg-white rounded-xl p-3 border border-gray-200">
//                 <small className="text-gray-700  text-md  block">
//                   Delivery
//                 </small>
//                 <strong className="text-base sm:text-lg">
//                   {formatDate(order.deliveryDate)}
//                 </strong>
//               </div>
//               <div className="bg-white rounded-xl p-3 border border-gray-200">
//                 <small className="text-gray-700  text-md  block">
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
//                     <div className="flex items-center flex-wrap gap-3 mt-2 sm:mt-0">
//                       {/* Order Status */}
//                       <span
//                         className={`px-2 pt-2 rounded-full text-md font-semibold

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

//                       {/* View Product */}
//                       <div className="relative group ">
//                         <button className="cursor-pointer pt-2">
//                           <FiEye size={20} />
//                         </button>

//                         {/* Hover Card */}
//                         <div
//                           className="
// hidden lg:block
// absolute right-0 top-8 z-50
// w-140 h-60 overflow-y-auto bg-white border border-gray-200
// rounded-2xl shadow-2xl
// opacity-0 invisible
// group-hover:opacity-100
// group-hover:visible
// transition-all duration-300
// p-4
// "
//                         >
//                           {/* Header */}
//                           <div className="border-b pb-2 mb-3">
//                             <h4 className="font-bold text-lg text-gray-800">
//                               {product.category?.charAt(0).toUpperCase() +
//                                 product.category?.slice(1)}
//                             </h4>

//                             <p className="text-sm text-gray-500 tracking-[8px]s">
//                               Code: {product.productCode || "-"}
//                             </p>
//                           </div>

//                           {/* Status */}
//                           <div className="mb-3">
//                             <span
//                               className={`px-3 py-1 rounded-full text-xs font-semibold border
//             ${
//               product?.orderStatus === "Cancelled"
//                 ? "text-red-700 bg-red-50 border-red-200"
//                 : ""
//             }
//             ${
//               product?.orderStatus === "Pending"
//                 ? "text-yellow-700 bg-yellow-50 border-yellow-200"
//                 : ""
//             }
//             ${
//               product?.orderStatus === "Completed"
//                 ? "text-green-700 bg-green-50 border-green-200"
//                 : ""
//             }
//             ${
//               product?.orderStatus === "Processing"
//                 ? "text-blue-700 bg-blue-50 border-blue-200"
//                 : ""
//             }
//           `}
//                             >
//                               {product?.orderStatus}
//                             </span>
//                           </div>

//                           {/* Product Attributes */}
//                           <div className="grid grid-cols-2 gap-3 tracking-wider text-sm">
//                             {Object.entries(product.attributes || {}).map(
//                               ([key, value]) => (
//                                 <div
//                                   key={key}
//                                   className="bg-gray-50 rounded-lg p-2 border border-gray-100"
//                                 >
//                                   <p className="text-gray-500 text-xs">
//                                     {FIELD_CONFIG[key]?.label || key}
//                                   </p>

//                                   <p className="font-semibold text-gray-800 break-words">
//                                     {value || "-"}
//                                   </p>
//                                 </div>
//                               ),
//                             )}
//                           </div>
//                         </div>
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
//                   {/* <div className=" text-sm mt-1 text-gray-800">
//                     {Object.entries(product.attributes || {}).map(
//                       ([key, value], idx) => (
//                         <span key={key}>
//                           <span className="font-medium text-black">
//                             {" "}
//                             {FIELD_CONFIG[key]?.label || key}
//                           </span>
//                           : {value}
//                           {idx <
//                             Object.keys(product.attributes || {}).length - 1 &&
//                             " • "}
//                         </span>
//                       ),
//                     )}
//                   </div> */}
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
//   // const handleUpdateOrder = async (updatedOrder) => {
//   //   if (onUpdateOrder) {
//   //     const originalOrder = orders.find((o) => o._id === updatedOrder._id);

//   //     const finalOrder = {
//   //       ...updatedOrder,
//   //       products: [
//   //         ...(originalOrder?.products || []),
//   //         ...(updatedOrder.products || []),
//   //       ],
//   //     };

//   //     // ✅ instant local UI update
//   //     const updatedOrders = orders.map((o) =>
//   //       o._id === finalOrder._id ? finalOrder : o,
//   //     );

//   //     // optional local state if you add one later

//   //     await onUpdateOrder(finalOrder);
//   //   }

//   //   setEditingOrder(null);
//   // };

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
//     <div className="bg-white h-screen ">
//       <div className="flex flex-col lg:flex-row w-full p-2 sm:p-3 lg:p-4 gap-3 lg:gap-6">
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
//           <div className="h-full  rounded-2xl shadow-sm border border-gray-100 animate-slideInRight  flex flex-col  lg:overflow-y-auto">
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
//                       className="px-5 py-2 bg-gray-300 cursor-pointer text-gray-700 rounded-xl"
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

//       <style>{`
//         @keyframes slideInRight {
//           from {
//             opacity: 0;
//             transform: translateX(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
//         .animate-slideInRight {
//           animation: slideInRight 0.4s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default OrderDetailsPage;
