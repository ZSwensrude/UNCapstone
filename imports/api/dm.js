// dm.js
import { Mongo } from 'meteor/mongo';

// DM TABLE
// id:
// to:
// from:
// content:
// datetime:

export const insertDM = async ({ to, from, content}) => {
    
  const createdAt = new Date();
  dmCollection.insert({ to, from, content, createdAt });
  return true;
};

export const dmCollection = new Mongo.Collection('DMs');
