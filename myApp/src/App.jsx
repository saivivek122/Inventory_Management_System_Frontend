import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import AddProduct from "./pages/AddProduct";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import EditProduct from "./pages/EditProduct";
import ProductDetails from "./pages/ProductDetails";
import LowStock from "./pages/LowStock";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import UserBuy from "./components/UserBuy";
import Cart from "./components/Cart";
import Register from "./pages/Register";

const App = () => {
    const location = useLocation();
     const hideNavbar =
    location.pathname === "/user" ||
    location.pathname === "/cart";
  return (
    <div>
       {!hideNavbar && <NavBar />}
      {/* <NavBar/> */}
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login/>}/>
        <Route element={<ProtectedRoute/>}>
     
        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/:id/edit" element={<EditProduct />} />
        <Route path="/products/:id/" element={<ProductDetails />} />
        <Route path="/products/low-stock" element={<LowStock />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user" element={<UserBuy/>}/>
        {/* <Route path="/user" element={<Cart/>}/> */}

        <Route path="/cart" element={<Cart/>}/>
            
        
        </Route>
       <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<Register/>}/>
      </Routes>
   
    </div>
  );
};

export default App;
