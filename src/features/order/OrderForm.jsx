// ======================================================
// ADD / EDIT ORDER COMPONENT
// Handles:
// - Order creation
// - Order editing
// - Product management
// - Order totals
// - Unsaved changes protection
// ======================================================

import React, { useState, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  SelectStyles,
  InputStyles,
  TextareaStyles,
} from "../../constants/Config";
import ConfirmModal from "./common/ConfirmModal";
import ProductForm from "./ProductForm";
import {
  calculateOrderTotal,
  emptyProduct,
  migrateProductToNewFormat,
  cleanProductData,
} from "./orderUtils";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import FormField from "./common/FormField";

const AddOrder = ({
  order,
  customers = [],
  selectedCustomerId,
  onSave,
  onUpdateOrder,
  onCancel,
  isModal = false,
  title = "Add New Order",
}) => {
  // ======================================================
  // FORM INITIALIZATION
  // React Hook Form manages:
  // - form state
  // - validation
  // - controlled inputs
  // ======================================================
  const { register, handleSubmit, setValue, getValues, control } = useForm({
    // If editing existing order → preload values
    // Else → initialize new order defaults
    defaultValues: order || {
      orderNo: "",
      orderDate: new Date().toISOString().slice(0, 10),
      deliveryDate: new Date(Date.now() + 7 * 86400000)
        .toISOString()
        .slice(0, 10),
      customerId:
        selectedCustomerId || order?.customer?._id || order?.customer || "",
      customerName: selectedCustomerId
        ? customers.find((c) => c._id === selectedCustomerId)?.name || ""
        : customers[0]?.name || "",
      paymentStatus: "Pending",
      orderStatus: "Pending",
      advancePayment: "0",
      discount: "0",
      staffAssigned: "",
    },
  });
  const [showCancelModal, setShowCancelModal] = useState(false);
  // ======================================================
  // PRODUCTS STATE
  // Converts old product structure into new format
  // while preserving compatibility with existing orders
  // ======================================================
  const [products, setProducts] = useState(() => {
    if (order?.products) {
      return order.products.map((product) => {
        const migrated = migrateProductToNewFormat({
          ...emptyProduct(),
          ...product,
          _id: product._id || Date.now(),
        });
        return migrated;
      });
    }
    return [];
  });
  // Holds currently edited product before adding to order
  const [currentProduct, setCurrentProduct] = useState(() => {
    // Initialize with empty product but preserve if editing?
    const emptyProd = emptyProduct();
    return emptyProd;
  });
  const initialDataRef = useRef(null);
  // Updates live product form data from ProductForm component
  const updateCurrentProduct = (updatedProduct) => {
    console.log("Updating current product:", updatedProduct);
    setCurrentProduct(updatedProduct);
  };
  // ======================================================
  // ADD PRODUCT TO ORDER
  // Validates product
  // Cleans unnecessary fields
  // Updates local products state
  // Recalculates order total
  // ======================================================
  const handleAddProduct = () => {
    // Product category is mandatory before adding
    if (!currentProduct.category) {
      toast.warning("Please select a product category");
      return;
    }
    // Lining type required only when lining is enabled
    if (currentProduct.lining === "Yes" && !currentProduct.liningType) {
      toast.warning("Please select Lining Type");
      return;
    }

    const productToAdd = cleanProductData(currentProduct);

    const newProduct = {
      ...productToAdd,
      id: Date.now(),
    };

    setProducts((prev) => {
      const updatedProducts = [...prev, newProduct];

      if (onUpdateOrder) {
        const formData = getValues();
        const total = calculateOrderTotal(updatedProducts);

        const updatedOrder = {
          ...formData,
          id: order?._id || "temp-" + Date.now(),
          products: updatedProducts,
          total,
        };

        onUpdateOrder(updatedOrder);
      }

      return updatedProducts;
    });

    setCurrentProduct(emptyProduct());
    //  toast.dismiss();
    //toast.success("Product added");
  };
  // Store initial form + products snapshot
  // Used for unsaved changes detection
  useEffect(() => {
    initialDataRef.current = JSON.stringify({
      form: getValues(),
      products,
    });
  }, []);
  // Sync products when editing existing order
  useEffect(() => {
    if (order?.products) {
      setProducts(order.products);
    }
  }, [order]);
  // Compare current form state with initial snapshot
  // Prevent accidental order cancellation
  const hasUnsavedChanges = () => {
    const currentData = JSON.stringify({
      form: getValues(),
      products,
    });

    return currentData !== initialDataRef.current;
  };
  // Remove product from order
  // Recalculate totals after deletion
  const removeProduct = (id) => {
    const updatedProducts = products.filter((p) => p._id !== id);
    setProducts(updatedProducts);

    if (onUpdateOrder) {
      const formData = getValues();
      const total = calculateOrderTotal(updatedProducts);

      onUpdateOrder({
        ...formData,
        id: order?._id,
        products: updatedProducts,
        total,
      });
    }

    toast.info("Product removed");
  };
  // ======================================================
  // FINAL ORDER SUBMISSION
  // - Validates order
  // - Formats products for backend
  // - Calculates totals
  // - Creates payload
  // - Saves order to database
  // ======================================================
  const onSubmit = async (data) => {
    // Customer selection is mandatory
    if (!data.customerId && !data.customer) {
      // console.log(data);
      toast.error("Please select customer");
      return;
    }

    // New orders must contain at least one product
    if (!order?._id && products.length === 0) {
      toast.error("Add at least 1 product");
      return;
    }

    try {
      const total = calculateOrderTotal(products);
      // console.log("FORM DATA:", data);

      //  console.log("SELECTED CUSTOMER ID:", data.customerId);

      //console.log("CUSTOMERS:", customers);

      const selectedCustomer = customers.find(
        (c) => c._id === data.customerId || c.id === data.customerId,
      );

      console.log("SELECTED CUSTOMER:", selectedCustomer);

      // Transform frontend product structure
      // into backend-compatible schema
      const formattedProducts = products.map((p) => {
        // Calculate product total if not already calculated
        const productTotal = (p.price || 0) * (p.quantity || 1);

        return {
          category: p.category,
          name: p.name || p.category,
          productCode: p.productCode || "",
          brand: p.brand,
          quantity: Number(p.quantity || 1),
          unit: p.unit || "pcs",
          price: Number(p.price || 0),
          total: productTotal,
          orderStatus: p.orderStatus || "Pending",
          deliveryDate: p.deliveryDate || data.deliveryDate,
          specialNotes: p.notes || p.specialNotes,
          attributes: p.attributes || {}, // Store all dynamic fields in attributes
        };
      });
      // Final payload sent to backend API
      const finalOrder = {
        _id: order?._id,
        orderNo: order?.orderNo || "",
        // orderNo: data.orderNo,

        customer: selectedCustomer?._id,

        orderDate: data.orderDate,

        deliveryDate: data.deliveryDate,

        paymentStatus: data.paymentStatus || "Pending",

        orderStatus: data.orderStatus || "Pending",

        // ✅ NEW
        staffAssigned: data.staffAssigned || "",

        // ✅ NEW
        receivedAmount: Number(data.receivedAmount || 0),

        // ✅ NEW
        dueAmount: Number(data.dueAmount || 0),

        // OLD
        advancePayment: Number(data.advancePayment || 0),

        discount: Number(data.discount || 0),

        totalAmount: Number(data.totalAmount || total),

        notes: data.notes || "",

        products: formattedProducts,
      };

      //console.log("FINAL ORDER:", finalOrder);

      if (order?._id) {
        await onSave(finalOrder);

        toast.dismiss();
        toast.success("Order updated successfully");
      } else {
        await onSave(finalOrder);

        toast.dismiss();
        toast.success("Order created successfully");
      }
    } catch (error) {
      // console.log(error);
      // console.log("Error response:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to save order");
    }
  };
  // ======================================================
  // MAIN ORDER FORM UI
  // ======================================================
  const content = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      // Prevent accidental form submit on Enter key
      // except inside textarea fields
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
          e.preventDefault();
        }
      }}
    >
      <div className="mb-0 bg-white ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Order Number */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium  ">Order Id</label>
            <input
              {...register("orderNo")}
              value={order?.orderNo || ""}
              disabled
              className={`h-10  px-3 rounded-lg mt-1 border-black  ${
                order ? "bg-gray-100 cursor-not-allowed" : ""
              } border-black focus:ring-2 focus:ring-gray-500 focus:border-gray-500 border   transition`}
              placeholder="Auto Generated"
            />
          </div>

          {/* Order Date */}
          <div className="flex flex-col gap-1">
            <FormField
              name="orderDate"
              control={control}
              label="Order Date"
              type="date"
            />
          </div>

          {/* Delivery Date */}
          <div className="flex flex-col gap-1">
            <FormField
              name="deliveryDate"
              control={control}
              label="Delivery Date"
              type="date"
            />
          </div>
          <div className="flex flex-col gap-1">
            <FormField
              name="staffAssigned"
              control={control}
              label="Manager"
              placeholder="Enter Manager name"
            />
          </div>
          {/* 💰 Total Amount */}
          <div className="flex flex-col gap-1">
            <FormField
              name="totalAmount"
              control={control}
              label="Total Amount"
              type="number"
              placeholder="Enter total amount"
              onChange={(e) => {
                const total = Number(e.target.value || 0);
                const received = Number(getValues("receivedAmount") || 0);
                setValue("dueAmount", total - received);
              }}
            />
          </div>

          {/* 💵 Received Amount */}
          <div className="flex flex-col gap-1">
            <FormField
              name="receivedAmount"
              control={control}
              label="Received Amount"
              type="number"
              placeholder="Enter received amount"
              onChange={(e) => {
                const received = Number(e.target.value || 0);
                const total = Number(getValues("totalAmount") || 0);
                setValue("dueAmount", total - received);
              }}
            />
          </div>

          {/* 🧾 Due Amount (Auto) */}
          <div className="flex flex-col gap-1">
            <FormField
              name="dueAmount"
              control={control}
              label="Due Amount"
              type="number"
              placeholder="Auto calculated"
              readOnly
            />
          </div>
          {/* Payment Status */}

          {/* Order Status */}
          <div className="flex flex-col gap-1">
            <FormField
              name="orderStatus"
              control={control}
              label="Order Status"
              type="select"
              options={[
                "Open",
                "Pending",
                "Processing",
                "Completed",
                "Cancelled",
              ]}
            />
          </div>
          {/* Staff Assigned */}
        </div>
      </div>
      {/* ======================================================
    PRODUCTS MANAGEMENT SECTION
    - Add products
    - View added products
    - Remove products
====================================================== */}
      <div className=" lg:pb-12 ">
        <div className=" rounded-xl">
          <ProductForm
            product={currentProduct}
            index={0}
            onUpdate={updateCurrentProduct}
            // onUpdate={updateCurrentProduct}
            hideRemove
          />

          <div className=" flex   justify-between">
            <div>
              <button
                type="button"
                onClick={handleAddProduct}
                className="mt-3 px-4 py-2 cursor-pointer bg-gray-800 text-white rounded-xl"
              >
                + Add Product
              </button>
            </div>
            {/* ACTIONS */}
            <div className="flex justify-end gap-3   py-4">
              <button
                type="button"
                onClick={() => {
                  // Show confirmation modal if unsaved changes exist
                  if (hasUnsavedChanges()) {
                    setShowCancelModal(true);
                  } else {
                    onCancel();
                  }
                }}
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
                type="submit"
                className="px-5 py-2 cursor-pointer bg-black text-white rounded-xl"
              >
                {order ? "Update Order" : "Create Order"}
              </button>
            </div>
          </div>
        </div>
        {/* Render all added products */}
        {products?.length > 0 && (
          <div className="space-y-2">
            {products.map((p, idx) => (
              <div
                key={p._id || p.id || idx}
                className="flex justify-between items-center mt-2 border p-3 rounded-xl"
              >
                <div className="flex-1">
                  <div>
                    {idx + 1} - {p.category}
                  </div>
                  <div className="text-sm text-gray-500">
                    {p.productCode && `Code: ${p.productCode} | `}
                    {p.brand && `Brand: ${p.brand} | `}
                    {p.quantity && `Qty: ${p.quantity}`}
                  </div>
                  {/* Show category-specific fields */}
                  {p.curtainType && (
                    <div className="text-xs">Type: {p.curtainType}</div>
                  )}
                  {p.width && p.height && (
                    <div className="text-xs">
                      Size: {p.width}x{p.height}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => removeProduct(p._id)}
                    className="px-3 py-1 text-sm  text-white rounded"
                  >
                    <i className="fas fa-trash-alt text-red-600 hover:text-red-800 cursor-pointer"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={showCancelModal}
        title="Cancel Order"
        message="Are you sure you want to cancel this order? Unsaved changes will be lost."
        onCancel={() => setShowCancelModal(false)}
        onConfirm={() => {
          setShowCancelModal(false);
          onCancel();
        }}
      />
    </form>
  );
  // Render inside modal or standalone page
  // based on isModal prop
  return isModal ? (
    <div className="bg-white mt-20 rounded-2xl border p-6 max-w-4xl mx-auto">
      <div className="flex justify-between mb-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        <button
          onClick={() => {
            if (hasUnsavedChanges()) {
              setShowCancelModal(true);
            } else {
              onCancel();
            }
          }}
        >
          <FiX size={22} />
        </button>
      </div>
      {content}
    </div>
  ) : (
    <div className="bg-white rounded-2xl px-6">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      {content}
    </div>
  );
};

export default AddOrder;

// import React, { useState, useEffect, useRef } from "react";
// import { Controller, useForm } from "react-hook-form";

// import {
//   SelectStyles,
//   InputStyles,
//   TextareaStyles,
// } from "../../constants/Config";
// import ConfirmModal from "./common/ConfirmModal";
// import ProductForm from "./ProductForm";
// import {
//   generateOrderNo,
//   calculateOrderTotal,
//   emptyProduct,
//   migrateProductToNewFormat,
//   cleanProductData,
// } from "./orderUtils";
// import { FiX } from "react-icons/fi";
// import { toast } from "react-toastify";
// import FormField from "./common/FormField";

// const AddOrder = ({
//   order,
//   customers = [],
//   selectedCustomerId,
//   onSave,
//   onUpdateOrder,
//   onCancel,
//   isModal = false,
//   title = "Add New Order",
// }) => {
//   const { register, handleSubmit, setValue, getValues, control } = useForm({
//     defaultValues: order || {
//       orderNo: "",
//       orderDate: new Date().toISOString().slice(0, 10),
//       deliveryDate: new Date(Date.now() + 7 * 86400000)
//         .toISOString()
//         .slice(0, 10),
//       customerId:
//         selectedCustomerId || order?.customer?._id || order?.customer || "",
//       customerName: selectedCustomerId
//         ? customers.find((c) => c._id === selectedCustomerId)?.name || ""
//         : customers[0]?.name || "",
//       paymentStatus: "Pending",
//       orderStatus: "Pending",
//       advancePayment: "0",
//       discount: "0",
//       staffAssigned: "",
//     },
//   });
//   const [showCancelModal, setShowCancelModal] = useState(false);
//   // In AddOrder.jsx, when initializing products
//   const [products, setProducts] = useState(() => {
//     if (order?.products) {
//       return order.products.map((product) => {
//         const migrated = migrateProductToNewFormat({
//           ...emptyProduct(),
//           ...product,
//           _id: product._id || Date.now(),
//         });
//         return migrated;
//       });
//     }
//     return [];
//   });

//   const [currentProduct, setCurrentProduct] = useState(() => {
//     // Initialize with empty product but preserve if editing?
//     const emptyProd = emptyProduct();
//     return emptyProd;
//   });
//   const initialDataRef = useRef(null);
//   const updateCurrentProduct = (updatedProduct) => {
//     console.log("Updating current product:", updatedProduct);
//     setCurrentProduct(updatedProduct);
//   };

//   // For editing existing order, populate products correctly
//   // const handleAddProduct = async () => {
//   //   if (!currentProduct.category) {
//   //     toast.warning("Please select a product category");
//   //     return;
//   //   }

//   //   if (currentProduct.lining === "Yes" && !currentProduct.liningType) {
//   //     toast.warning("Please select Lining Type");
//   //     return;
//   //   }

//   //   const productToAdd = cleanProductData(currentProduct);

//   //   const newProduct = {
//   //     ...productToAdd,
//   //     _id: Date.now().toString(),
//   //   };

//   //   const updatedProducts = [...products, newProduct];

//   //   // update UI instantly
//   //   setProducts(updatedProducts);

//   //   try {
//   //     // ✅ IF EDITING EXISTING ORDER -> SAVE IMMEDIATELY
//   //     if (order?._id) {
//   //       const formData = getValues();

//   //       const total = calculateOrderTotal(updatedProducts);

//   //       const formattedProducts = updatedProducts.map((p) => ({
//   //         category: p.category,
//   //         name: p.name || p.category,
//   //         productCode: p.productCode || "",
//   //         brand: p.brand,
//   //         quantity: Number(p.quantity || 1),
//   //         unit: p.unit || "pcs",
//   //         price: Number(p.price || 0),
//   //         total: (p.price || 0) * (p.quantity || 1),
//   //         orderStatus: p.orderStatus || "Pending",
//   //         deliveryDate: p.deliveryDate || formData.deliveryDate,
//   //         specialNotes: p.notes || p.specialNotes,
//   //         attributes: p.attributes || {},
//   //       }));

//   //       const updatedOrder = {
//   //         ...order,
//   //         ...formData,
//   //         products: formattedProducts,
//   //         totalAmount: total,
//   //       };

//   //       // 🔥 instant DB update
//   //       await onSave(updatedOrder);

//   //       toast.success("Product added to order");
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //     toast.error("Failed to add product");
//   //   }

//   //   setCurrentProduct(emptyProduct());
//   // };
//   const handleAddProduct = () => {
//     if (!currentProduct.category) {
//       toast.warning("Please select a product category");
//       return;
//     }
//     if (currentProduct.lining === "Yes" && !currentProduct.liningType) {
//       toast.warning("Please select Lining Type");
//       return;
//     }

//     const productToAdd = cleanProductData(currentProduct);

//     const newProduct = {
//       ...productToAdd,
//       id: Date.now(),
//     };

//     setProducts((prev) => {
//       const updatedProducts = [...prev, newProduct];

//       if (onUpdateOrder) {
//         const formData = getValues();
//         const total = calculateOrderTotal(updatedProducts);

//         const updatedOrder = {
//           ...formData,
//           id: order?._id || "temp-" + Date.now(),
//           products: updatedProducts,
//           total,
//         };

//         onUpdateOrder(updatedOrder);
//       }

//       return updatedProducts;
//     });

//     setCurrentProduct(emptyProduct());
//     //  toast.dismiss();
//     //toast.success("Product added");
//   };
//   useEffect(() => {
//     initialDataRef.current = JSON.stringify({
//       form: getValues(),
//       products,
//     });
//   }, []);

//   useEffect(() => {
//     if (order?.products) {
//       setProducts(order.products);
//     }
//   }, [order]);
//   const hasUnsavedChanges = () => {
//     const currentData = JSON.stringify({
//       form: getValues(),
//       products,
//     });

//     return currentData !== initialDataRef.current;
//   };
//   const removeProduct = (id) => {
//     const updatedProducts = products.filter((p) => p._id !== id);
//     setProducts(updatedProducts);

//     if (onUpdateOrder) {
//       const formData = getValues();
//       const total = calculateOrderTotal(updatedProducts);

//       onUpdateOrder({
//         ...formData,
//         id: order?._id,
//         products: updatedProducts,
//         total,
//       });
//     }

//     toast.info("Product removed");
//   };
//   // const removeProduct = (id) => {
//   //   setProducts(products.filter((p) => p._id !== id));
//   //   toast.info("Product removed");
//   // };

//   // const handleCustomerChange = (customerId) => {
//   //   const customer = customers.find((c) => c._id === customerId);

//   //   setValue("customerId", customerId);
//   //   setValue("customerName", customer?.name || "");
//   // };
//   const onSubmit = async (data) => {
//     if (!data.customerId && !data.customer) {
//       console.log(data);
//       toast.error("Please select customer");
//       return;
//     }

//     // Only validate products for new orders, not for editing
//     if (!order?._id && products.length === 0) {
//       toast.error("Add at least 1 product");
//       return;
//     }

//     try {
//       const total = calculateOrderTotal(products);
//       console.log("FORM DATA:", data);

//       console.log("SELECTED CUSTOMER ID:", data.customerId);

//       console.log("CUSTOMERS:", customers);

//       const selectedCustomer = customers.find(
//         (c) => c._id === data.customerId || c.id === data.customerId,
//       );

//       console.log("SELECTED CUSTOMER:", selectedCustomer);

//       // Format products to match backend schema
//       const formattedProducts = products.map((p) => {
//         // Calculate product total if not already calculated
//         const productTotal = (p.price || 0) * (p.quantity || 1);

//         return {
//           category: p.category,
//           name: p.name || p.category,
//           productCode: p.productCode || "",
//           brand: p.brand,
//           quantity: Number(p.quantity || 1),
//           unit: p.unit || "pcs",
//           price: Number(p.price || 0),
//           total: productTotal,
//           orderStatus: p.orderStatus || "Pending",
//           deliveryDate: p.deliveryDate || data.deliveryDate,
//           specialNotes: p.notes || p.specialNotes,
//           attributes: p.attributes || {}, // Store all dynamic fields in attributes
//         };
//       });

//       const finalOrder = {
//         _id: order?._id,
//         orderNo: order?.orderNo || "",
//         // orderNo: data.orderNo,

//         customer: selectedCustomer?._id,

//         orderDate: data.orderDate,

//         deliveryDate: data.deliveryDate,

//         paymentStatus: data.paymentStatus || "Pending",

//         orderStatus: data.orderStatus || "Pending",

//         // ✅ NEW
//         staffAssigned: data.staffAssigned || "",

//         // ✅ NEW
//         receivedAmount: Number(data.receivedAmount || 0),

//         // ✅ NEW
//         dueAmount: Number(data.dueAmount || 0),

//         // OLD
//         advancePayment: Number(data.advancePayment || 0),

//         discount: Number(data.discount || 0),

//         totalAmount: Number(data.totalAmount || total),

//         notes: data.notes || "",

//         products: formattedProducts,
//       };

//       console.log("FINAL ORDER:", finalOrder);

//       if (order?._id) {
//         await onSave(finalOrder);

//         toast.dismiss();
//         toast.success("Order updated successfully");
//       } else {
//         await onSave(finalOrder);

//         toast.dismiss();
//         toast.success("Order created successfully");
//       }
//     } catch (error) {
//       console.log(error);
//       console.log("Error response:", error.response?.data);
//       toast.error(error.response?.data?.message || "Failed to save order");
//     }
//   };

//   const content = (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       onKeyDown={(e) => {
//         if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
//           e.preventDefault();
//         }
//       }}
//     >
//       <div className="mb-0 bg-white ">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
//           {/* Order Number */}
//           <div className="flex flex-col gap-1">
//             <label className="text-sm font-medium  ">Order Id</label>
//             <input
//               {...register("orderNo")}
//               value={order?.orderNo || ""}
//               disabled
//               className={`h-10  px-3 rounded-lg mt-1 border-black  ${
//                 order ? "bg-gray-100 cursor-not-allowed" : ""
//               } border-black focus:ring-2 focus:ring-gray-500 focus:border-gray-500 border   transition`}
//               placeholder="Auto Generated"
//             />
//           </div>

//           {/* Order Date */}
//           <div className="flex flex-col gap-1">
//             <FormField
//               name="orderDate"
//               control={control}
//               label="Order Date"
//               type="date"
//             />
//           </div>

//           {/* Delivery Date */}
//           <div className="flex flex-col gap-1">
//             <FormField
//               name="deliveryDate"
//               control={control}
//               label="Delivery Date"
//               type="date"
//             />
//           </div>
//           <div className="flex flex-col gap-1">
//             <FormField
//               name="staffAssigned"
//               control={control}
//               label="Manager"
//               placeholder="Enter Manager name"
//             />
//           </div>
//           {/* 💰 Total Amount */}
//           <div className="flex flex-col gap-1">
//             <FormField
//               name="totalAmount"
//               control={control}
//               label="Total Amount"
//               type="number"
//               placeholder="Enter total amount"
//               onChange={(e) => {
//                 const total = Number(e.target.value || 0);
//                 const received = Number(getValues("receivedAmount") || 0);
//                 setValue("dueAmount", total - received);
//               }}
//             />
//           </div>

//           {/* 💵 Received Amount */}
//           <div className="flex flex-col gap-1">
//             <FormField
//               name="receivedAmount"
//               control={control}
//               label="Received Amount"
//               type="number"
//               placeholder="Enter received amount"
//               onChange={(e) => {
//                 const received = Number(e.target.value || 0);
//                 const total = Number(getValues("totalAmount") || 0);
//                 setValue("dueAmount", total - received);
//               }}
//             />
//           </div>

//           {/* 🧾 Due Amount (Auto) */}
//           <div className="flex flex-col gap-1">
//             <FormField
//               name="dueAmount"
//               control={control}
//               label="Due Amount"
//               type="number"
//               placeholder="Auto calculated"
//               readOnly
//             />
//           </div>
//           {/* Payment Status */}

//           {/* Order Status */}
//           <div className="flex flex-col gap-1">
//             <FormField
//               name="orderStatus"
//               control={control}
//               label="Order Status"
//               type="select"
//               options={[
//                 "Open",
//                 "Pending",
//                 "Processing",
//                 "Completed",
//                 "Cancelled",
//               ]}
//             />
//           </div>
//           {/* Staff Assigned */}
//         </div>
//       </div>
//       {/* PRODUCTS */}
//       <div className=" lg:pb-12 ">
//         <div className=" rounded-xl">
//           <ProductForm
//             product={currentProduct}
//             index={0}
//             onUpdate={updateCurrentProduct}
//             // onUpdate={updateCurrentProduct}
//             hideRemove
//           />

//           <div className=" flex   justify-between">
//             <div>
//               <button
//                 type="button"
//                 onClick={handleAddProduct}
//                 className="mt-3 px-4 py-2 cursor-pointer bg-gray-800 text-white rounded-xl"
//               >
//                 + Add Product
//               </button>
//             </div>
//             {/* ACTIONS */}
//             <div className="flex justify-end gap-3   py-4">
//               <button
//                 type="button"
//                 onClick={() => {
//                   if (hasUnsavedChanges()) {
//                     setShowCancelModal(true);
//                   } else {
//                     onCancel();
//                   }
//                 }}
//                 className="
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
//               >
//                 Cancel
//               </button>

//               <button
//                 type="submit"
//                 className="px-5 py-2 cursor-pointer bg-black text-white rounded-xl"
//               >
//                 {order ? "Update Order" : "Create Order"}
//               </button>
//             </div>
//           </div>
//         </div>

//         {products?.length > 0 && (
//           <div className="space-y-2">
//             {products.map((p, idx) => (
//               <div
//                 key={p._id || p.id || idx}
//                 className="flex justify-between items-center mt-2 border p-3 rounded-xl"
//               >
//                 <div className="flex-1">
//                   <div>
//                     {idx + 1} - {p.category}
//                   </div>
//                   <div className="text-sm text-gray-500">
//                     {p.productCode && `Code: ${p.productCode} | `}
//                     {p.brand && `Brand: ${p.brand} | `}
//                     {p.quantity && `Qty: ${p.quantity}`}
//                   </div>
//                   {/* Show category-specific fields */}
//                   {p.curtainType && (
//                     <div className="text-xs">Type: {p.curtainType}</div>
//                   )}
//                   {p.width && p.height && (
//                     <div className="text-xs">
//                       Size: {p.width}x{p.height}
//                     </div>
//                   )}
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     type="button"
//                     onClick={() => removeProduct(p._id)}
//                     className="px-3 py-1 text-sm  text-white rounded"
//                   >
//                     <i className="fas fa-trash-alt text-red-600 hover:text-red-800 cursor-pointer"></i>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <ConfirmModal
//         isOpen={showCancelModal}
//         title="Cancel Order"
//         message="Are you sure you want to cancel this order? Unsaved changes will be lost."
//         onCancel={() => setShowCancelModal(false)}
//         onConfirm={() => {
//           setShowCancelModal(false);
//           onCancel();
//         }}
//       />
//     </form>
//   );

//   return isModal ? (
//     <div className="bg-white mt-20 rounded-2xl border p-6 max-w-4xl mx-auto">
//       <div className="flex justify-between mb-4">
//         <h3 className="text-2xl font-bold">{title}</h3>
//         <button
//           onClick={() => {
//             if (hasUnsavedChanges()) {
//               setShowCancelModal(true);
//             } else {
//               onCancel();
//             }
//           }}
//         >
//           <FiX size={22} />
//         </button>
//       </div>
//       {content}
//     </div>
//   ) : (
//     <div className="bg-white rounded-2xl px-6">
//       <h3 className="text-2xl font-bold mb-4">{title}</h3>
//       {content}
//     </div>
//   );
// };

// export default AddOrder;
