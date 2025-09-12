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
import AdminHomePage from './Admin/Components/AdminHomePage';
import AddProduct from    './Admin/Components/AddProduct';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDescription />} />
        <Route path="/category" element = {<Category/>} ></Route>
        <Route path="/signin" element ={<Signin/>}></Route>
        <Route path= "/signup" element ={<SignUp/>}></Route>
        <Route path='/cart' element = {<Cart/>}></Route>
        <Route path='/checkout' element = {<CheckOut/>}></Route>
        <Route path='/order' element = {<Order/>}></Route>
        <Route path ="/stores" element ={<AdminLogin/>}></Route> 
        <Route path ="/admin/dashboard" element ={<AdminHomePage/>}></Route>
        <Route path ="/createproduct" element ={<AddProduct/>}></Route>
      </Routes>
    </Router>  
  );
}

export default App;
