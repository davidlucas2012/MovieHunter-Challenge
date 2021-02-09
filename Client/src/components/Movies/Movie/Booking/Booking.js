import React, { useState, useEffect } from "react";
import "./Booking.css";
import StripeCheckout from "react-stripe-checkout";
import back from "../../../../images/back.png";

function Booking(props) {
  const { movieInfo, closeBooking, paymentSuccess } = props;
  const [ticketCount, setticketCount] = useState(1);
  const [select, setSelect] = useState(11);
  const moment = require("moment");
  let today = moment();
  const [day, setDay] = useState(new Date(today.format("LL")));
  const [class1, setclass1] = useState("time-selected");
  const [class2, setclass2] = useState("time-unselected");
  const [class3, setclass3] = useState("time-unselected");
  const [class4, setclass4] = useState("time-unselected");
  const time = movieInfo.runTime.trim().substring(0, 3);

  const [price, setprice] = useState(time / 10);

  const handleMinus = () => {
    if (ticketCount > 1) {
      setticketCount(ticketCount - 1);
    }
  };

  useEffect(() => {
    switch (select) {
      case "11":
        setclass1("time-selected");
        setclass2("time-unselected");
        setclass3("time-unselected");
        setclass4("time-unselected");
        break;
      case "14":
        setclass1("time-unselected");
        setclass2("time-selected");
        setclass3("time-unselected");
        setclass4("time-unselected");
        break;
      case "17":
        setclass1("time-unselected");
        setclass2("time-unselected");
        setclass3("time-selected");
        setclass4("time-unselected");
        break;
      case "20":
        setclass1("time-unselected");
        setclass2("time-unselected");
        setclass3("time-unselected");
        setclass4("time-selected");
        break;
    }
  }, [select]);

  const handleToken = (token) => {
    paymentSuccess();
  };

  const handleSelect = (e) => {
    setSelect(e.target.getAttribute("name"));
  };

  return (
    <div className="booking-main-cont">
      <div className="booking-left">
        <div className="book-close-btn" onClick={closeBooking}>
          <img className="img-back" alt="back" src={back}></img>
        </div>
        <img src={movieInfo.cover} className="mov-cover"></img>
        <div className="booking-price-cont">
          <div className="ticket-price-cont">
            <span className="ticket-price-desc">${price.toFixed(2)}</span>
          </div>
          <div className="total-price-cont">
            <span className="total-price-desc">TOTAL: </span>
            <span className="ticket-price">
              ${(price * ticketCount).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <div className="booking-right">
        <span className="mov-title">{movieInfo.title}</span>
        <span className="mov-desc">{movieInfo.desc}</span>
        <div className="count-desc">Date: </div>
        <div className="book-date">
          {/* <DatePicker
            getSelectedDay={selectedDay}
            endDate={21}
            selectDate={day}
            labelFormat={"MMMM"}
            color={"#076a77"}
          /> */}

          <input
            className="date"
            type="date"
            name="party"
            min={moment(today).format("YYYY-MM-DD")}
            max={moment(today).add(14, "days").format("YYYY-MM-DD")}
            required
          ></input>
        </div>
        <div className="count-desc">Time Slot:</div>

        <div className="book-time-cont">
          <div className={class1} name="11" onClick={handleSelect}>
            11:00
          </div>
          <div className={class2} name="14" onClick={handleSelect}>
            14:00
          </div>
          <div className={class3} name="17" onClick={handleSelect}>
            17:00
          </div>
          <div className={class4} name="20" onClick={handleSelect}>
            20:00
          </div>
        </div>

        <span className="count-desc">Ticket quantity: </span>

        <div className="booking-ticket-cont">
          <div className="minus-ticket" onClick={handleMinus}>
            <span className="add-minus-span">-</span>
          </div>
          <div className="ticket-count">
            <span className="ticket-span">{ticketCount}</span>
          </div>

          <div
            className="add-ticket"
            onClick={() => setticketCount(ticketCount + 1)}
          >
            <span className="add-minus-span">+</span>
          </div>
        </div>

        <StripeCheckout
          amount={(100 * price * ticketCount).toFixed(2)}
          name={movieInfo.title} // the pop-in header title
          image={movieInfo.cover} // the pop-in header image (default none)
          ComponentClass="stripe-div"
          description={`Payment for ${ticketCount} ticket(s).`}
          stripeKey="pk_test_51HEc6kBC7HNV0emX8YOONqQbo6S2RhuNQLfW5uvgiRZOg3EKhKoY6heYwUWdxbrwPdsil6StqCOEWlvQUxKfbiHV005w2ldUKF"
          // stripeKey="pk_live_51HEc6kBC7HNV0emXPzsuUR1iH1grXzG4JTpS5FQ08majQG3hN5kJ7nohGfIm2dZ27ujuWXlXT1mhkQROy0T5Xp3K00nlbjjWoq"
          token={handleToken}
        >
          <div className="pay-booking">Proceed to Payment</div>
        </StripeCheckout>
      </div>
    </div>
  );
}

export default Booking;
