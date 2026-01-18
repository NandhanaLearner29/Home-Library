const express = require("express");
const router = express.Router();
const protect = require("../security/authMiddleware");
const {
  addBook,
  getBookDetailsByname,
  fetchAllBooks,
  searchBooks,
  updateBookDetails,
  getTotalBookNumber,
} = require("../services/bookService");

const { registerUser, loginUser } = require("../services/userService");

// Book Routes
router.post("/addBook", protect, addBook);
router.get("/book/:title", protect, getBookDetailsByname);
router.get("/books", protect, fetchAllBooks);
router.get("/search", protect, searchBooks);
router.patch("/update/:title", protect, updateBookDetails);
router.get("/bookslength", protect, getTotalBookNumber);

// User routes
router.post("/signup", registerUser);
router.post("/login", loginUser);

// Reaing corner routes
// router.post("/add");

module.exports = router;
