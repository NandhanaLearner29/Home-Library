const mongoose = require("mongoose");

const BookRSSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
    default: "TBR",
  },
});

module.exports = mongoose.model("BookRS", BookRSSchema);
