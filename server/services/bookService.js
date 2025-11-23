const Book = require("../models/Book");
const addBook = async (req, res) => {
  try {
    const bookData = req.body;
    const book = new Book(bookData);
    const data = await book.save();
    res.status(201).json({
      message: "Book added successfully!",
      data: book,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getBookDetailsByname = async (req, res) => {
  try {
    const { title } = req.params;
    const bookDetails = await Book.findOne({
      title: { $regex: new RegExp(title, "i") },
    });
    if (!bookDetails) {
      return res.status(404).json({ message: "Book Details not found!" });
    }
    return res.json(bookDetails);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

const fetchAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    if (!books.length) {
      return res.status(404).json({ message: "No Books to fetch!" });
    }
    return res.json(books);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

const searchBooks = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: "Search query missing" });
    }

    const books = await Book.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { author: { $regex: q, $options: "i" } },
      ],
    });

    if (!books) {
      return res
        .status(404)
        .json({ message: "No matching books or author found" });
    }
    return res.json(books);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

const updateBookDetails = async (req, res) => {
  try {
    const bookTitle = req.params.title;
    const book = await Book.findOneAndUpdate(
      { title: { $regex: `^${bookTitle}$`, $options: "i" } },
      { $set: req.body },
      {
        new: true,
      }
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book Updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
};

module.exports = {
  addBook,
  getBookDetailsByname,
  fetchAllBooks,
  searchBooks,
  updateBookDetails,
};
