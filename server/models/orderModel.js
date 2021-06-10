import mongoose from "mongoose";
const Schema = mongoose.Schema;

require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const orderSchema = new Schema({
  site: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  email: { type: String, required: true },
  name: { type: String, required: true },
  shipAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  orderItems: [
    {
      item: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Item",
      },
      name: { type: String },
      desc: { type: String },
      qty: { type: Number, default: 0, min: 1 },
      price: { type: Currency, default: 0 },
    },
  ],
  shipCost: { type: Currency, default: 0 },
  inSite: { type: boolean, default: true },
  closed: { type: DateTime, defaul: null },
  shipped: { type: DateTime, defaul: null },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
