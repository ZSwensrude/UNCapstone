// motions.js
import { Mongo } from 'meteor/mongo';

export const motionCollection = new Mongo.Collection('motions');

export const insertMotion = async ({ content,  abstain}) => {
  motionCollection.insert({ active: false, content, votes: [], abstain });
};
export const removeMotion  = async ({ _id }) => {
  motionCollection.remove(_id); 
};


export const switchActiveMotion = async (motionId) => {
  // Get the current active motion
  const activeMotion = motionCollection.findOne({ active: true });

  // If there is an active motion and it's different from the selected motionId, update its active status
  if (activeMotion && activeMotion._id !== motionId) {
      motionCollection.update({ _id: activeMotion._id }, { $set: { active: false } });
  }

  // Update the selected motion's active status
  motionCollection.update({ _id: motionId }, { $set: { active: true } });
};

// Define allow rules
motionCollection.allow({
  update(userId, doc, fields, modifier) {
    // Allow the update if the user is logged in
    return !!userId;
  },
  remove(userId) {
    // Allow the remove operation if the user is logged in
    return !!userId;
},
});


// EXAMPLE RECORD
//{
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