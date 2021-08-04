import mongoose from "mongoose";
// import mongoosePaginate from "mongoose-paginate-v2";
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    idList: { type: Schema.Types.ObjectId, ref: "List", required: true },
    name: { type: String, required: true },
    desc: { type: String },
    items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  },
  {
    timestamp: true,
  }
);

// categorySchema.plugin(mongoosePaginate);

const Category = mongoose.model("Category", categorySchema);
export default Category;
