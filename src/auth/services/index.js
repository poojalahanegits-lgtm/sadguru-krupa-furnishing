import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../../../src/queryClient.js";
/* =========================================================
   AXIOS CLIENT
========================================================= */

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:4000/api",
  withCredentials: true, // IMPORTANT for refresh token cookies
});
/* =========================================================
   AUTO TOKEN REFRESH
========================================================= */
apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Agar refresh-token API khud fail ho jaye toh loop mat banao
    const isRefreshRequest = originalRequest.url?.includes(
      "/auth/refresh-token",
    );

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshRequest
    ) {
      originalRequest._retry = true;

      try {
        await apiClient.post("/auth/refresh-token");

        return apiClient(originalRequest);
      } catch (refreshError) {
        queryClient.clear();

        // window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
/* =========================================================
   REGISTER API
========================================================= */

const register = async (data) => {
  const response = await apiClient.post("/auth/register", data);

  return response.data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};

/* =========================================================
   LOGIN API
========================================================= */

const login = async (data) => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};

/* =========================================================
   LOGOUT API
========================================================= */

const logout = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};
/* =========================================================
   REFRESH TOKEN API
========================================================= */

const refreshToken = async () => {
  const response = await apiClient.post("/auth/refresh-token");

  return response.data;
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: refreshToken,
  });
};

/* =========================================================
   CHANGE PASSWORD
========================================================= */

const changePassword = async (data) => {
  const response = await apiClient.post("/auth/change-password", data);

  return response.data;
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};

/* =========================================================
   SEND OTP
========================================================= */

const getOtp = async (data) => {
  const response = await apiClient.post("/auth/send-otp", data);

  return response.data;
};

export const useGetOtp = () => {
  return useMutation({
    mutationFn: getOtp,
  });
};

/* =========================================================
   VERIFY OTP
========================================================= */

const verifyOtp = async (data) => {
  const response = await apiClient.post("/auth/verify-otp", data);

  return response.data;
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: verifyOtp,
  });
};

/* =========================================================
   GET CURRENT USER
========================================================= */

const getCurrentUser = async () => {
  const response = await apiClient.get("/auth/me");

  return response.data;
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"], // ✅ FIXED (was "current-user")
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

/* =========================================================
   EXPORT API CLIENT
========================================================= */

export default apiClient;

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// // http://localhost:4000/api/sub-services/filter?mainServiceId=gpms-service-1&categoryId=gpms-category-1
// /* ================= AXIOS CLIENT ================= */
// const apiClient = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:4000/api",
// });

// const login = async (data) => {
//   const response = await apiClient.post("/login", data);
//   return response.data;
// };

// export const useLogin = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: login,
//     onSuccess: () => {
//       // 🔄 Refetch ticket sheet after update
//       queryClient.invalidateQueries(["login"]);
//     },
//   });
// };

// const changePassword = async (data) => {
//   const response = await apiClient.post("/change-password", data);
//   return response.data;
// };

// export const useChangePassword = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: changePassword,
//     onSuccess: () => {
//       // 🔄 Refetch ticket sheet after update
//       queryClient.invalidateQueries(["change-password"]);
//     },
//   });
// };

// const getOtp = async (data) => {
//   const response = await apiClient.post("/send-otp", data);
//   return response.data;
// };

// export const useGetOtp = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: getOtp,
//     onSuccess: () => {
//       // 🔄 Refetch ticket sheet after update
//       queryClient.invalidateQueries(["getOtp"]);
//     },
//   });
// };

// const verifyOtp = async (data) => {
//   const response = await apiClient.post("/verify-otp", data);
//   return response.data;
// };

// export const useVerifyOtp = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: verifyOtp,
//     onSuccess: () => {
//       // 🔄 Refetch ticket sheet after update
//       queryClient.invalidateQueries(["verifyOtp"]);
//     },
//   });
// };
