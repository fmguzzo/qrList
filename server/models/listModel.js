import mongoose from "mongoose";
const Schema = mongoose.Schema;

const listSchema = new Schema(
  {
    idSite: { type: Schema.Types.ObjectId, ref: "Site", required: true },
    name: { type: String, required: true },
    desc: { type: String },
    active: { type: Boolean, default: false },
  },
  {
    timestamp: true,
  }
);

const List = mongoose.model("List", listSchema);
export default List;
