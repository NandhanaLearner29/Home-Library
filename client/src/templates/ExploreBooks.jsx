import { useEffect, useState } from "react";
import Header from "./Header";
import "./ExploreBooks.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ExploreBooks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/home_library/search?q=${query}`
      );
      setSearchResults(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/home_library/books"
        );
        const allBooks = response.data;

        if (allBooks.length === 0) {
          setBooks([]);
        } else if (allBooks.length <= 10) {
          setBooks(allBooks);
        } else {
          const randomBooks = allBooks
            .sort(() => 0.5 - Math.random())
            .slice(0, 10);
          setBooks(randomBooks);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <>
      <Header />
      <div className="explore-container">
        <h1 className="explore-title">Explore Your Library</h1>
        <div className="search-wrapper">
          <input
            type="text"
            className="search-bar"
            placeholder="Search by title or author name"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {searchResults.length > 0 && (
            <ul className="dropdown-results">
              {searchResults.map((book) => (
                <li
                  key={book._id}
                  onClick={() =>
                    navigate("/get-book-details", {
                      state: { title: book.title },
                    })
                  }
                >
                  <img
                    src={book.cover_image}
                    alt={book.title}
                    className="dropdown-img"
                  />
                  <span>{book.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="book-grid">
          {books.map((book) => (
            <div
              key={book._id}
              className="book-card"
              onClick={() =>
                navigate("/get-book-details", { state: { title: book.title } })
              }
            >
              <img
                src={book.cover_image}
                alt={book.title}
                className="book-cover"
              />
              <h3 className="book-title">{book.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default ExploreBooks;
