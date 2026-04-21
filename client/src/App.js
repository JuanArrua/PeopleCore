import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./elements/Home";
import Create from "./elements/Create";
import Edit from "./elements/Edit";
import Read from "./elements/Read";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/read/:id" element={<Read />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
