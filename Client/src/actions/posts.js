import * as api from "../api";

//Ation creators

export const getMovies = () => async (dispatch) => {
  try {
    const { data } = await api.fetchMovies();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createMovie = (mov) => async (dispatch) => {
  try {
    const { data } = await api.createMovie(mov);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};
