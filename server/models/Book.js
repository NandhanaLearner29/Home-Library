const mongoose = require("mongoose");
const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  acquired_date: {
    type: Date,
  },
  genre: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  language: {
    type: String,
    required: true,
  },
  cover_image: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
