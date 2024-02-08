// workingGroup.js
import { Mongo } from 'meteor/mongo';

export const insertWG = async ({ countries, location, topic, name}) => {
     workingGroupCollection.insert({ countries, location, topic, name });
  };
  
  
export const workingGroupCollection = new Mongo.Collection('workingGroups');
