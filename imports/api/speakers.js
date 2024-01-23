// speaker.js
import { Mongo } from 'meteor/mongo';



export const insertSpeaker = async ({ country }) => {
    // Set timeAdded to the current date/time
    const timeAdded = new Date();
    await speakerCollection.insert({ country, timeAdded });
  };
  
export const speakerCollection = new Mongo.Collection('speakers');
