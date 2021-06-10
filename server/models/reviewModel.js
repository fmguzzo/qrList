import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    email: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    site: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;
