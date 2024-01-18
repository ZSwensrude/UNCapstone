// motions.js
import { Mongo } from 'meteor/mongo';


export const insertMotion = async ({ content, votes }) => {
    await motionCollection.insert({ content, votes });
  };
  //example usage of motion: 
  // Insert a motion
  // await insertMotion({
  //   content: 'Motion A',
  //   votes: [
  //     { country: 'USA', vote: 'Yes' },
  //     { country: 'Canada', vote: 'No' },
  //     // Add more votes as needed
  //   ],
  // });
  
export const motionCollection = new Mongo.Collection('motions');
