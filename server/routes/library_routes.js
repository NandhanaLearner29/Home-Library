const express = require("express");
const router = express.Router();
const { addBook } = require("../services/bookService");

router.post("/addBook", addBook);

module.exports = router;
