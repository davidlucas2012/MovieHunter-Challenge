import React, { useState } from "react";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createMovie } from "../../actions/posts";
import { TextField, Button, Typography, Paper } from "@material-ui/core";

function Form() {
  const [movieData, setMovieData] = useState({
    title: "",
    desc: "",
    rated: "",
    year: "",
    runTime: "",
    actors: "",
    director: "",
    cover: "",

    imdb: "",
    rt: "",
    mCritic: "",
  });
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createMovie(movieData));
    console.log(movieData);
    alert("Movie Added!");
    clear();
  };

  const clear = () => {
    setMovieData({
      title: "",
      desc: "",
      rated: "",
      year: "",
      runTime: "",
      actors: "",
      director: "",
      cover: "",

      imdb: "",
      rt: "",
      mCritic: "",
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.from}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Add Movies</Typography>
        <TextField
          InputProps={{
            className: classes.input,
          }}
          className={classes.input}
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={movieData.title}
          onChange={(e) =>
            setMovieData({ ...movieData, title: e.target.value })
          }
        />

        <TextField
          name="desc"
          variant="outlined"
          label="Description"
          fullWidth
          value={movieData.desc}
          onChange={(e) => setMovieData({ ...movieData, desc: e.target.value })}
        />

        <TextField
          name="rated"
          variant="outlined"
          label="Rated"
          fullWidth
          value={movieData.rated}
          onChange={(e) =>
            setMovieData({ ...movieData, rated: e.target.value })
          }
        />

        <TextField
          name="year"
          variant="outlined"
          label="Year"
          fullWidth
          value={movieData.year}
          onChange={(e) => setMovieData({ ...movieData, year: e.target.value })}
        />

        <TextField
          name="runTime"
          variant="outlined"
          label="Runtime"
          fullWidth
          value={movieData.runTime}
          onChange={(e) =>
            setMovieData({ ...movieData, runTime: e.target.value })
          }
        />

        <TextField
          name="director"
          variant="outlined"
          label="Director"
          fullWidth
          value={movieData.director}
          onChange={(e) =>
            setMovieData({ ...movieData, director: e.target.value })
          }
        />

        <TextField
          name="actors"
          variant="outlined"
          label="Actors"
          fullWidth
          value={movieData.actors}
          onChange={(e) =>
            setMovieData({ ...movieData, actors: e.target.value.split(",") })
          }
        />

        <TextField
          name="imdb"
          variant="outlined"
          label="IMDB"
          fullWidth
          value={movieData.imdb}
          onChange={(e) => setMovieData({ ...movieData, imdb: e.target.value })}
        />

        <TextField
          name="rt"
          variant="outlined"
          label="RT"
          fullWidth
          value={movieData.rt}
          onChange={(e) => setMovieData({ ...movieData, rt: e.target.value })}
        />

        <TextField
          name="mCritic"
          variant="outlined"
          label="MCritic"
          fullWidth
          value={movieData.mCritic}
          onChange={(e) =>
            setMovieData({ ...movieData, mCritic: e.target.value })
          }
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              console.log(base64);
              setMovieData({ ...movieData, cover: base64 });
            }}
          />
        </div>

        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>

        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}

export default Form;
