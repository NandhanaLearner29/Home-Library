const mongoose = require("mongoose");
const User = require("./User");
const BookSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
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
