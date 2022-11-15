import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Bag from "./pages/Bag";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/productlist" element={<ProductList />} />
      <Route path="/product" element={<Product />} />
      <Route path="/bag" element={<Bag />} />
    </Routes>
  );
};

export default App;
