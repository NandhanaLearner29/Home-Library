import { useEffect, useState } from "react";
import Header from "./Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookDetails.css";

const BookDetails = () => {
  const location = useLocation();
  const [book, setBook] = useState(null);
  const title = location.state?.title;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/home_library/book/${title}`
        );
        const bookData = response.data;
        setBook(bookData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBook();
  }, [title]);

  if (!book) {
    return (
      <>
        <Header />
        <div className="book-details-page">
          <div className="book-details-empty">
            <p>No book details found 😢</p>
            <button onClick={() => navigate(-1)}>Go Back</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="book-details-page">
        <div className="book-details-container">
          <div className="book-cover-section">
            <img
              src={book.cover_image}
              alt={book.title}
              className="book-details-cover"
            ></img>
          </div>
          <div className="book-info-section">
            <h1 className="book-title">{book.title}</h1>
            <p className="book-author">
              <strong>Author: </strong>
              {book.author}
            </p>
            <p className="book-genre">
              <strong>Genre: </strong>
              {book.genre}
            </p>
            <p className="book-language">
              <strong>Language: </strong>
              {book.language}
            </p>
            <p className="book-bought-date">
              <strong>Acquired Date: </strong>
              {book.acquired_date.slice(0, 10)}
            </p>
            <p className="book-price">
              <strong>Price: </strong>
              {book.price}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
