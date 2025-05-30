import express from "express";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// app.use(cors());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://book-store-frontend-ujuj.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to book store");
});

app.use("/books", booksRoute);

const PORT = process.env.PORT || 5555;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("App connected to db");
    app.listen(PORT, () => {
      console.log(`App is listening to port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
