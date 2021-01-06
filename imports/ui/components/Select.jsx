import React, { useContext, useEffect, useState } from 'react';

import { methodCall } from '../../helpers/methodCall';
import { AppContext } from '../context/AppContext';

import CheckBtn from './CheckBtn';
import Company from './Employees/Company';
import Name from './Employees/Name';
import Title from './Employees/Title';

const Select = () => {
  // state to save the events from db.
  const [events, setEvents] = useState([]);
  // state to save an event selected from select input.
  const [selectedEvent, setSelectedEvent] = useState(null);
  // state to save the peoples from db.
  const [peoples, setPeoples] = useState([]);
  // state to save peoples in selected event.
  const [peopleNow, setPeopleNow] = useState([]);

  const {
    peopleCheckedIn,
    setPeopleCheckedIn,
    peopleCheckedOut,
    setPeopleCheckedOut,
    companiesNow,
    setCompaniesNow,
  } = useContext(AppContext);

  //-----------------------------------------------------------------------

  // When the page renders, I use the data in the database to save all events and people in the initial state
  useEffect(() => {
    methodCall('communities').then(eventsData => {
      setEvents(eventsData);
    });

    methodCall('people').then(peopleData => {
      setPeoples(peopleData);
    });
  }, []);

  //-----------------------------------------------------------------------

  // Every time I choose an event, I filter the specific event from the database that has the same name
  // as the selected event. That way, I can extract the people assigned to that event as well as the specific
  // companies of those people. All of this information is used to save the data in their respective states
  // to render it reactively on the front.
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
      .map((people, index) => ({ name: people.companyName, checkinCount: 0 }));

    setCompaniesNow(companies);
    setPeopleNow(pplInEvent);
    setPeopleCheckedIn(0);

    setPeopleCheckedOut(pplInEvent.length);
    // console.log(companies)
  }, [selectedEvent]);

  //-----------------------------------------------------------------------

  const selectEvent = e => {
    setSelectedEvent(e.target.value);
  };

  if (!events) {
    return <p>loading...</p>;
  }

  return (
    <div className="selectDiv">
      <select onChange={selectEvent}>
        <option key="default">Select an event</option>
        {events.map(event => (
          <option key={event._id}>{event.name}</option>
        ))}
      </select>
      {selectedEvent && (
        <div className="countPeople">
          <h1 className="eventName">{selectedEvent}</h1>

          <h4 className="peopleCounter">
            People in the event right now:{' '}
            <span className="pplCheckedIn">{peopleCheckedIn}</span>
          </h4>
          <h4 className="peopleCounter">
            {' '}
            People by company in the event right now:
          </h4>
          <ul>
            {companiesNow.map((company, index) => {
              if (index < 10) {
                return (
                  <li key={company}>
                    {company.name}: {company.checkinCount}
                  </li>
                );
              }
            })}
          </ul>

          <h4 className="peopleCounter">
            People not checked-in:
            <span className="pplCheckedOut"> {peopleCheckedOut}</span>
          </h4>
        </div>
      )}
      <div className="allPeoples">
        {peopleNow
          .filter(
            people =>
              people.companyName !== undefined && people.title !== undefined
          )
          .map((people, index) => {
            if (index < 50) {
              return (
                <div key={people._id} className="people">
                  <Name people={people} />
                  <Title people={people} />
                  <Company people={people} />
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
