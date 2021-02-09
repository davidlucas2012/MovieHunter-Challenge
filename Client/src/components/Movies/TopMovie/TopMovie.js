import React, { useEffect } from "react";
import "./TopMovie.css";

function TopMovie(props) {
  const { movie, moreInfo } = props;
  return (
    <div>
      <div className="top-main-cont" onClick={() => moreInfo(movie)}>
        <div
          className="overlay-cont"
          style={{ backgroundImage: `url(${movie.cover})` }}
        ></div>
        <div className="top-cover-overlay"> </div>
        {/* <span className="top-title">{movie.title}</span> */}
        <img className="top-cover" src={movie.cover} alt="poster"></img>
        <div className="rank-desc-cont">
          <span className="top-title">{movie.title}</span>
        </div>
        <span className="hidden-rank">{movie.rank}</span>
        <div className="top-ranking">
          <span className="top">TOP</span>
          <span className="top-number">{movie.rank}</span>
        </div>
      </div>
    </div>
  );
}

export default TopMovie;
