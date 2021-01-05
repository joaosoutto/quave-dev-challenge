import React, { useEffect, useState } from 'react';
import { methodCall } from '../../helpers/methodCall';

const Select = () => {
  // state to save the events from db.
  const [events, setEvents] = useState([]);
  // state to save an event selected from select input.
  const [selectedEvent, setSelectedEvent] = useState(null);

  // state to save the peoples from db.
  const [peoples, setPeoples] = useState([]);

  // function to save some event on the change of select input.
  const selectEvent = e => {
    setSelectedEvent(e.target.value);
  };

  useEffect(() => {
    methodCall('communities').then(eventsData => {
      setEvents(eventsData);
    });

    methodCall('people').then(peopleData => {
      setPeoples(peopleData);
    });
  }, []);

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
    </div>
  );
};

export default Select;
