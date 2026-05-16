/**
 * =========================================================
 * AUTH SERVICE & API HOOKS
 * =========================================================
 *
 * Purpose:
 * Centralized authentication layer using:
 * - Axios
 * - React Query
 * - JWT Access + Refresh Token Flow
 *
 * Responsibilities:
 * - User Registration
 * - Login / Logout
 * - Auto Refresh Expired Access Tokens
 * - Current User Fetching
 * - OTP Verification
 * - Password Management
 *
 * Security Features:
 * - HTTP-only refresh token cookies
 * - Automatic token refresh on 401 errors
 * - Prevents infinite refresh


/* =========================================================
   AXIOS CLIENT
========================================================= */
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../../../../src/queryClient.js";
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:4000/api",
  withCredentials: true, // IMPORTANT for refresh token cookies
});
/* =========================================================
   AUTO TOKEN REFRESH
========================================================= */
/**
 * =========================================================
 * AXIOS RESPONSE INTERCEPTOR
 * =========================================================
 *
 * Purpose:
 * Automatically handles expired access tokens by:
 * 1. Detecting 401 Unauthorized responses
 * 2. Calling refresh-token API
 * 3. Generating a new access token
 * 4. Retrying the original failed request
 *
 * Why Needed:
 * Access tokens usually expire after a short time
 * (example: 15 minutes).
 *
 * Instead of forcing the user to login again,
 * this interceptor silently refreshes the token
 * in the background using the refresh token.
 *
 * Flow:
 *
 * ┌───────────────┐
 * │ API Request   │
 * └──────┬────────┘
 *        │
 *        ▼
 * Access token expired?
 *        │
 *   YES (401 Error)
 *        │
 *        ▼
 * Call /auth/refresh-token
 *        │
 *        ▼
 * New access token generated
 *        │
 *        ▼
 * Retry original request automatically
 *        │
 *        ▼
 * User continues without logout
 *
 * Security Notes:
 * - Prevents infinite refresh loops
 * - Skips refresh retry for refresh-token API itself
 * - Clears React Query cache if refresh fails
 * - Supports HTTP-only cookie authentication
 *
 * =========================================================
 */
apiClient.interceptors.response.use(
  /**
   * =========================================================
   * SUCCESS HANDLER
   * =========================================================
   * If request succeeds normally,
   * simply return the response.
   * =========================================================
   */
  (response) => response,
  /**
   * =========================================================
   * ERROR HANDLER
   * =========================================================
   * Runs whenever any API request fails.
   * Used mainly for handling expired tokens.
   * =========================================================
   */
  async (error) => {
    /**
     * Stores the original failed request.
     *
     * Example:
     * GET /orders
     *
     * We save it so we can retry it later
     * after refreshing the access token.
     */
    const originalRequest = error.config;

    /**
     * Check whether the failed request
     * itself was the refresh-token API.
     *
     * Important:
     * If refresh-token API also returns 401,
     * we should NOT retry again,
     * otherwise infinite loop will happen.
     */

    const isRefreshRequest = originalRequest.url?.includes(
      "/auth/refresh-token",
    );
    /**
     * Conditions for auto refresh:
     *
     * 1. Server returned 401 Unauthorized
     * 2. Request has NOT already been retried
     * 3. Failed request is NOT refresh-token API
     */
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshRequest
    ) {
      /**
       * Mark request as retried
       * to prevent infinite retry loops.
       */
      originalRequest._retry = true;

      try {
        /**
         * =====================================================
         * STEP 1:
         * Request new access token using refresh token
         * =====================================================
         *
         * Refresh token is usually stored in:
         * - HTTP-only secure cookie
         *
         * Backend validates refresh token and:
         * - generates new access token
         * - sends updated cookie/token
         */
        await apiClient.post("/auth/refresh-token");
        /**
         * =====================================================
         * STEP 2:
         * Retry the original failed request
         * =====================================================
         *
         * Example:
         * Original failed request:
         * GET /orders
         *
         * After refresh succeeds:
         * GET /orders again
         */
        return apiClient(originalRequest);
      } catch (refreshError) {
        /**
         * =====================================================
         * REFRESH TOKEN FAILED
         * =====================================================
         *
         * Possible reasons:
         * - Refresh token expired
         * - User logged out
         * - Invalid refresh token
         * - Cookie missing
         *
         * In this case:
         * - Clear React Query cache
         * - Optionally redirect user to login page
         */
        queryClient.clear();
        /**
         * Optional:
         * Redirect user to login screen
         */
        // window.location.href = "/login";

        /**
         * Reject promise so calling component
         * can handle the error properly.
         */

        return Promise.reject(refreshError);
      }
    }
    /**
     * =========================================================
     * NORMAL ERROR HANDLING
     * =========================================================
     *
     * If error is NOT related to token expiry,
     * simply forward the error.
     * =========================================================
     */
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
