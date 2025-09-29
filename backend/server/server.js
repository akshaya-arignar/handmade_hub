import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import mongoose from "mongoose";
import artRoutes from "./routes/artRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res)=> {
    res.send("Happy Learning")
})

app.use("/api/artCollection",artRoutes)
app.use("/api/customer",customerRoutes)


// connect DB then start server
const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Could not start server because DB failed to connect.");
  });
