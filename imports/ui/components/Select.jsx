import React, { useEffect, useState } from 'react';
import { methodCall } from '../../helpers/methodCall';

const Select = () => {
  // state to save the events from db.
  const [events, setEvents] = useState([]);
  // state to save an event selected from select input.
  const [selectedEvent, setSelectedEvent] = useState(null);
  // state to save the peoples from db.
  const [peoples, setPeoples] = useState([]);
  // state to save peoples in selected event.
  const [peopleNow, setPeopleNow] = useState([]);

  // state to set how many peoples are checked-in.
  const [peopleChekedIn, setPeopleCheckedIn] = useState(0);
  const [isDisabled, setIsDisabled] = useState(-1);

  //-----------------------------------------------------------------------

  useEffect(() => {
    methodCall('communities').then(eventsData => {
      setEvents(eventsData);
    });

    methodCall('people').then(peopleData => {
      setPeoples(peopleData);
    });
  }, []);

  useEffect(() => {
    const eventNow = events.filter(event => event.name === selectedEvent);
    const pplInEvent = peoples.filter(
      people => people.communityId === eventNow[0]._id
    );

    setPeopleNow(pplInEvent);
    setPeopleCheckedIn(0);
    setIsDisabled(-1)
  }, [selectedEvent]);

  //-----------------------------------------------------------------------

  // function to save some event on the change of select input.
  const selectEvent = e => {
    setSelectedEvent(e.target.value);
  };

  const checkIn = index => {
    setPeopleCheckedIn(peopleChekedIn + 1);
    setIsDisabled(index);
  };

  // const checkoutFunc = () => {
  //   setPeopleCheckedIn(peopleChekedIn - 1);
  //   setCheckout(false);
  // };

  if (!events) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <select onChange={selectEvent}>
        <option key="default" value="default">
          Select an event
        </option>
        {events.map(event => (
          <option key={event._id}>{event.name}</option>
        ))}
      </select>
      <h1>{selectedEvent}</h1>
      {selectedEvent && (
        <div>
          <h4> People in the event right now: {peopleChekedIn}</h4>
          <h4> People not checked-in: </h4>
        </div>
      )}
      <div>
        {peopleNow.map((people, index) => (
          <div key={people._id}>
            <p>{index}</p>
            <p>
              {people.firstName} {people.lastName}
              {people.companyName && ` - ${people.companyName}`}
              {people.title && ` - ${people.title}`}
            </p>
            <button
              disabled={isDisabled === index}
              onClick={() => checkIn(index)}
            >
              Check-in {people.firstName} {people.lastName}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
