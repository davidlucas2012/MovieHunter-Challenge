import React, { useState } from "react";
import MovieCheck from "./MovieCheck/MovieCheck";
import AutoSuggest from "./AutoSuggest/AutoSuggest";
import "./Compare.css";

function Compare() {
  const [result, setresult] = useState([]);
  const searchPick = (e) => {
    setresult((prev) => [...prev, e]);
  };

  let addMovie;

  const delMov = (e) => {
    console.log(e);
    var array = [...result];
    var index = array.indexOf(e);
    if (index !== -1) {
      array.splice(index, 1);
      setresult(array);
      console.log(array);
    }
  };

  if (result.length > 0) {
    addMovie = result.map((res, index) => {
      return <MovieCheck delMov={delMov} key={index} movie={res} />;
    });
  } else {
    addMovie = (
      <div className="comp-empty">SEARCH TO COMPARE SOME MOVIES HERE.</div>
    );
  }

  return (
    <div className="comp-main-cont">
      <div className="comp-search-cont">
        <AutoSuggest searchPick={searchPick} />
      </div>
      <div className="comp-result">{addMovie}</div>
    </div>
  );
}

export default Compare;
