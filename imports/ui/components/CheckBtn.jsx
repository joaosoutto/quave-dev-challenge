import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const CheckBtn = ({ people, index, companies, peoples }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(-1);
  const [checkedOut, setCheckedOut] = useState('');
  const [checkedIn, setCheckedIn] = useState('');
  // ---------------------------------------------------------

  const {
    peopleCheckedIn,
    setPeopleCheckedIn,
    peopleCheckedOut,
    setPeopleCheckedOut,
    peopleCheckedInByCompany,
    setPeopleCheckedInByCompany,
    companiesNow,
  } = useContext(AppContext);

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

    setPeopleCheckedInByCompany(peopleCheckedInByCompany + 1);
  };
  // ---------------------------------------------------------

  const checkOut = () => {
    setPeopleCheckedIn(peopleCheckedIn - 1);
    setPeopleCheckedOut(peopleCheckedOut + 1);

    setIsChecked(false);
    setIsDisabled(-1);

    const date = new Date();
    setCheckedOut(date.toLocaleString());
    setPeopleCheckedInByCompany(peopleCheckedInByCompany - 1);
  };
  // ---------------------------------------------------------

  return (
    <div>
      <p>Checked-In at: {checkedIn}</p>
      <p>Checked-Out at: {checkedOut}</p>

      {isChecked ? (
        <button onClick={checkOut}>
          Check-out {people.firstName} {people.lastName}
        </button>
      ) : (
        <button disabled={isDisabled === index} onClick={() => checkIn(index)}>
          Check-in {people.firstName} {people.lastName}
        </button>
      )}
    </div>
  );
};

export default CheckBtn;
