import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Franchisee from "./pages/Franchisee";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MenuSelect from "./pages/MenuSelect";
import Example  from "./pages/Example ";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/franchisee" element={<Franchisee/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/menuselect" element={<MenuSelect/>}/>
        <Route path="/test" element={<Example />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
