import React, { useEffect, useState } from "react";
import "./Info.css";
import rt from "../../../../images/rt.png";
import imdb from "../../../../images/imdb.png";
import mCritic from "../../../../images/mCritic.png";
import Booking from "../Booking/Booking";
import ReactModal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Info(props) {
  const { movieInfo, closeInfo } = props;
  const [modal, setModal] = useState(false);

  useEffect(() => {
    // alert("info");
    window.onpopstate = () => {
      setModal(false);
      if (!modal) closeInfo();
    };
  });

  const handleBook = () => {
    setModal(true);
  };

  const paymentSuccess = () => {
    setModal(false);
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

  const closeBooking = () => {
    setModal(false);
  };

  return (
    <div className="info-main-cont">
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
          movieInfo={movieInfo}
          closeBooking={closeBooking}
          paymentSuccess={paymentSuccess}
        />
      </ReactModal>

      <div className="info-close-btn" onClick={closeInfo}>
        <span className="x"> close</span>
      </div>
      <div
        className="cover-cont"
        style={{ backgroundImage: `url(${movieInfo.cover})` }}
      ></div>
      <div className="cover-cont-holder">
        <img className="info-cover" src={movieInfo.cover} alt="cover"></img>
      </div>
      <div className="mov-rated-time">
        <span className="mov-time">{movieInfo.year}</span>
        <span className="mov-rated">{movieInfo.rated}</span>
        <span className="mov-time">{movieInfo.runTime}</span>
      </div>
      <div className="details-cont">
        <span className="mov-desc">{movieInfo.desc}</span>
        <span className="details-labels">Director:</span>
        <span className="details-info">{movieInfo.director}</span>
        <span className="details-labels">Cast:</span>
        {movieInfo.actors.map((name) => (
          <span key={name} className="details-info">
            {name}
          </span>
        ))}
      </div>

      <div className="mov-rating-cont">
        <div className="rating-1">
          <img className="rating-img" src={imdb}></img>
          <span className="rating">{movieInfo.imdb}</span>
        </div>
        <div className="rating-1">
          <img className="rating-img" src={rt}></img>
          <span className="rating">{movieInfo.rt}</span>
        </div>
        <div className="rating-1">
          <img className="rating-img" src={mCritic}></img>
          <span className="rating">{movieInfo.mCritic}</span>
        </div>
      </div>

      <div className="book-mov" onClick={handleBook}>
        BOOK TICKET
      </div>
    </div>
  );
}

export default Info;
