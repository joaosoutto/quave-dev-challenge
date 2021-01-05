import { Meteor } from 'meteor/meteor';
import { People } from '../collections/people';

Meteor.methods({
  people() {
    return People.find().fetch();
  },
});
