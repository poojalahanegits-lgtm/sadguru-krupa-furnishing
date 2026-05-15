import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../../config/api.js";
/* ================= AXIOS CLIENT ================= */

// const apiClient = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

const apiClient = axios.create({
  baseURL: API_URL || "http://localhost:5000/api",
});
/* ================= FETCH CUSTOMERS ================= */

const fetchCustomers = async () => {
  const response = await apiClient.get("/customers");

  // return only data
  return response.data;
};

export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
    cacheTime: 1000 * 60 * 30,
  });
};

/* ================= CREATE CUSTOMER ================= */

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customerData) => apiClient.post("/customers", customerData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
  });
};

/* ================= UPDATE CUSTOMER ================= */

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => apiClient.put(`/customers/${id}`, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
  });
};

/* ================= DELETE CUSTOMER ================= */

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => apiClient.delete(`/customers/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
  });
};
/* ================= CHECK MOBILE ================= */
// check customer is exist with mobile number
const checkCustomerMobile = async (mobile) => {
  const response = await apiClient.get(`/customers/check-mobile/${mobile}`);

  return response.data;
};

export const useCheckCustomerMobile = () => {
  return useMutation({
    mutationFn: (mobile) => checkCustomerMobile(mobile),
  });
};
// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// // CREATE CUSTOMER
// export const createCustomer = async (data) => {
//   return API.post("/customers", data);
// };

// // UPDATE CUSTOMER
// export const updateCustomer = async (id, data) => {
//   return API.put(`/customers/${id}`, data);
// };

// // GET ALL CUSTOMERS
// export const getCustomers = async () => {
//   return API.get("/customers");
// };

// // DELETE CUSTOMER
// export const deleteCustomer = async (id) => {
//   return API.delete(`/customers/${id}`);
// };
