// workingGroup.js
import { Mongo } from 'meteor/mongo';



export const insertWG = async ({ countries, location, topic }) => {
    await workingGroupCollection.insert({ countries, location, topic });
  };
  // Example usage fo WG:
  // await insertWG({
  //   countries: ['USA', 'Canada', 'UK'],
  //   location: 'Room B',
  //   topic: 'Economic Development',
  // });
  
export const workingGroupCollection = new Mongo.Collection('workingGroups');
