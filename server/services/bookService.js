const Book = require("../models/Book");
const BookRS = require("../models/BookRS");
const BookTBR = require("../models/BookTBR");
const addBook = async (req, res) => {
  try {
    const bookData = req.body;
    const book = new Book({ ...bookData, user_id: req.user.user_id });
    const data = await book.save();

    await BookRS.create({
      user_id: req.user.user_id,
      book_id: data._id,
      status: "TBR",
    });
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
      user_id: req.user.user_id,
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
    const books = await Book.find({ user_id: req.user.user_id });
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
      user_id: req.user.user_id,
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
      {
        title: { $regex: `^${bookTitle}$`, $options: "i" },
        user_id: req.user.user_id,
      },
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

const getTotalBookNumber = async (req, res) => {
  try {
    const book_length = await Book.countDocuments({
      user_id: req.user.user_id,
    });

    return res.status(200).json({ book_length });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error in fetching the library audit" });
  }
};

//  Reading corner status

const addBookInCurrentReading = async (req, res) => {
  try {
    const { book_id, start_date } = req.body;

    const updatedStatus = await BookRS.findOneAndUpdate(
      {
        user_id: req.user.user_id,
        book_id,
      },
      {
        status: "Reading",
      },
      { new: true }
    );

    if (!updatedStatus) {
      return res.status(404).json({
        message: "Book reading status not found",
      });
    }

    await BookTBR.create({
      user_id: req.user.user_id,
      book_id,
      start_date,
    });

    return res.status(200).json({
      message: "Book moved to current reading",
      data: updatedStatus,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server error while adding book to current reading",
    });
  }
};

const updateDateInCurrentReading = async (req, res) => {
  try {
    const { book_id, start_date, end_date } = req.body;

    const tbr = await BookTBR.findOneAndUpdate(
      {
        user_id: req.user.user_id,
        book_id,
        start_date,
      },
      { end_date },
      { new: true }
    );

    if (!tbr) {
      return res.status(404).json({
        message: "Reading session not found",
      });
    }

    await BookRS.findOneAndUpdate(
      {
        user_id: req.user.user_id,
        book_id,
      },
      { status: "Completed" }
    );

    return res.status(200).json({
      message: "Reading session completed",
      tbr,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server error while updating reading session",
    });
  }
};

module.exports = {
  addBook,
  getBookDetailsByname,
  fetchAllBooks,
  searchBooks,
  updateBookDetails,
  getTotalBookNumber,
  addBookInCurrentReading,
  updateDateInCurrentReading,
};
