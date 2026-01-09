import { useEffect, useState } from "react";
import Header from "./Header";
import "./ExploreBooks.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ExploreBooks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [books, setBooks] = useState([]);
  const [libraryCount, setLibraryCount] = useState(0);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  /* =========================
     FETCH TOTAL BOOK COUNT
  ========================= */
  useEffect(() => {
    const fetchTotalBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/home_library/bookslength",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setLibraryCount(response.data.book_length);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTotalBooks();
  }, [token]);

  /* =========================
     SEARCH
  ========================= */
  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/home_library/search?q=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSearchResults(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  /* =========================
     FETCH ALL BOOKS
  ========================= */
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/home_library/books",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [token]);

  /* =========================
     PAGINATION LOGIC
  ========================= */
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(books.length / booksPerPage);

  /* =========================
     JSX
  ========================= */
  return (
    <>
      <Header />

      <div className="explore-container">
        <h1 className="explore-title">Explore Your Library</h1>
        <p className="book-count">{libraryCount} books in your library</p>

        {/* SEARCH */}
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

        {/* BOOK GRID */}
        <div className="book-grid">
          {currentBooks.map((book) => (
            <div
              key={book._id}
              className="book-card"
              onClick={() =>
                navigate("/get-book-details", {
                  state: { title: book.title },
                })
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

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ExploreBooks;
