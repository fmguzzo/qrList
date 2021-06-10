import mongoose from "mongoose";
const Schema = mongoose.Schema;

require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const siteSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    business: { type: String, default: "business" },
    siteAddress: {
      address: { type: String, default: "address" },
      city: { type: String, default: "" },
      postalCode: { type: String, default: "" },
    },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    image: { type: String, default: "" },
    shipCost: { type: Currency, default: 0 },
    lists: [{ type: Schema.Types.ObjectId, ref: "List" }],
  },
  {
    timestamps: true,
  }
);

const Site = mongoose.model("Site", siteSchema);
export default Site;
