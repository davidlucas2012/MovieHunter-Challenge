import React, { useEffect, useState } from "react";
import Movie from "./Movie/Movie";
import "./Movies.css";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";
import ReactModal from "react-modal";
import Info from "./Movie/Info/Info";
import TopMovie from "./TopMovie/TopMovie";
import { useRef } from "react";

import arrow from "../../images/arrow.png";
function Movies(props) {
  const { topMovies, listTitle } = props;
  const [modal, setModal] = useState(false);
  const [movieInfo, setMovieInfo] = useState(null);
  const [filtered, setfiltered] = useState([]);

  const movies = useSelector((state) => state.posts);
  const ref = useRef(null);

  useEffect(() => {
    console.log(movies);
    setfiltered([]);
    switch (listTitle) {
      case "PG-13":
        movies
          .reverse()
          .filter((m) => m.rated === "PG-13")
          .map((mov) => setfiltered((prev) => [...prev, mov]));
        break;
      case "Most Rated":
        movies.reverse().map((m) => setfiltered((prev) => [...prev, m]));

        console.log(filtered);
      case "Year 2019":
        movies
          .filter((f) => f.year === "2019")
          .map((mov) => setfiltered((prev) => [...prev, mov]));
      case "Top Search":
        movies.map((mov, i) => {
          if (i >= 15 && i <= 25) setfiltered((prev) => [...prev, mov]);
        });
      case "Most Viewed":
        movies.reverse().map((mov, i) => {
          if (i > 26) setfiltered((prev) => [...prev, mov]);
        });
      default:
        break;
    }
  }, [0]);

  const moreInfo = (e) => {
    console.log(e);
    setMovieInfo(e);
    setModal(true);
  };

  const closeInfo = () => {
    setModal(false);
  };

  const scrollLeft = () => {
    ref.current.scrollLeft += -window.innerWidth + 510;
  };

  const scrollRight = () => {
    ref.current.scrollLeft += window.innerWidth - 510;
  };

  return (
    <div className="movies-cont">
      <ReactModal
        onRequestClose={closeInfo}
        ariaHideApp={false}
        isOpen={modal}
        closeTimeoutMS={300}
        className="info-modal"
        overlayClassName="modal-container"
      >
        <Info movieInfo={movieInfo} closeInfo={closeInfo} />
      </ReactModal>

      <span className="mov-list-title">{listTitle}</span>
      <div className="btn-cont">
        <div className="btn-left" onClick={scrollLeft}>
          <img className="arrow-left" src={arrow} alt="arrow"></img>
        </div>
        <div className="btn-right" onClick={scrollRight}>
          <img className="arrow-right" src={arrow} alt="arrow"></img>
        </div>
      </div>

      <div className="movie-section" ref={ref}>
        {
          topMovies
            ? movies
                .filter((m) => m.rank > 0)
                .map((movie, index) => (
                  <TopMovie key={index} movie={movie} moreInfo={moreInfo} />
                ))
            : filtered.map((movie, index) => (
                <Movie key={index} movie={movie} moreInfo={moreInfo} />
              ))

          //   movies.map((movie, index) =>
          //   topMovies ? (
          //     <TopMovie key={index} movie={movie} moreInfo={moreInfo} />
          //   ) : (
          //     <Movie key={index} movie={movie} moreInfo={moreInfo} />
          //   )
          // )
        }
        {listTitle === "PG-13" ? null : null}

        <div className="spacer">DL</div>
      </div>
    </div>
  );
}

export default Movies;
