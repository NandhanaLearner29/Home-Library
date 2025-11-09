import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./templates/Home";
import AddBook from "./templates/AddBook";
import ExploreBooks from "./templates/ExploreBooks";
import BookDetails from "./templates/BookDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="/explore-library" element={<ExploreBooks />} />
      <Route path="/get-book-details" element={<BookDetails />} />
    </Routes>
  );
}

export default App;
