import React from 'react';

const Title = ({ people }) => {
  return (
    <h4 className="name">
      Title:{'    '}
      <span>{people.title}</span>
    </h4>
  );
};

export default Title;
