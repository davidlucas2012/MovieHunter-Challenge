import React, { useEffect, useState } from "react";
import "./SearchResult.css";
import { useSelector } from "react-redux";
import Movie from "../Movies/Movie/Movie";
import Info from "../Movies/Movie/Info/Info";
import ReactModal from "react-modal";
import { Grid } from "@material-ui/core";

function SearchResult(props) {
  const [filterString, setfilterString] = useState(null);
  const movies = useSelector((state) => state.posts);
  const { searchString } = props;

  const [modal, setModal] = useState(false);
  const [movieInfo, setMovieInfo] = useState(null);

  const moreInfo = (e) => {
    console.log(e);
    setMovieInfo(e);
    setModal(true);
  };

  useEffect(() => {
    setfilterString(searchString.toLowerCase());
  }, [searchString]);

  const closeInfo = () => {
    setModal(false);
  };

  const renderMovieList = movies
    .filter((mov) => mov.title.toLowerCase().includes(filterString))
    .map((movie, index) => (
      <div className="mov-cont">
        <Movie key={index} movie={movie} moreInfo={moreInfo} />
      </div>
    ));
  return (
    <div className="sr-main-cont">
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
      {/* <span className="sr-span">Search result related to: {searchString}</span> */}
      {renderMovieList}
    </div>
  );
}

export default SearchResult;
