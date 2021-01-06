import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const PeopleByCompany = () => {
  const { peopleCheckedInByCompany } = useContext(AppContext);

  return <span>( {peopleCheckedInByCompany} )</span>;
};

export default PeopleByCompany;
