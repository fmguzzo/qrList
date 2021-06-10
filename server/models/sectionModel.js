import mongoose, { SchemaType } from "mongoose";
const Schema = mongoose.Schema;

const sectionSchema = new Schema(
  {
    name: { type: String, required: true },
    desc: { type: String },
    items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  },
  {
    timestamp: true,
  }
);

const Section = mongoose.models("Section", sectionSchema);
export default Section;
