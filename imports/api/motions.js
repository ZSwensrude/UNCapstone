// motions.js
import { Mongo } from 'meteor/mongo';

export const motionCollection = new Mongo.Collection('motions');

export const insertMotion = async ({ content, votes }) => {
  motionCollection.insert({ active: 'true', content, votes });
};

// Define allow rules
motionCollection.allow({
  update(userId, doc, fields, modifier) {
    // Allow the update if the user is logged in
    return !!userId;
  },
});
