// utils/orderUtils.js
import { ORDER_FIELDS } from "../constants/orderInputFields";

export const generateOrderNo = (orders = []) => {
  const year = new Date().getFullYear();

  // Get current year orders only
  const currentYearOrders = orders.filter((order) =>
    order.orderNo?.startsWith(`SKF-${year}`),
  );

  // Extract sequence numbers
  const numbers = currentYearOrders.map((order) => {
    const parts = order.orderNo.split("-");
    return Number(parts[2]) || 0;
  });

  // Find highest sequence
  const lastNumber = numbers.length ? Math.max(...numbers) : 0;

  // Next sequence
  const nextNumber = String(lastNumber + 1).padStart(3, "0");

  return `SKF-${year}-${nextNumber}`;
};
// export const generateOrderNo = () => {
//   const year = new Date().getFullYear();
//   const random = Math.floor(Math.random() * 1000)
//     .toString()
//     .padStart(3, "0");
//   return `SKF-${year}-${random}`;
// };

export const calculateOrderTotal = (products) => {
  return products
    .reduce((sum, p) => sum + (parseInt(p.quantity) || 1) * 5000, 0)
    .toString();
};

// Category mapping
export const categoryKeyMap = {
  curtains: "curtains",
  "sofa-&seating": "sofaSeating",
  mattress: "mattress",
  "bed-linen": "bedLinen",
  "bath-linen": "bathLinen",
  flooring: "flooring",
  wallpapers: "wallpapers",
  rugs: "rugs",
  blinds: "blinds",
  "glass-films": "glassFilms",
  pillows: "pillows",
};

export const getCategoryFields = (categorySlug) => {
  const key = categoryKeyMap[categorySlug];
  return ORDER_FIELDS[key] || [];
};

// Get all possible field names from ORDER_FIELDS
export const getAllFieldNames = () => {
  const allFields = new Set();
  Object.values(ORDER_FIELDS).forEach((fields) => {
    fields.forEach((field) => allFields.add(field));
  });
  return Array.from(allFields);
};

// utils/orderUtils.js
export const emptyProduct = () => {
  return {
    id: null,
    category: "",
    name: "",
    price: 0,
    productCode: "",
    brand: "",
    quantity: 1,
    deliveryDate: "",
    orderStatus: "Pending",
    specialNotes: "",
    attributes: {}, // Store all category-specific fields here
  };
};

// Clean product data - remove fields not needed for current category
// utils/orderUtils.js
// utils/orderUtils.js
export const cleanProductData = (product) => {
  if (!product || !product.category) return product;

  // Get all category-specific fields
  const categoryFields = getCategoryFields(product.category);

  // Create attributes object from category-specific fields
  const attributes = {};

  // Check both product.attributes (if exists) AND top-level fields
  categoryFields.forEach((field) => {
    // First check if field exists in attributes
    if (
      product.attributes &&
      product.attributes[field] !== undefined &&
      product.attributes[field] !== ""
    ) {
      attributes[field] = product.attributes[field];
    }
    // Then check top-level (for backward compatibility)
    else if (product[field] !== undefined && product[field] !== "") {
      attributes[field] = product[field];
    }
  });

  // Return cleaned product with attributes
  return {
    id: product._id,
    category: product.category,
    name: product.name || `${product.category}_${Date.now()}`,
    price: Number(product.price) || 0,
    productCode: product.productCode || "",
    brand: product.brand || "",
    quantity: Number(product.quantity) || 1,
    deliveryDate: product.deliveryDate || "",
    orderStatus: product.orderStatus || "Pending",
    specialNotes: product.specialNotes || "",
    attributes: attributes,
  };
};

// Add this to your orderUtils.js
export const migrateProductToNewFormat = (product) => {
  if (!product) return product;

  // If product already has attributes with data, return as is
  if (product.attributes && Object.keys(product.attributes).length > 0) {
    return product;
  }

  // Otherwise, migrate flat fields to attributes
  const categoryFields = getCategoryFields(product.category);
  const attributes = {};

  categoryFields.forEach((field) => {
    if (product[field] && product[field] !== "") {
      attributes[field] = product[field];
    }
  });

  return {
    ...product,
    attributes: attributes,
  };
};
// // utils/orderUtils.js
// import { ORDER_FIELDS } from "../constants/orderInputFields";

// export const generateOrderNo = () => {
//   const year = new Date().getFullYear();
//   const random = Math.floor(Math.random() * 1000)
//     .toString()
//     .padStart(3, "0");
//   return `SKF-${year}-${random}`;
// };

// export const calculateOrderTotal = (products) => {
//   return products
//     .reduce((sum, p) => sum + (parseInt(p.quantity) || 1) * 5000, 0)
//     .toString();
// };

// // Category mapping
// export const categoryKeyMap = {
//   curtains: "curtains",
//   "sofa-&seating": "sofaSeating",
//   mattress: "mattress",
//   "bed-linen": "bedLinen",
//   "bath-linen": "bathLinen",
//   flooring: "flooring",
//   wallpapers: "wallpapers",
//   rugs: "rugs",
//   blinds: "blinds",
//   "glass-films": "glassFilms",
//   pillows: "pillows",
// };

// export const getCategoryFields = (categorySlug) => {
//   const key = categoryKeyMap[categorySlug];
//   return ORDER_FIELDS[key] || [];
// };

// // Get all possible field names from ORDER_FIELDS
// export const getAllFieldNames = () => {
//   const allFields = new Set();
//   Object.values(ORDER_FIELDS).forEach((fields) => {
//     fields.forEach((field) => allFields.add(field));
//   });
//   return Array.from(allFields);
// };

// export const emptyProduct = () => {
//   const baseProduct = {
//     id: null,
//     category: "",
//     productcode: "",
//     brand: "",
//     productId: "",
//     quantity: 1,
//     deliveryDate: "",
//     orderStatus: "Pending",
//     specialNotes: "",
//   };

//   // Add all dynamic fields with empty values
//   getAllFieldNames().forEach((field) => {
//     if (!baseProduct[field]) {
//       baseProduct[field] = "";
//     }
//   });

//   return baseProduct;
// };

// // Clean product data - remove fields not needed for current category
// export const cleanProductData = (product) => {
//   if (!product || !product.category) return product;

//   const allowedFields = [
//     ...getAllFieldNames(),
//     "id",
//     "category",
//     "productcode",
//     "brand",
//     "productId",
//     "quantity",
//     "deliveryDate",
//     "orderStatus",
//     "specialNotes",
//   ];

//   const cleanedProduct = {};
//   allowedFields.forEach((field) => {
//     if (product[field] !== undefined) {
//       cleanedProduct[field] = product[field];
//     }
//   });

//   return cleanedProduct;
// };
