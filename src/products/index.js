import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

/* ================= AXIOS ================= */

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:4000/api",
});

/* ================= FETCH PRODUCTS ================= */

const fetchProducts = async () => {
  const res = await apiClient.get("/products");
  return res.data.data;
};

export const useProductLists = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

/* ================= CREATE PRODUCT ================= */

const createProduct = async (data) => {
  const res = await apiClient.post("/products/create", data);
  return res.data;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

/* ================= UPDATE PRODUCT ================= */

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => apiClient.put(`/products/${id}`, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

/* ================= DELETE PRODUCT ================= */

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => apiClient.delete(`/products/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
