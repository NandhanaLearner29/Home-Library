const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/Books", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongodb is connected");
  })
  .catch((err) => {
    console.error(err);
  });
