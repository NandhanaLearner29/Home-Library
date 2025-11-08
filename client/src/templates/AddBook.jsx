import { useState } from "react";
import "./AddBook.css";
import Header from "./Header";
import axios from "axios";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    acquired_date: "",
    genre: "",
    price: 0,
    language: "",
    cover_image: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/home_library/addBook",
        formData
      );
      alert("Book Added Successfully!");
      setFormData({
        title: "",
        author: "",
        acquired_date: "",
        genre: "",
        price: 0,
        language: "",
        cover_image: "",
      });
    } catch (err) {
      alert("Error in adding book");
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <Header />
      <div className="add-book-page">
        <div className="form-container">
          <h2>Add a New Book</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="acquired_date"
              placeholder="Acquired Date"
              value={formData.acquired_date}
              onChange={handleChange}
            />
            <input
              type="text"
              name="genre"
              placeholder="Genre"
              value={formData.genre}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
            />
            <input
              type="text"
              name="language"
              placeholder="Language"
              value={formData.language}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="cover_image"
              placeholder="Cover Image URL"
              value={formData.cover_image}
              onChange={handleChange}
              required
            />
            <button type="submit">Add Book</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBook;
