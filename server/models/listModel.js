import mongoose from "mongoose";
const Schema = mongoose.Schema;

const listSchema = new Schema(
  {
    name: { type: String, required: true },
    desc: { type: String },
    sections: [{ type: Schema.Types.ObjectId, ref: "Section" }],
  },
  {
    timestamp: true,
  }
);

const List = mongoose.models("List", listSchema);
export default List;
