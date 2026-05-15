import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "@/context/AppProvider";
import { AuthProvider } from "@/context/AuthContext";
import { queryClient } from "./queryClient.js";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppProvider>
          <AuthProvider>
            <ToastContainer className="mt-20" />
            <App />
          </AuthProvider>
        </AppProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import React from "react";
// import App from "./App.jsx";
// import { BrowserRouter } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ToastContainer } from "react-toastify";
// import { AppProvider } from "@/context/AppProvider";
// import { AuthProvider } from "@/context/AuthContext";
// import { Toaster } from "react-hot-toast";
// const queryClient = new QueryClient();

// createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <BrowserRouter>
//         <AppProvider>
//           <AuthProvider>
//             <ToastContainer className="mt-20" />
//             {/* <Toaster position="top-right" /> */}
//             <App />
//           </AuthProvider>
//         </AppProvider>
//       </BrowserRouter>
//     </QueryClientProvider>
//   </React.StrictMode>,
// );
