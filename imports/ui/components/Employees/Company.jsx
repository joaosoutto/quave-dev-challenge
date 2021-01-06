import React from 'react';

const Company = ({ people }) => {
  return (
    <h4 className="name">
      Company:{'    '}
      <span>{people.companyName}</span>
    </h4>
  );
};

export default Company;
