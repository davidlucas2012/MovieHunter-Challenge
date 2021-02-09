import React from "react";
import "./MovieCheck.css";
import rt from "../../../images/rt.png";
import imdb from "../../../images/imdb.png";
import mCritic from "../../../images/mCritic.png";
import del from "../../../images/delete.png";
import ReactModal from "react-modal";
import Booking from "../../Movies/Movie/Booking/Booking";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { Grow } from "@material-ui/core";

function MovieCheck(props) {
  const { movie, delMov } = props;
  const [modal, setmodal] = useState(false);

  const time = movie.runTime.trim().substring(0, 3);

  const deleteMov = () => {
    delMov(movie);
  };

  const price = time / 10;

  const closeBooking = () => {
    setmodal(false);
  };

  const paymentSuccess = () => {
    closeBooking();
    toast.success("Payment successful! Please check your email for details.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <Grow in>
      <div className="mc-main-cont">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ReactModal
          onRequestClose={closeBooking}
          ariaHideApp={false}
          isOpen={modal}
          closeTimeoutMS={300}
          className="info-modal"
          overlayClassName="modal-container"
        >
          <Booking
            movieInfo={movie}
            closeBooking={closeBooking}
            paymentSuccess={paymentSuccess}
          />
        </ReactModal>
        <img className="del-btn" src={del} onClick={deleteMov}></img>
        <div className="mc-left">
          <img className="mc-cover" alt="img" src={movie.cover}></img>
        </div>

        <div className="mc-mid">
          <span className="mc-title">{movie.title}</span>
          <span className="mc-desc">{movie.desc}</span>
          <span className="mc-label">Director:</span>
          <span className="mc-director">{movie.director}</span>
          <span className="mc-label">Cast:</span>
          <div className="cast-div">
            {movie.actors.map((art, index) => (
              <span className="mc-cast" key={index}>
                {art}
              </span>
            ))}
          </div>
        </div>
        <div className="mc-right">
          <div className="mc-upper">
            <span className="mc-time">{movie.runTime}</span>
            <span className="mc-rated">{movie.rated}</span>
            <span className="mc-price">${price.toFixed(2)}</span>
          </div>
          <div className="mc-lower">
            <div className="mc-rate-cont">
              <img className="mc-rating-img" src={imdb} alt="rate"></img>
              <span className="mc-rating-span">{movie.imdb}</span>
            </div>
            <div className="mc-rate-cont">
              <img className="mc-rating-img" src={rt} alt="rate"></img>
              <span className="mc-rating-span">{movie.rt}</span>
            </div>
            <div className="mc-rate-cont">
              <img className="mc-rating-img" src={mCritic} alt="rate"></img>
              <span className="mc-rating-span">{movie.mCritic}</span>
            </div>
          </div>
          <span className="book-ticket-cont" onClick={() => setmodal(true)}>
            BOOK TICKET
          </span>
        </div>
      </div>
    </Grow>
  );
}

export default MovieCheck;
