import './App.css';
import Signin from './Customer/Components/Authentication/Signin';
import SignUp from './Customer/Components/Authentication/SignUp';
import Cart from './Customer/Components/Cart/Cart';
import Category from './Customer/Components/CateogryPages/Cateogry';
import CheckOut from './Customer/Components/CheckOut/CheckOut';
import ProductDescription from './Customer/Components/ProductDescription/ProductDescription';
import HomePage from './Customer/Pages/HomePage';
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
        
      </Routes>
    </Router>
  );
}

export default App;
