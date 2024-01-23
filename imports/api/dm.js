// dm.js
import { Mongo } from 'meteor/mongo';


export const insertDM = async ({ country, roleCall }) => {
    await dmCollection.insert({ country, roleCall });
  };
  
export const dmCollection = new Mongo.Collection('DMs');
