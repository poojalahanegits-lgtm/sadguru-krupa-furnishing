import axios from "axios";
import { API_URL } from "../../config/api.js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const API = axios.create({
  baseURL: API_URL || "http://localhost:5000/api",
});
// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

//
// ==========================
// API FUNCTIONS
// ==========================
//

// GET ORDERS
export const getOrders = async () => {
  return API.get("/orders");
};

// CREATE ORDER
export const createOrder = async (data) => {
  return API.post("/orders", data);
};

// UPDATE ORDER
export const updateOrder = async (id, data) => {
  return API.put(`/orders/${id}`, data);
};

// DELETE ORDER
export const deleteOrder = async (id) => {
  return API.delete(`/orders/${id}`);
};

//
// ==========================
// PRODUCT APIs
// ==========================
//

// UPDATE PRODUCT
export const updateOrderProduct = async (orderId, productId, data) => {
  return API.put(`/orders/${orderId}/products/${productId}`, data);
};

// DELETE PRODUCT
export const deleteOrderProduct = async (orderId, productId) => {
  return API.delete(`/orders/${orderId}/products/${productId}`);
};

//
// ==========================
// REACT QUERY HOOKS
// ==========================
//

// GET ORDERS
export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await getOrders();
      return response.data.data;
    },
  });
};

// CREATE ORDER
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};

// UPDATE ORDER
export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateOrder(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};

// DELETE ORDER
export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};

//
// ==========================
// UPDATE PRODUCT
// ==========================
//

export const useUpdateOrderProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, productId, data }) =>
      updateOrderProduct(orderId, productId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};

//
// ==========================
// DELETE PRODUCT
// ==========================
//

export const useDeleteOrderProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, productId }) =>
      deleteOrderProduct(orderId, productId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};

// import axios from "axios";

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// //
// // ==========================
// // API FUNCTIONS
// // ==========================
// //

// // GET ORDERS
// export const getOrders = async () => {
//   return API.get("/orders");
// };

// // CREATE ORDER
// export const createOrder = async (data) => {
//   return API.post("/orders", data);
// };

// // UPDATE ORDER
// export const updateOrder = async (id, data) => {
//   return API.put(`/orders/${id}`, data);
// };

// // DELETE ORDER
// export const deleteOrder = async (id) => {
//   return API.delete(`/orders/${id}`);
// };

// //
// // ==========================
// // REACT QUERY HOOKS
// // ==========================
// //

// // GET ORDERS
// export const useOrders = () => {
//   return useQuery({
//     queryKey: ["orders"],
//     queryFn: async () => {
//       const response = await getOrders();
//       return response.data.data;
//     },
//   });
// };

// // CREATE ORDER
// export const useCreateOrder = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: createOrder,

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["orders"],
//       });
//     },
//   });
// };

// // UPDATE ORDER
// export const useUpdateOrder = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ id, data }) => updateOrder(id, data),

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["orders"],
//       });
//     },
//   });
// };

// // DELETE ORDER
// export const useDeleteOrder = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: deleteOrder,

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["orders"],
//       });
//     },
//   });
// };
