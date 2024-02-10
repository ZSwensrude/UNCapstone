// speakers.js
import { Mongo } from 'meteor/mongo';

export const insertSpeaker = async ({ country }) => {
  const createdAt = new Date();
  speakerCollection.insert({ country, createdAt });
  return true;
};

export const removeSpeaker = async ({ _id }) => {
  speakerCollection.remove(_id); 
};


export const speakerCollection = new Mongo.Collection('speakers');


speakerCollection.allow({
  remove: function(userId, doc) {
    // Allow removal only if the user is logged in and has permission
    return !!userId;
  }
});


// {
//   "_id": "nAhd779DeWT98kxh4",
//   "country": "antiguaandbarbuda",
//   "createdAt": {
//     "$date": "2024-02-09T02:53:06.099Z" 
//   }
// }