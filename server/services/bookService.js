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

module.exports = { addBook };
