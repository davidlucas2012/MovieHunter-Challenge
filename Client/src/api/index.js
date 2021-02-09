import axios from "axios";

const url = "https://movie-hunter-challenge.herokuapp.com/api";

export const fetchMovies = () => axios.get(url);
export const createMovie = (newMov) => axios.post(url, newMov);
