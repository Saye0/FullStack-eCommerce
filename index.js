const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const ProductRouter = require("./routes/nargile.js");
const jwt = require("jsonwebtoken"); // JWT kütüphanesini ekleyin
app.use(express.json());
app.use(cors());
const corsConfig = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsConfig));
app.options("", cors(corsConfig));

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://root:root2@cluster1.b7m1o.mongodb.net/"
    );
    console.log("connected to MongoDB");
  } catch (error) {
    console.log("Failed to connect");
  }
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ProductRouter'ı kullanırken, /api/products prefix'ini kaldırın
app.use("/api", ProductRouter);

app.listen(8000, () => {
  console.log("8000 port listening on");
  connect();
});
