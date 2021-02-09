import React, { Component } from "react";
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";
import * as Autosuggest from "react-autosuggest";
import "./AutoSuggest.css";
import axios from "axios";
import ReactModal from "react-modal";
import { CircularProgress } from "@material-ui/core";
let movie = [];

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === "") {
    return [];
  }

  const regex = new RegExp("\\b" + escapedValue, "i");

  return movie.filter((mov) => regex.test(getSuggestionValue(mov)));
}

function getSuggestionValue(suggestion) {
  return `${suggestion.title}`;
}

function renderSuggestion(suggestion, { query }) {
  const suggestionText = `${suggestion.title}`;
  const matches = AutosuggestHighlightMatch(suggestionText, query);
  const parts = AutosuggestHighlightParse(suggestionText, matches);
  const time = suggestion.runTime.trim().substring(0, 3);

  const price = time / 10;

  const suggestionTitle = (
    <span>
      {parts.map((part, index) => {
        const className = part.highlight
          ? "react-autosuggest__suggestion-match"
          : null;

        return (
          <span className={className} key={index}>
            {part.text}
          </span>
        );
      })}
    </span>
  );

  return (
    <div className="suggestion-cont">
      <img className="suggestion-pic" alt="img" src={suggestion.cover}></img>
      <div className="suggestion-spans">
        {suggestionTitle}
        <div className="span-bot">
          <span className="span-rated">{suggestion.rated}</span>
          <span className="span-dur">{suggestion.runTime}</span>
        </div>
        <div className="span-bot-cont">
          <span className="span-year">{suggestion.year}</span>
          <span className="span-price">${price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

class AutoSuggest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      suggestions: [],
      modal: true,
    };
  }

  componentDidMount() {
    movie = [];
    axios
      .get("https://movie-hunter-challenge.herokuapp.com/api")
      .then((res) => {
        res.data.map((mov) => movie.push(mov));
        this.setState({ modal: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChange = (_event, { newValue, method }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  onSuggestionSelected = (_e, { suggestion }) => {
    this.props.searchPick(suggestion);
    this.setState({
      value: "",
    });
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Search for movie titles to compare",
      value,
      onChange: this.onChange,
      className: "input-class",
    };

    return (
      <div>
        <ReactModal
          onRequestClose={this.close}
          ariaHideApp={false}
          isOpen={this.state.modal}
          closeTimeoutMS={300}
          className="info-modal"
          overlayClassName="modal-container"
        >
          <div className="fetch-modal">
            <CircularProgress className="circ" />

            <span className="fetch-span"> Fetching Data...</span>
          </div>
        </ReactModal>

        <Autosuggest
          suggestions={suggestions}
          onSuggestionSelected={this.onSuggestionSelected}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

export default AutoSuggest;
