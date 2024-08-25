const mongoose = require("mongoose");

const NargileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: String,
      required: true,
    },
    discountedprice: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    discount: {
      type: Boolean,
      required: true,
    },
    images: {
      type: String,
      default: "https://picsum.photos/200/300",
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Nargile = mongoose.model("Nargile", NargileSchema);

module.exports = Nargile;
