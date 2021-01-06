import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [peopleCheckedIn, setPeopleCheckedIn] = useState(0);
  const [peopleCheckedOut, setPeopleCheckedOut] = useState(0);
  // const [peopleCheckedInByCompany, setPeopleCheckedInByCompany] = useState([]);

  const [companiesNow, setCompaniesNow] = useState([]);

  const context = {
    peopleCheckedIn,
    setPeopleCheckedIn,
    peopleCheckedOut,
    setPeopleCheckedOut,
    // peopleCheckedInByCompany,
    // setPeopleCheckedInByCompany,
    companiesNow,
    setCompaniesNow,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };
