import React from "react";
import "./Movie.css";

function Movie(props) {
  const { movie, moreInfo } = props;

  const moreInfos = () => {
    moreInfo(movie);
  };

  return (
    <div className="movie-cont" onClick={moreInfos}>
      <img className="movie-cover" src={movie.cover}></img>

      <div className="movie-btn-cont">
        <div className="movie-btn" onClick={moreInfos}>
          MORE INFO
        </div>
      </div>
    </div>
  );
}

export default Movie;
