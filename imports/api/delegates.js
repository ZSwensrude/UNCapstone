// delegates.js
import { Mongo } from 'meteor/mongo';

export const insertDel = async ({ country, roleCall }) => {
     delCollection.insert({ country, roleCall });
  };
  
export const delCollection= new Mongo.Collection('delegates');
