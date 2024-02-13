// delegates.js
import { Mongo } from 'meteor/mongo';

export const delCollection = new Mongo.Collection('delegates');

// Define allow rules
delCollection.allow({
  update(userId, doc, fields, modifier) {
    // Allow the update if the user is logged in
    return !!userId;
  },
});

export const insertDel = async ({ country, roleCall }) => {
  // Check if the item already exists in the collection
  const existingDelegate = delCollection.findOne({ country });

  // If the item already exists, return false
  if (existingDelegate) {
    return false;
  }

  // If the item doesn't exist, insert it into the collection
  delCollection.insert({ country, roleCall });
  return true;
};


// {
//   "_id": "MpCdfzJpT59P3FNrz",
//   "country": "algeria",
//   "roleCall": "present"
// }
