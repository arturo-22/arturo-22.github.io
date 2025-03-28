import { BrowserRouter, Route, Routes } from "react-router-dom";
import { List } from "./Components/List";
import NewProducto from "./Components/NewProducto";
import UpdateProducto from "./Components/UpdateProducto";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List/>}/>
        <Route path="/newProducto" element={<NewProducto/>}/>
        <Route path="/updateProducto/:id" element={<UpdateProducto/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
