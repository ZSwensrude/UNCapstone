// dm.js
import { Mongo } from 'meteor/mongo';

// DM TABLE
// id:
// to:
// from:
// content:
// datetime:

export const insertDM = async ({ type, to, from, content, read}) => {
    
  const createdAt = new Date();
  dmCollection.insert({ type, to, from, content, createdAt, read });
  return true;
};

export const dmCollection = new Mongo.Collection('DMs');
