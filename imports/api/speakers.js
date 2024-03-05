// speakers.js
import { Mongo } from 'meteor/mongo';

export const speakerCollection = new Mongo.Collection('speakers');

export const insertSpeaker = async ({ country }) => {
  let currentDate = null;
  fetch('https://worldtimeapi.org/api/timezone/Europe/London')
  .then(response => response.json())
  .then(data => {
    currentDate = new Date(data.datetime);
    speakerCollection.insert({ country, createdAt: currentDate });
    return true;
  })
  .catch(error => {
    console.error('Error fetching time:', error);
  });
};

export const removeSpeaker = async ({ _id }) => {
  speakerCollection.remove(_id); 
};

speakerCollection.allow({
  insert: function(userId, doc) {
    // Allow insert only if the user is logged in and has permission
    return !!userId;
  },
  remove: function(userId, doc) {
    // Allow removal of all documents
    return true;
  }
});


// {
//   "_id": "nAhd779DeWT98kxh4",
//   "country": "antiguaandbarbuda",
//   "createdAt": {
//     "$date": "2024-02-09T02:53:06.099Z" 
//   }
// }