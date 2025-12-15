import React from "react";
import { Routes, Route } from "react-router-dom";

// layouts
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

// user pages
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import Registeration from "./pages/Registeration";
import ConfirmationCode from "./pages/ConfirmationCode";
import ForgetPassword from "./pages/ForgetPassword";
import NewPassword from "./pages/NewPassword";
import MyProfile from "./pages/MyProfile";

// seller pages - ADD THESE IMPORTS
import SellerRegister from "./pages/SellerRegister";
import SellerDashboard from "./pages/SellerDashboard";
import SellerProducts from "./pages/SellerProducts";
// admin page
import AdminPanel from "./admin/AdminPanel";

const App = () => {
  return (
    <Routes>
      {/* --- Main Layout (Header + Footer + SearchBar) --- */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/order" element={<Order />} />
        <Route path="/register" element={<Registeration />} />
        <Route path="/verify_code" element={<ConfirmationCode />} />
        <Route path="/forget_password" element={<ForgetPassword />} />
        <Route path="/enter-new-password" element={<NewPassword />} />
        <Route path="/myprofile" element={<MyProfile />} />

        {/* --- ADD SELLER ROUTES HERE --- */}
        <Route path="/seller/register" element={<SellerRegister />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/seller/products" element={<SellerProducts />} />
      </Route>

      {/* --- Admin Layout (No Navbar/Footer) --- */}
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<AdminPanel />} />
      </Route>
    </Routes>
  );
};

export default App;
