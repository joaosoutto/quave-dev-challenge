import React from 'react';

const Name = ({ people }) => {
  return (
    <h4 className="name">
      <span className="guestName">
        {people.firstName} {people.lastName}
      </span>
    </h4>
  );
};

export default Name;
