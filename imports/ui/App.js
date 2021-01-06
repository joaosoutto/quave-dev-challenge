import React from 'react';
import { AppProvider } from './context/AppContext';
import { TEXTS } from '../infra/constants';
import Select from './components/Select';
import './App.css';

export const App = () => (
  <AppProvider>
    <section className="mainSec">
      <h1 className="mainTitle">{TEXTS.HOME_TITLE}</h1>
      <Select />
    </section>
  </AppProvider>
);
