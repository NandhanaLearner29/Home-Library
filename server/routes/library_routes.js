const express = require("express");
const router = express.Router();
const {
  addBook,
  getBookDetailsByname,
  fetchAllBooks,
  searchBooks,
  updateBookDetails,
} = require("../services/bookService");

router.post("/addBook", addBook);
router.get("/book/:title", getBookDetailsByname);
router.get("/books", fetchAllBooks);
router.get("/search", searchBooks);
router.patch("/update/:title", updateBookDetails);

module.exports = router;
