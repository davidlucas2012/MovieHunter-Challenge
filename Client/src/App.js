import React, { useEffect, useState } from "react";
import { Grow, CircularProgress } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getMovies } from "./actions/posts";
import Form from "./components/Form/Form";
import Movies from "./components/Movies/Movies";
import Navbar from "./components/Navbar/Navbar";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import SearchResult from "./components/SearchResult/SearchResult";
import Compare from "./components/Compare/Compare";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactModal from "react-modal";

function App(props) {
  const movies = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const [searchString, setsearchString] = useState("");
  const [modal, setmodal] = useState(true);

  useEffect(() => {
    if (movies.length > 0) setmodal(false);
  }, [movies]);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const search = (e) => {
    setsearchString(e);
  };

  useEffect(() => {}, [dispatch]);

  const RenderApp = (e) => {
    const location = useLocation();

    if (searchString === "") {
      switch (location.pathname) {
        case "/":
          return modal ? null : (
            <Grow in>
              <div>
                <Movies topMovies={true} listTitle="Top movies 2020" />
                <Movies listTitle="Most Rated" />
                <Movies listTitle="PG-13" />
                <Movies listTitle="Year 2019" />
                <Movies listTitle="Top Search" />
                <Movies listTitle="Most Viewed" />
              </div>
            </Grow>
          );
        case "/compare":
          return <Compare />;
        case "/add-movie":
          return <Form />;
        default:
          break;
      }
    } else {
      return (
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
    }
  };
  return (
    <div className="main-cont">
      <ReactModal
        ariaHideApp={false}
        isOpen={modal}
        closeTimeoutMS={300}
        className="info-modal"
        overlayClassName="modal-container"
      >
        <div className="fetch-modal">
          <CircularProgress className="circ" />
          <span className="fetch-span"> Fetching Data...</span>
        </div>
      </ReactModal>
      <BrowserRouter>
        <Navbar search={search} />
        <Switch>
          <Route path="/compare" component={RenderApp} name="Compare"></Route>
          <Route path="/add-movie" component={RenderApp} name="Compare"></Route>
          <Route path="/" component={RenderApp} name="movies"></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
