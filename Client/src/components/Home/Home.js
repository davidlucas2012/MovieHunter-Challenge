import React from "react";
import { Grow } from "@material-ui/core";
import Movies from "../Movies/Movies";
import SearchResult from "../SearchResult/SearchResult";

function Home(props) {
  const { searchString } = props;
  const RenderApp =
    searchString === "" ? (
      <Grow in>
        <div>
          <Movies topMovies={true} listTitle="Top movies 2020" />
          <Movies listTitle="Most Rated" />
        </div>
      </Grow>
    ) : (
      <Grow in>
        <div className="sr-cont">
          <div className="span-cont">
            <span className="sr-span">Search result related to:</span>
            <span className="sr-result">{searchString}</span>
          </div>
          <SearchResult searchString={searchString} />
        </div>
      </Grow>
    );
  return (
    <div>
      <span>Hello</span>
      {RenderApp}
    </div>
  );
}

export default Home;
