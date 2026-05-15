import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./features/auth/SignupPage";
import Login from "./features/auth/Login";
// import ProductTab from "./features/products/ProductsTab";
import ShowroomCRM from "./features/order/ShowroomCRM";
import SkfAction from "./pages/SkfAction";
import ProtectedRoute from "./routes/ProtectedRoute";
const App = () => {
  return (
    <>
      <Header />

      <Routes>
        {/* ✅ Home route */}
        <Route path="/" element={<Home />} />

        {/* <Route path="/products" element={<ProductTab />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignupPage />} />

        {/* create order route */}

        {/* ✅ Category route */}

        <Route path="/category/:slug" element={<CategoryPage />} />

        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="/skf-action" element={<SkfAction />} />
          <Route path="/skf-action/orders" element={<ShowroomCRM />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
