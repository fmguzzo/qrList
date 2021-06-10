import mongoose from "mongoose";
const Schema = mongoose.Schema;

require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const itemSchema = new Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String },
    price: { type: Currency, required: true, default: 0 },
  },
  {
    timestamp: true,
  }
);

const Item = mongoose.model("Item", itemSchema);
export default Item;
