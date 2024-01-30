// delegates.js
import { Mongo } from 'meteor/mongo';

// export const insertDel = async ({ country, roleCall }) => {
//      delCollection.insert({ country, roleCall });
//   };
  
// export const delCollection= new Mongo.Collection('delegates');


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
  
export const delCollection= new Mongo.Collection('delegates');
