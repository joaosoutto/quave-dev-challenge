import { Meteor } from 'meteor/meteor';
import { Communities } from '../collections/communities';

Meteor.methods({
  communities() {
    return Communities.find().fetch();
  },
});
