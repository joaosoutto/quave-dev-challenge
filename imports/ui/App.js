import React from 'react';
import { TEXTS } from '../infra/constants';
import Select from './components/Select';

export const App = () => (
  <div>
    <h1>{TEXTS.HOME_TITLE}</h1>
    <Select />
  </div>
);
