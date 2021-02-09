import mongoose from "mongoose";

const movSchema = mongoose.Schema({
  title: String,
  desc: String,
  rated: String,
  year: String,
  runTime: String,
  actors: [String],
  director: String,
  cover: String,

  imdb: String,
  rt: String,
  mCritic: String,

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const MovDetails = mongoose.model("PostMessage", movSchema);

export default MovDetails;
