import MovDetails from "../models/movDetails.js";

export const getMovie = async (req, res) => {
  try {
    const movie = await MovDetails.find();
    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json({ messsage: error.messsage });
  }
};

export const createMovie = async (req, res) => {
  const movie = req.body;

  const newPost = new MovDetails(movie);

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
