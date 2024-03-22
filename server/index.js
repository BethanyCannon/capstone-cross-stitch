const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const { PORT, CORS_ORIGIN } = process.env;
const allowedOrigins = CORS_ORIGIN.split(",");
const port = PORT || 5051;

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(express.static('public'))

const designRoutes = require("./routes/design-routes")
const userRoutes = require("./routes/user-routes")

app.use("/design", designRoutes)
app.use("/user", userRoutes)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
  