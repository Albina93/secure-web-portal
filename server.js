require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./config/connection");

app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));

// app.get("/", (req, res) => {
//   res.send("Test...");
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
