import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const CheckBtn = ({ people, index }) => {
  // state changes depending on whether the person checked in or not
  const [isChecked, setIsChecked] = useState(false);
  // state to controll the button disable property
  const [isDisabled, setIsDisabled] = useState(-1);

  // states to create the date of check-in/out
  const [checkedOut, setCheckedOut] = useState('');
  const [checkedIn, setCheckedIn] = useState('');
  // ---------------------------------------------------------

  const {
    peopleCheckedIn,
    setPeopleCheckedIn,
    peopleCheckedOut,
    setPeopleCheckedOut,
  } = useContext(AppContext);

  // This function is used to change the state of the button, add/remove people who have
  // checked in/out of the event, create the checkin date and change the state from check-in
  // to check-out 5 seconds after checking in.
  const checkIn = index => {
    setIsDisabled(index);

    setPeopleCheckedIn(peopleCheckedIn + 1);
    setPeopleCheckedOut(peopleCheckedOut - 1);

    setTimeout(() => {
      setIsChecked(true);
    }, 5000);

    const date = new Date();
    setCheckedIn(date.toLocaleString());
    setCheckedOut('');
  };
  // ---------------------------------------------------------

  // This function works like the function above, but changing the values ​​according to the checkout
  const checkOut = () => {
    setPeopleCheckedIn(peopleCheckedIn - 1);
    setPeopleCheckedOut(peopleCheckedOut + 1);

    setIsChecked(false);
    setIsDisabled(-1);

    const date = new Date();
    setCheckedOut(date.toLocaleString());
  };
  // ---------------------------------------------------------

  return (
    <div className="btnDiv">
      <p className="btnCheckP">
        Checked-In at:
        <span className="checkedIn">
          {'     '}
          {checkedIn}
        </span>
      </p>
      <p className="btnCheckP">
        Checked-Out at:
        <span className="checkedOut">
          {'     '}
          {checkedOut}
        </span>
      </p>

      {/* Here we have a ternary, where the checkin or checkout button will render, depending on the state value. */}
      {isChecked ? (
        <button className="checkOutBtn" onClick={checkOut}>
          Check-out {people.firstName} {people.lastName}
        </button>
      ) : (
        <button
          className="checkInBtn"
          disabled={isDisabled === index}
          onClick={() => checkIn(index)}
        >
          Check-in {people.firstName} {people.lastName}
        </button>
      )}
    </div>
  );
};

export default CheckBtn;
