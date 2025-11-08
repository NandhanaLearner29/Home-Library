const express = require("express");
const app = express();
require("./config/db_config");
const myRoutes = require("./routes/library_routes");

const PORT = 5000;
const API_ENDPOINT = "/home_library"; // 👈 notice the slash

// 👇 Middleware to parse JSON requests
app.use(express.json());

// 👇 Mount your routes
app.use(API_ENDPOINT, myRoutes);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
