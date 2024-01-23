// users.js
import { Mongo } from 'meteor/mongo';


export const insertUser = async ({ user, pass }) => {
    await userCollection.insert({ user, pass });
  };
  
export const userCollection = new Mongo.Collection('users');
