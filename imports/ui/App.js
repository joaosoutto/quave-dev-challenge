import React from 'react';
import { TEXTS } from '../infra/constants';
import Select from './components/Select';
import './App.css';

export const App = () => (
  <div>
    <h1>{TEXTS.HOME_TITLE}</h1>
    <Select />
  </div>
);
