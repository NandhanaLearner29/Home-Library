import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./templates/Home";
import AddBook from "./templates/AddBook";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-book" element={<AddBook />} />
    </Routes>
  );
}

export default App;
