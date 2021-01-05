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
  }, [selectedEvent]);

  //-----------------------------------------------------------------------

  // function to save some event on the change of select input.
  const selectEvent = e => {
    setSelectedEvent(e.target.value);
  };

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
      <div>
        {peopleNow.map(people => (
          <div key={people._id}>
            <p>
              {people.firstName} {people.lastName}
              {people.companyName && ` - ${people.companyName}`}
              {people.title && ` - ${people.title}`}
            </p>
            <button>
              Check-in {people.firstName} {people.lastName}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
