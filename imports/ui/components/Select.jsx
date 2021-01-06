import React, { useContext, useEffect, useState } from 'react';

import { methodCall } from '../../helpers/methodCall';
import { AppContext } from '../context/AppContext';

import CheckBtn from './CheckBtn';
import PeopleByCompany from './PeopleByCompany';

const Select = () => {
  // state to save the events from db.
  const [events, setEvents] = useState([]);
  // state to save an event selected from select input.
  const [selectedEvent, setSelectedEvent] = useState(null);
  // state to save the peoples from db.
  const [peoples, setPeoples] = useState([]);
  // state to save peoples in selected event.
  const [peopleNow, setPeopleNow] = useState([]);

  // const [companiesNow, setCompaniesNow] = useState([]);

  const {
    peopleCheckedIn,
    setPeopleCheckedIn,
    peopleCheckedOut,
    setPeopleCheckedOut,
    companiesNow,
    setCompaniesNow,
  } = useContext(AppContext);

  //-----------------------------------------------------------------------

  useEffect(() => {
    methodCall('communities').then(eventsData => {
      setEvents(eventsData);
    });

    methodCall('people').then(peopleData => {
      setPeoples(peopleData);
    });
  }, []);

  //-----------------------------------------------------------------------

  useEffect(() => {
    const eventNow = events.filter(event => event.name === selectedEvent);

    const pplInEvent = peoples.filter(
      people => people.communityId === eventNow[0]._id
    );

    const companies = pplInEvent
      .filter(
        (people, index, self) =>
          index === self.findIndex(p => p.companyName === people.companyName)
      )
      .filter(people => people.companyName !== undefined)
      .map((people, index) => people.companyName);

    setCompaniesNow(companies);
    setPeopleNow(pplInEvent);
    setPeopleCheckedIn(0);

    setPeopleCheckedOut(pplInEvent.length);
  }, [selectedEvent]);

  //-----------------------------------------------------------------------

  const selectEvent = e => {
    setSelectedEvent(e.target.value);
  };

  if (!events) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <select onChange={selectEvent}>
        <option key="default">Select an event</option>
        {events.map(event => (
          <option key={event._id}>{event.name}</option>
        ))}
      </select>
      <h1>{selectedEvent}</h1>
      {selectedEvent && (
        <div>
          <h4> People in the event right now: {peopleCheckedIn}</h4>
          <h4> People by company in the event right now:</h4>
          <ul>
            {companiesNow.map((company, index) => {
              if (index < 10) {
                return (
                  <li key={company}>
                    {company}: <PeopleByCompany />
                  </li>
                );
              }
            })}
          </ul>

          <h4> People not checked-in: {peopleCheckedOut}</h4>
        </div>
      )}
      <div>
        {peopleNow
          .filter(people => people.companyName !== undefined)
          .map((people, index) => {
            if (index < 100) {
              return (
                <div key={people._id}>
                  <p>
                    {people.companyName &&
                      `${people.firstName} ${people.lastName} - ${people.companyName} - ${people.title}`}
                  </p>
                  <CheckBtn
                    people={people}
                    index={index}
                    companies={companiesNow}
                    peoples={peopleNow}
                  />
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default Select;
