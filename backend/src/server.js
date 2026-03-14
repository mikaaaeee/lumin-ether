import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001;

//EndPoint
// combination of a URL + HTTP method that
// lets client interact with specific resources

//middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
); //allow every request from every single URL
app.use(express.json()); //this will parse JSON bodies: req.body
app.use(rateLimiter);

//custom middleware
app.use((req, res, next) => {
  console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
  next();
});

//create routes for specific files
app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
