// motions.js
import { Mongo } from 'meteor/mongo';

export const motionCollection = new Mongo.Collection('motions');

export const insertMotion = async ({ content, votes, abstain}) => {
  motionCollection.insert({ active: 'true', content, votes, abstain });
};

// Define allow rules
motionCollection.allow({
  update(userId, doc, fields, modifier) {
    // Allow the update if the user is logged in
    return !!userId;
  },
});


// {
//   "_id": "xHyPMhyCr9RnqYT3X",
//   "content": "Motion A",
//   "votes": [
//     {
//       "country": "antiguaandbarbuda",
//       "vote": "No"
//     },
//     {
//       "country": "burundi",
//       "vote": "Abstain"
//     }
//   ],
//   "active": "true",
//   "abstain": true
// }