const express = require("express");
const connectDB = require("./db");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require('cors');

// Routes
const userRouter = require("./routes/userRoute");
const mapRouter = require("./routes/mapRoute");

// Middleware
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB()

const app = express();
// Increase the limit for JSON and URL-encoded data
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(cors({
  origin: ['http://localhost:3000'] // Replace this with the origin you want to allow
}));

app.get("/", (req, res) => {
    res.send('API is running');
});

// Routes
app.use('/api/user', userRouter);
app.use('/api/map', mapRouter);

// Error
app.use(notFound)
app.use(errorHandler)

// Set the listening port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
