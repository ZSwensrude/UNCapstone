// speakers.js
import { Mongo } from 'meteor/mongo';

export const insertSpeaker = async ({ country }) => {
  //Check if the user already exists in the speakers collection

  const createdAt = new Date();
  speakerCollection.insert({ country, createdAt });
  return true;
};

export const speakerCollection = new Mongo.Collection('speakers');
