import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListUser from "./Components/ListUser";
import NewUser from "./Components/NewUser";
import UpdateUser from "./Components/UpdateUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListUser />} />
        <Route path="/newUser" element={<NewUser />} />
        <Route path="/updateUser/:id" element={<UpdateUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
