import './App.css';
import Signin from './Customer/Components/Authentication/Signin';
import SignUp from './Customer/Components/Authentication/SignUp';
import Cart from './Customer/Components/Cart/Cart';
import Category from './Customer/Components/CateogryPages/Cateogry';
import CheckOut from './Customer/Components/CheckOut/CheckOut';
import Order from './Customer/Components/Order/Order';
import ProductDescription from './Customer/Components/ProductDescription/ProductDescription';
import HomePage from './Customer/Pages/HomePage';
import AdminLogin from './Admin/Components/AdminLogin';
import { Toaster } from "react-hot-toast";
import AdminHomePage from './Admin/Components/AdminHomePage';
import AddProduct from './Admin/Components/AddProduct';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDescription />} />
         <Route path="/:level1/:level2/:level3" element={<Category />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/order" element={<Order />} />
          <Route path="/stores" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminHomePage />} />
          <Route path="/createproduct" element={<AddProduct />} />
        </Routes>
      </Router>

      {/* 🔥 Toaster must be OUTSIDE Router but inside main fragment */}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
