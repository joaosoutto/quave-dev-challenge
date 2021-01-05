import { Meteor } from 'meteor/meteor';
import { loadInitialData } from '../imports/infra/initial-data';

import '../imports/helpers/communitiesMethods';
import '../imports/helpers/peopleMethods';

Meteor.startup(() => {
  // DON'T CHANGE THE NEXT LINE
  loadInitialData();

  // YOU CAN DO WHATEVER YOU WANT HERE
});
