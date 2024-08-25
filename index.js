const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const ProductRouter = require("./routes/nargile.js");
const jwt = require("jsonwebtoken"); // JWT kütüphanesini ekleyin
app.use(express.json());
app.use(cors());

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://root:root@cluster0.9nvfu.mongodb.net/"
    );
    console.log("connected to MongoDB");
  } catch (error) {
    console.log("Failed to connect");
  }
};

// ProductRouter'ı kullanırken, /api/products prefix'ini kaldırın
app.use("/", ProductRouter);

app.listen(8000, () => {
  console.log("8000 port listening on");
  connect();
});
