import './App.css';
import Signin from './Customer/Components/Authentication/Signin';
import Category from './Customer/Components/CateogryPages/Cateogry';
import ProductDescription from './Customer/Components/ProductDescription/ProductDescription';
import HomePage from './Customer/Pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDescription />} />
        <Route path="/cateogry" element = {<Category/>} ></Route>
        <Route path="/signin" element ={<Signin/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
